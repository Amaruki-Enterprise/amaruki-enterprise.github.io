'use strict';
const filters=document.querySelectorAll('[data-filter]');
filters.forEach(button=>button.addEventListener('click',()=>{
 const choice=button.dataset.filter;
 filters.forEach(other=>{const active=other===button;other.classList.toggle('active',active);other.setAttribute('aria-pressed',String(active));});
 let visible=0;
 document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=choice!=='todos'&&choice!==card.dataset.category;if(!card.hidden)visible++;});
 const emptyState=document.querySelector('.empty-state');if(emptyState)emptyState.hidden=visible>0;
}));
const year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());
