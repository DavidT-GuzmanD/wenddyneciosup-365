/* ============================================================
   Páginas internas: revelado de tarjetas, buscador de día y visor
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Revelado escalonado de las tarjetas */
  const cards = $$('.day, .tile');
  if (cards.length) {
    const io = new IntersectionObserver((es) => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
    cards.forEach((el, i) => { el.style.transitionDelay = (i % 8) * 45 + 'ms'; io.observe(el); });
  }

  /* Ir a un día concreto */
  const find = $('#find'), grid = $('#days'), empty = $('#empty');
  if (find && grid) {
    const days = $$('.day', grid);
    find.addEventListener('input', () => {
      const v = find.value.trim();
      if (!v) { days.forEach(d => { d.hidden = false; }); empty.hidden = true; return; }
      let shown = 0;
      days.forEach(d => {
        const hit = d.dataset.n === String(parseInt(v, 10));
        d.hidden = !hit;
        if (hit) shown++;
      });
      empty.hidden = shown > 0;
      if (shown === 1) {
        const el = days.find(d => !d.hidden);
        el.classList.add('in');
        const hh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hdr-h')) || 64;
        const sw = $('.switch');
        const off = hh + (sw ? sw.offsetHeight : 0) + 24;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - off, behavior: reduce ? 'auto' : 'smooth' });
      }
    });
  }

  /* Visor de imagen */
  const lb = $('#lb');
  if (lb) {
    const img = $('#lbImg'), figs = $$('.day__fig');
    let i = 0;
    const show = (n) => {
      i = (n + figs.length) % figs.length;
      const f = figs[i];
      img.src = f.dataset.full;
      img.alt = ($('img', f) || {}).alt || '';
    };
    const open = (n) => {
      show(n);
      lb.hidden = false;
      requestAnimationFrame(() => lb.classList.add('on'));
      document.body.style.overflow = 'hidden';
      $('#lbX').focus();
    };
    const close = () => {
      lb.classList.remove('on');
      document.body.style.overflow = '';
      setTimeout(() => { lb.hidden = true; img.src = ''; }, 320);
    };
    figs.forEach((f, n) => f.addEventListener('click', () => open(n)));
    $('#lbX').addEventListener('click', close);
    $('#lbPrev').addEventListener('click', () => show(i - 1));
    $('#lbNext').addEventListener('click', () => show(i + 1));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(i - 1);
      if (e.key === 'ArrowRight') show(i + 1);
    });
  }

  /* Centrar el mes activo en el selector pegajoso */
  const cur = $('.switch a[aria-current]');
  if (cur) {
    const box = cur.parentElement;
    box.scrollLeft = cur.offsetLeft - box.clientWidth / 2 + cur.clientWidth / 2;
  }
})();
