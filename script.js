'use strict';
const filters=document.querySelectorAll('[data-filter]');
filters.forEach(button=>button.addEventListener('click',()=>{
 const choice=button.dataset.filter;
 filters.forEach(other=>{const active=other===button;other.classList.toggle('active',active);other.setAttribute('aria-pressed',String(active));});
 let visible=0;
 document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=choice!=='todos'&&choice!==card.dataset.category;if(!card.hidden)visible++;});
 document.querySelector('.empty-state').hidden=visible>0;
}));
document.getElementById('copy-email').addEventListener('click',async()=>{
 const status=document.getElementById('copy-status');
 try{await navigator.clipboard.writeText('amarukienterprise@gmail.com');status.textContent='Correo copiado.';}
 catch{status.textContent='Puedes seleccionar y copiar el correo que aparece arriba.';}
});
document.getElementById('year').textContent=String(new Date().getFullYear());
