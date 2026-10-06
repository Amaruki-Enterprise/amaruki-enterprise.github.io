'use strict';
document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-nav');
if (toggle && nav) {
  toggle.hidden = false;
  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
}
const filters = document.querySelectorAll('[data-filter]');
filters.forEach(button => button.addEventListener('click', () => {
  const choice = button.dataset.filter;
  filters.forEach(other => {
    const active = other === button;
    other.classList.toggle('active', active);
    other.setAttribute('aria-pressed', String(active));
  });
  let visible = 0;
  document.querySelectorAll('[data-category]').forEach(card => {
    card.hidden = choice !== 'todos' && choice !== card.dataset.category;
    if (!card.hidden) visible++;
  });
  const status = document.querySelector('.filter-status');
  if (status) status.textContent = visible + (visible === 1 ? ' proyecto visible.' : ' proyectos visibles.');
}));
const service = document.getElementById('service');
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  if (service) service.value = link.dataset.service;
}));
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
const form = document.getElementById('brief-form');
if (form) {
  const draft = document.getElementById('draft-text');
  const status = document.getElementById('draft-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const business = document.getElementById('business');
    const message = document.getElementById('message');
    [business, message].forEach(field => field.setCustomValidity(field.value.trim() ? '' : 'Completa este campo con tu información.'));
    if (!form.reportValidity()) return;
    const name = document.getElementById('person').value.trim();
    const text = [
      'Hola, Amaruki Enterprise:',
      '',
      'Me gustaría conversar sobre un proyecto.',
      name ? 'Mi nombre: ' + name : '',
      'Negocio: ' + business.value.trim(),
      'Servicio: ' + service.value,
      '',
      'Lo que necesito:',
      message.value.trim(),
      '',
      'Quedo atento/a para revisar el alcance, los plazos y una propuesta.'
    ].filter((line, i, lines) => line !== '' || i === 1 || i > 5).join('\n');
    draft.value = text;
    document.getElementById('draft-result').hidden = false;
    status.textContent = 'Tu consulta está preparada. Revisa el borrador en tu aplicación de correo y envíalo allí. Si no se abrió, copia el texto y escríbenos a amarukienterprise@gmail.com.';
    const subject = 'Consulta: ' + service.value + ' — ' + business.value.trim();
    window.location.href = 'mailto:amarukienterprise@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
  });
  ['business', 'message'].forEach(id => document.getElementById(id).addEventListener('input', event => event.target.setCustomValidity('')));
  document.querySelector('.copy-draft').addEventListener('click', async () => {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(draft.value);
      status.textContent = 'Consulta copiada. Pégala en un correo dirigido a amarukienterprise@gmail.com y envíalo desde tu aplicación.';
    } catch {
      draft.focus();
      draft.select();
      status.textContent = 'Seleccionamos el texto de tu consulta. Usa la opción Copiar de tu dispositivo y pégalo en tu correo.';
    }
  });
}
