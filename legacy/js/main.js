/* ============================================================
   Wenddy Neciosup — Rediseño 2026 · interacciones
   Vanilla JS, sin dependencias.
   ============================================================ */
(function () {
  'use strict';

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine   = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- Preloader ---------- */
  const loader = $('#loader');
  const hideLoader = () => loader && loader.classList.add('done');
  window.addEventListener('load', () => setTimeout(hideLoader, reduce ? 0 : 620));
  setTimeout(hideLoader, 3500); // red lenta: no bloquear nunca

  /* ---------- Año ---------- */
  const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Split text ---------- */
  $$('.split').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w, i) =>
      `<span class="w"><i style="transition-delay:${(i * 55)}ms">${w}</i></span>`
    ).join(' ');
  });

  /* ---------- Reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal, .split, .mcard').forEach((el, i) => {
    if (el.classList.contains('mcard')) el.style.transitionDelay = (i % 6) * 60 + 'ms';
    io.observe(el);
  });

  /* ---------- Contadores ---------- */
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, to = +el.dataset.to, dur = 1400, t0 = performance.now();
      const step = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$('.count').forEach(el => cio.observe(el));

  /* ---------- Header ---------- */
  const hdr = $('#hdr');

  /* Altura real del encabezado, publicada como variable CSS.
     La usan la barra pegajosa de meses y los saltos de ancla. */
  const root = document.documentElement;
  const setHdrH = () => root.style.setProperty('--hdr-h', (hdr ? hdr.offsetHeight : 64) + 'px');
  const hdrH = () => parseFloat(getComputedStyle(root).getPropertyValue('--hdr-h')) || 64;
  setHdrH();
  window.addEventListener('resize', setHdrH);
  window.addEventListener('load', setHdrH);
  if (window.ResizeObserver && hdr) new ResizeObserver(setHdrH).observe(hdr);
  let lastY = 0;
  const progress = $('#progress');
  const toTop = $('#toTop');
  const ctaBg = $('.cta-final__bg');
  const ctaSec = $('.cta-final');
  const parallaxEls = $$('[data-parallax]');

  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;

    if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    if (hdr) {
      hdr.classList.toggle('stuck', y > 30);
      hdr.classList.toggle('hide', y > lastY && y > 480 && !document.body.classList.contains('lock'));
    }
    if (toTop) toTop.classList.toggle('on', y > 900);
    lastY = y;

    if (!reduce) {
      const vh = window.innerHeight;
      parallaxEls.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const off = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
        el.style.transform = `translate3d(0,${off.toFixed(1)}px,0)`;
      });
      if (ctaBg && ctaSec) {
        const r = ctaSec.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh) {
          ctaBg.style.transform = `scale(1.14) translate3d(0,${((r.top - vh / 2) * -0.07).toFixed(1)}px,0)`;
        }
      }
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  toTop && toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  // Apartar el botón «arriba» cuando el pie o la paginación entran en pantalla
  const nearBottom = [$('.ftr'), $('.pager')].filter(Boolean);
  if (toTop && nearBottom.length) {
    const bio = new IntersectionObserver((entries) => {
      const hit = entries.some(e => e.isIntersecting);
      toTop.classList.toggle('tuck', hit);
    }, { rootMargin: '0px 0px -20% 0px' });
    nearBottom.forEach(el => bio.observe(el));
  }

  /* ---------- Drawer móvil ---------- */
  const burger = $('#burger'), drawer = $('#drawer');
  const setDrawer = (open) => {
    drawer.classList.toggle('open', open);
    burger.classList.toggle('on', open);
    burger.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('lock', open);
    document.body.style.overflow = open ? 'hidden' : '';
    $$('.drawer__nav a', drawer).forEach((a, i) => {
      a.style.transitionDelay = open ? (120 + i * 60) + 'ms' : '0ms';
    });
  };
  burger && burger.addEventListener('click', () => setDrawer(!drawer.classList.contains('open')));
  $$('.drawer__nav a').forEach(a => a.addEventListener('click', () => setDrawer(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) setDrawer(false); });

  /* ---------- Nav activa ---------- */
  const links = $$('.nav__l');
  const secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  if (secs.length) {
    const nio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(s => nio.observe(s));
  }

  /* ---------- Cursor glow ---------- */
  const glow = $('#cursorGlow');
  if (glow && fine && !reduce) {
    let gx = 0, gy = 0, cx = 0, cy = 0;
    document.body.classList.add('has-cursor');
    window.addEventListener('pointermove', e => { gx = e.clientX; gy = e.clientY; }, { passive: true });
    (function loop() {
      cx += (gx - cx) * 0.12; cy += (gy - cy) * 0.12;
      glow.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Botones magnéticos ---------- */
  if (fine && !reduce) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.22;
        const y = (e.clientY - r.top - r.height / 2) * 0.3;
        el.style.transform = `translate(${x}px,${y}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Tilt 3D del libro ---------- */
  const art = $('#heroArt'), bookTilt = $('#bookTilt');
  if (art && bookTilt && fine && !reduce) {
    art.addEventListener('pointermove', e => {
      const r = art.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      bookTilt.style.transform = `perspective(1100px) rotateY(${px * 16}deg) rotateX(${-py * 13}deg) translateZ(24px)`;
    });
    art.addEventListener('pointerleave', () => { bookTilt.style.transform = ''; });
  }

  /* ---------- Muestra: leer más ---------- */
  const sBtn = $('#sampleBtn'), sMore = $('#sampleMore');
  if (sBtn && sMore) {
    sBtn.addEventListener('click', () => {
      const open = sMore.hasAttribute('hidden');
      if (open) {
        sMore.removeAttribute('hidden');
        sMore.classList.add('anim');
        $('span', sBtn).textContent = 'Mostrar menos';
      } else {
        sMore.setAttribute('hidden', '');
        sMore.classList.remove('anim');
        $('span', sBtn).textContent = 'Leerlo completo';
      }
      sBtn.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---------- Carrusel de testimonios ---------- */
  const row = $('#tstRow');
  if (row) {
    const prev = $('#tstPrev'), next = $('#tstNext');
    const step = () => (row.firstElementChild ? row.firstElementChild.getBoundingClientRect().width + 24 : 400);
    const sync = () => {
      const max = row.scrollWidth - row.clientWidth - 4;
      prev.disabled = row.scrollLeft <= 4;
      next.disabled = row.scrollLeft >= max;
    };
    prev.addEventListener('click', () => row.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => row.scrollBy({ left: step(), behavior: 'smooth' }));
    row.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
    sync();

    // autoplay suave, se detiene al interactuar
    let auto = null, stopped = false;
    const start = () => {
      if (reduce || stopped) return;
      auto = setInterval(() => {
        const max = row.scrollWidth - row.clientWidth - 4;
        if (row.scrollLeft >= max) row.scrollTo({ left: 0, behavior: 'smooth' });
        else row.scrollBy({ left: step(), behavior: 'smooth' });
      }, 5200);
    };
    const stop = () => { clearInterval(auto); auto = null; };
    ['pointerdown', 'wheel', 'touchstart'].forEach(ev =>
      row.addEventListener(ev, () => { stopped = true; stop(); }, { passive: true }));
    row.addEventListener('pointerenter', stop);
    row.addEventListener('pointerleave', start);
    const aio = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? start() : stop()), { threshold: 0.25 });
    aio.observe(row);
  }

  /* ---------- Reproductor de audio ---------- */
  const audio = $('#audio'), playBtn = $('#playBtn'), wave = $('#wave');
  if (audio && playBtn && wave) {
    const BARS = 56;
    const bars = [];
    const base = [];
    for (let i = 0; i < BARS; i++) {
      // patrón de onda estable (determinista) para el estado en reposo
      const v = 0.28 + 0.5 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23) + Math.sin(i * 1.9) * 0.35);
      base.push(Math.min(1, v));
      const b = document.createElement('b');
      b.style.height = (base[i] * 100) + '%';
      wave.appendChild(b);
      bars.push(b);
    }

    const fmt = (s) => {
      if (!isFinite(s)) return '--:--';
      const m = Math.floor(s / 60), r = Math.floor(s % 60);
      return m + ':' + String(r).padStart(2, '0');
    };
    const tCur = $('#tCur'), tDur = $('#tDur');

    audio.addEventListener('loadedmetadata', () => { tDur.textContent = fmt(audio.duration); });
    audio.addEventListener('timeupdate', () => {
      tCur.textContent = fmt(audio.currentTime);
      const p = audio.duration ? audio.currentTime / audio.duration : 0;
      wave.setAttribute('aria-valuenow', Math.round(p * 100));
      const idx = Math.round(p * BARS);
      bars.forEach((b, i) => b.classList.toggle('on', i < idx));
    });
    audio.addEventListener('ended', () => playBtn.classList.remove('playing'));

    // Analizador WebAudio (si el navegador y el origen lo permiten)
    let ctx = null, analyser = null, data = null, raf = null;
    function setupAudioGraph() {
      if (ctx || reduce) return;
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        ctx = new AC();
        const src = ctx.createMediaElementSource(audio);
        analyser = ctx.createAnalyser();
        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.75;
        src.connect(analyser);
        analyser.connect(ctx.destination);
        data = new Uint8Array(analyser.frequencyBinCount);
      } catch (err) { ctx = 'off'; } // p.ej. file:// o CORS: usamos animación sintética
    }
    function animate() {
      if (audio.paused) return;
      if (analyser && data) {
        analyser.getByteFrequencyData(data);
        for (let i = 0; i < BARS; i++) {
          const v = data[Math.floor(i * data.length / BARS)] / 255;
          bars[i].style.height = Math.max(base[i] * 22, v * 100) + '%';
        }
      } else {
        const t = performance.now() / 260;
        for (let i = 0; i < BARS; i++) {
          const v = base[i] * (0.55 + 0.45 * Math.abs(Math.sin(t + i * 0.42)));
          bars[i].style.height = (v * 100) + '%';
        }
      }
      raf = requestAnimationFrame(animate);
    }
    function rest() {
      cancelAnimationFrame(raf);
      bars.forEach((b, i) => { b.style.height = (base[i] * 100) + '%'; });
    }

    playBtn.addEventListener('click', () => {
      setupAudioGraph();
      if (ctx && ctx.state === 'suspended') ctx.resume();
      if (audio.paused) {
        audio.play().then(() => { playBtn.classList.add('playing'); animate(); })
          .catch(() => { toast('No se pudo reproducir el audio'); });
      } else {
        audio.pause(); playBtn.classList.remove('playing'); rest();
      }
    });

    const seek = (clientX) => {
      const r = wave.getBoundingClientRect();
      const p = Math.min(Math.max((clientX - r.left) / r.width, 0), 1);
      if (audio.duration) audio.currentTime = p * audio.duration;
    };
    wave.addEventListener('click', e => seek(e.clientX));
    wave.addEventListener('keydown', e => {
      if (!audio.duration) return;
      if (e.key === 'ArrowRight') { audio.currentTime = Math.min(audio.duration, audio.currentTime + 10); e.preventDefault(); }
      if (e.key === 'ArrowLeft')  { audio.currentTime = Math.max(0, audio.currentTime - 10); e.preventDefault(); }
      if (e.key === ' ' || e.key === 'Enter') { playBtn.click(); e.preventDefault(); }
    });
  }

  /* ---------- Copiar al portapapeles ---------- */
  const toastEl = $('#toast');
  let tTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(tTimer);
    tTimer = setTimeout(() => toastEl.classList.remove('on'), 2400);
  }
  $$('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const txt = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(txt);
        toast('Copiado: ' + txt);
      } catch (err) {
        const ta = document.createElement('textarea');
        ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); toast('Copiado: ' + txt); }
        catch (e2) { toast(txt); }
        ta.remove();
      }
    });
  });

  /* ---------- Scroll suave con offset de header ---------- */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      const sticky = $('.switch');
      const offset = hdrH() + (sticky ? sticky.offsetHeight : 0) + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });
  });
})();
