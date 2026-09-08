#!/usr/bin/env python3
"""
Genera las páginas internas del sitio conservando EXACTAMENTE las rutas del sitio original:

  /la-biblia-en-365-dias/   Plan de lectura (12 portadas)
  /enero/ /febrero/ /marzo/ /abril/ /mayo/ /mayo-2/ /julio/
  /agosto-2/ /agosto/ /octubre/ /noviembre/ /diciembre/
  /promesas-enero/ … /promesas-setiembre/

El encabezado, el pie y el sprite de iconos se extraen de index.html para que exista
una sola fuente de verdad. Los datos de cada día salen de tools/routes.json.

    python3 tools/build-pages.py
"""
import json, re, os, sys, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = json.load(open(os.path.join(ROOT, 'tools', 'routes.json'), encoding='utf-8'))
INDEX = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()

# ── Mapa de rutas: (slug real del sitio, nombre visible, nº de mes) ──────────
MONTHS = [
    ('enero',     'Enero',     '01'), ('febrero',  'Febrero',   '02'),
    ('marzo',     'Marzo',     '03'), ('abril',    'Abril',     '04'),
    ('mayo',      'Mayo',      '05'), ('mayo-2',   'Junio',     '06'),
    ('julio',     'Julio',     '07'), ('agosto-2', 'Agosto',    '08'),
    ('agosto',    'Setiembre', '09'), ('octubre',  'Octubre',   '10'),
    ('noviembre', 'Noviembre', '11'), ('diciembre','Diciembre', '12'),
]
PROMESAS = [
    ('promesas-enero','Enero','01'), ('promesas-febrero','Febrero','02'),
    ('promesas-marzo','Marzo','03'), ('promesas-abril','Abril','04'),
    ('promesas-mayo','Mayo','05'),   ('promesas-junio','Junio','06'),
    ('promesas-julio','Julio','07'), ('promesas-agosto','Agosto','08'),
    ('promesas-setiembre','Setiembre','09'),
]
PLAN = 'la-biblia-en-365-dias'

# ── Fragmentos compartidos, extraídos de index.html ─────────────────────────
def grab(pattern):
    m = re.search(pattern, INDEX, re.S)
    if not m:
        sys.exit('No se encontró el fragmento: ' + pattern[:40])
    return m.group(0)

SPRITE = grab(r'<svg width="0" height="0".*?</svg>')
DRAWER = grab(r'<div class="drawer" id="drawer".*?</div>\n</div>')
FOOTER = grab(r'<footer class="ftr">.*?</footer>')
TAIL   = grab(r'<button class="totop".*?<div class="toast" id="toast"[^>]*></div>')

def rooted(frag):
    """Rutas relativas → absolutas, y anclas del home → /#ancla."""
    frag = frag.replace('src="assets/', 'src="/assets/').replace('href="assets/', 'href="/assets/')
    frag = re.sub(r'href="#(?!")', 'href="/#', frag)
    return frag

SPRITE, DRAWER, FOOTER, TAIL = map(rooted, (SPRITE, DRAWER, FOOTER, TAIL))

HEADER = '''<header class="hdr stuck" id="hdr">
  <div class="hdr__in">
    <a href="/" class="hdr__logo" aria-label="Wenddy Neciosup, inicio">
      <img src="/assets/img/logo.png" alt="Wenddy Neciosup">
    </a>
    <nav class="nav" id="nav" aria-label="Principal">
      <a href="/{plan}/" class="nav__l{plan_on}">Plan 365</a>
      <a href="/#libro" class="nav__l">El libro</a>
      <a href="/#digital" class="nav__l">365 con Dios</a>
      <a href="/#podcast" class="nav__l">Podcast</a>
      <a href="/#autora" class="nav__l">Autora</a>
      <a href="/#apoyo" class="nav__l">Apoyar</a>
    </nav>
    <div class="hdr__act">
      <a class="btn btn--sm btn--primary magnetic" href="https://open.spotify.com/show/6WmA7TTxcGMUM7Kp4abXVx" target="_blank" rel="noopener">
        <svg class="ico"><use href="#i-spotify"></use></svg><span>Escuchar el podcast</span>
      </a>
      <button class="burger" id="burger" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>'''

def shell(*, title, desc, body, extra_class=''):
    return f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<meta name="description" content="{html.escape(desc)}">
<meta name="theme-color" content="#F2545E">
<meta property="og:title" content="{html.escape(title)}">
<meta property="og:description" content="{html.escape(desc)}">
<meta property="og:type" content="article">
<link rel="icon" href="/assets/img/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/styles.css">
<link rel="stylesheet" href="/assets/css/inner.css">
</head>
<body class="inner{extra_class}">
{SPRITE}
<div class="progress" id="progress" aria-hidden="true"></div>
<div class="cursor-glow" id="cursorGlow" aria-hidden="true"></div>
{HEADER.format(plan=PLAN, plan_on=' on' if extra_class == ' is-plan' else '')}
{DRAWER}
<main>
{body}
</main>
{FOOTER}
{TAIL}
<script src="/assets/js/main.js"></script>
<script src="/assets/js/inner.js"></script>
</body>
</html>
'''

def big(url):
    """Devuelve la variante grande de una imagen de WordPress."""
    return re.sub(r'-\d+x\d+(\.(?:jpg|jpeg|png))$', r'\1', url)

def switcher(items, current, prefix=''):
    out = ['<nav class="switch" aria-label="Cambiar de mes"><div class="switch__in">']
    for slug, name, num in items:
        on = ' aria-current="page"' if slug == current else ''
        out.append(f'<a href="/{slug}/"{on}><em>{num}</em>{name}</a>')
    out.append('</div></nav>')
    return '\n'.join(out)

# ── Páginas de mes y de promesas ───────────────────────────────────────────
def build_listing(slug, name, num, items, kind):
    data = DATA[slug]
    cards = data['cards']
    is_prom = kind == 'promesas'
    label = f'Promesas de {name.lower()}' if is_prom else name
    kicker = '365 promesas' if is_prom else 'La Biblia en 365 días'
    unit_s = 'promesa' if is_prom else 'devocional'
    unit_p = 'promesas' if is_prom else 'devocionales'
    unit = unit_p if len(cards) != 1 else unit_s
    idx = [i for i, (s, *_ ) in enumerate(items) if s == slug][0]
    prev_ = items[idx - 1] if idx > 0 else None
    next_ = items[idx + 1] if idx < len(items) - 1 else None
    cover = COVERS.get(num)

    day_html = []
    for i, c in enumerate(cards, 1):
        acts = []
        if c['yt']:
            acts.append(f'<a class="dbtn dbtn--yt" href="{html.escape(c["yt"].strip())}" target="_blank" rel="noopener">'
                        f'<svg class="ico"><use href="#i-youtube"></use></svg><span>Ver</span></a>')
        if c['sp']:
            acts.append(f'<a class="dbtn dbtn--sp" href="{html.escape(c["sp"].strip())}" target="_blank" rel="noopener">'
                        f'<svg class="ico"><use href="#i-spotify"></use></svg><span>Escuchar</span></a>')
        alt = f'{"Promesa" if is_prom else "Devocional"} {i} de {name.lower()}'
        day_html.append(f'''      <article class="day" data-n="{i}">
        <button class="day__fig" data-full="{html.escape(big(c['img']))}" aria-label="Ampliar {alt}">
          <img src="{html.escape(c['img'])}" alt="{html.escape(alt)}" loading="lazy" decoding="async">
          <span class="day__n">{i:02d}</span>
          <span class="day__zoom"><svg class="ico"><use href="#i-sparkle"></use></svg></span>
        </button>
        <div class="day__act">{''.join(acts)}</div>
      </article>''')

    pager = []
    if prev_:
        pager.append(f'<a class="pager__l" href="/{prev_[0]}/"><svg class="ico ico--l"><use href="#i-chevron"></use></svg>'
                     f'<span><em>Anterior</em><b>{prev_[1]}</b></span></a>')
    else:
        pager.append('<span></span>')
    if next_:
        pager.append(f'<a class="pager__r" href="/{next_[0]}/"><span><em>Siguiente</em><b>{next_[1]}</b></span>'
                     f'<svg class="ico ico--r"><use href="#i-chevron"></use></svg></a>')
    else:
        pager.append('<span></span>')

    cross = (f'<a class="btn btn--ghost magnetic" href="/{PROM_BY_NUM[num]}/"><svg class="ico"><use href="#i-sparkle"></use></svg>'
             f'<span>Promesas de {name.lower()}</span></a>' if not is_prom and num in PROM_BY_NUM else
             (f'<a class="btn btn--ghost magnetic" href="/{MONTH_BY_NUM[num]}/"><svg class="ico"><use href="#i-calendar"></use></svg>'
              f'<span>Devocionales de {name.lower()}</span></a>' if is_prom and num in MONTH_BY_NUM else ''))

    body = f'''<section class="phero{' phero--gold' if is_prom else ''}">
  <div class="phero__bg" aria-hidden="true"><span class="blob blob--1"></span><span class="blob blob--2"></span></div>
  <div class="wrap phero__in">
    <div>
      <nav class="crumbs" aria-label="Ruta"><a href="/">Inicio</a><span>/</span><a href="/{PLAN}/">{kicker}</a><span>/</span><b>{html.escape(label)}</b></nav>
      <h1 class="phero__h1 split">{html.escape(label)}</h1>
      <p class="phero__lede reveal" data-d="1">{len(cards)} {unit} para escuchar o ver, uno por día. Toca una portada para ampliarla.</p>
      <div class="phero__act reveal" data-d="2">
        <div class="finder">
          <label for="find">Ir al día</label>
          <input id="find" type="number" min="1" max="{len(cards)}" inputmode="numeric" placeholder="1–{len(cards)}">
        </div>
        {cross}
      </div>
    </div>
    {f'<img class="phero__cover reveal" src="{html.escape(cover)}" alt="Portada de {html.escape(name)}" data-parallax="-0.05">' if cover else ''}
  </div>
</section>

{switcher(items, slug)}

<section class="sec sec--days">
  <div class="wrap">
    <p class="days__empty" id="empty" hidden>No hay ningún día con ese número.</p>
    <div class="days" id="days">
{chr(10).join(day_html)}
    </div>
    <nav class="pager">{''.join(pager)}</nav>
  </div>
</section>

<section class="strip">
  <div class="wrap strip__in">
    <p>Escucha el devocional completo cada día en tu plataforma favorita.</p>
    <div class="strip__b">
      <a class="plat plat--spotify magnetic" href="https://open.spotify.com/show/6WmA7TTxcGMUM7Kp4abXVx" target="_blank" rel="noopener"><svg class="ico"><use href="#i-spotify"></use></svg><div><span>Escúchalo en</span><strong>Spotify</strong></div></a>
      <a class="plat plat--yt magnetic" href="https://www.youtube.com/@WenddyNeciosup" target="_blank" rel="noopener"><svg class="ico"><use href="#i-youtube"></use></svg><div><span>Míralo en</span><strong>YouTube</strong></div></a>
      <a class="plat plat--apple magnetic" href="https://podcasts.apple.com/pe/podcast/365-con-dios/id1546917854" target="_blank" rel="noopener"><svg class="ico"><use href="#i-apple"></use></svg><div><span>Suscríbete en</span><strong>Apple Podcasts</strong></div></a>
    </div>
  </div>
</section>

<div class="lb" id="lb" hidden>
  <button class="lb__x" id="lbX" aria-label="Cerrar"><svg class="ico"><use href="#i-chevron"></use></svg></button>
  <button class="lb__nav lb__prev" id="lbPrev" aria-label="Anterior"><svg class="ico ico--l"><use href="#i-chevron"></use></svg></button>
  <img id="lbImg" src="" alt="">
  <button class="lb__nav lb__next" id="lbNext" aria-label="Siguiente"><svg class="ico ico--r"><use href="#i-chevron"></use></svg></button>
</div>'''

    return shell(
        title=f'{label} · {kicker} — Wenddy Neciosup',
        desc=f'{len(cards)} {unit} de {name.lower()} del plan «{kicker}» de Wenddy Neciosup, con audio en Spotify y video en YouTube.',
        body=body)

# ── Página del plan ────────────────────────────────────────────────────────
def build_plan():
    cards = DATA[PLAN]['cards']
    tiles = []
    for (slug, name, num), c in zip(MONTHS, cards):
        tiles.append(f'''      <a class="tile" href="/{slug}/">
        <img src="{html.escape(c['img'])}" alt="Portada de {name}" loading="lazy" decoding="async">
        <span class="tile__b"><em>{num}</em><strong>{name}</strong><svg class="ico"><use href="#i-arrow"></use></svg></span>
      </a>''')
    proms = ''.join(f'<a href="/{s}/"><em>{n}</em>{name}</a>' for s, name, n in PROMESAS)

    body = f'''<section class="phero phero--plan">
  <div class="phero__bg" aria-hidden="true"><span class="blob blob--1"></span><span class="blob blob--2"></span></div>
  <div class="wrap phero__in phero__in--center">
    <div>
      <nav class="crumbs" aria-label="Ruta"><a href="/">Inicio</a><span>/</span><b>La Biblia en 365 días</b></nav>
      <h1 class="phero__h1 split">Plan de lectura bíblica</h1>
      <p class="phero__lede reveal" data-d="1">Un año entero para caminar por la Palabra, un día a la vez. Elige tu mes y continúa donde lo dejaste.</p>
      <div class="phero__act reveal" data-d="2">
        <a class="btn btn--primary magnetic" href="/enero/"><svg class="ico"><use href="#i-calendar"></use></svg><span>Empezar por enero</span></a>
        <a class="btn btn--gold magnetic" href="https://wenddyneciosup.com/wp-content/uploads/2025/12/CERTIFICADO-365-.pdf" target="_blank" rel="noopener"><svg class="ico"><use href="#i-download"></use></svg><span>Certificado del reto</span></a>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--tiles">
  <div class="wrap">
    <header class="sec-head sec-head--center">
      <p class="kicker kicker--c reveal"><i></i>Los 12 meses</p>
      <h2 class="h2 split">Elige tu mes</h2>
    </header>
    <div class="tiles">
{chr(10).join(tiles)}
    </div>

    <div class="promesas reveal" style="margin-top:36px">
      <p class="promesas__lb"><svg class="ico"><use href="#i-sparkle"></use></svg> 365 promesas</p>
      <div class="promesas__list promesas__list--num">{proms}</div>
    </div>
  </div>
</section>

<section class="strip">
  <div class="wrap strip__in">
    <p>Cada lectura tiene su episodio en audio y en video.</p>
    <div class="strip__b">
      <a class="plat plat--spotify magnetic" href="https://open.spotify.com/show/6WmA7TTxcGMUM7Kp4abXVx" target="_blank" rel="noopener"><svg class="ico"><use href="#i-spotify"></use></svg><div><span>Escúchalo en</span><strong>Spotify</strong></div></a>
      <a class="plat plat--yt magnetic" href="https://www.youtube.com/playlist?list=PLYkJP2_zxCIoVz6dP3OEFuD_2yxP1--dp" target="_blank" rel="noopener"><svg class="ico"><use href="#i-youtube"></use></svg><div><span>Míralo en</span><strong>YouTube</strong></div></a>
      <a class="plat plat--amazon magnetic" href="https://www.amazon.com/-/es/Wenddy-Neciosup-ebook/dp/B0BNY7Z4Z5/" target="_blank" rel="noopener"><svg class="ico"><use href="#i-amazon"></use></svg><div><span>El libro en</span><strong>Amazon</strong></div></a>
    </div>
  </div>
</section>'''
    return shell(title='La Biblia en 365 días · Plan de lectura — Wenddy Neciosup',
                 desc='Plan de lectura bíblica de un año con Wenddy Neciosup: 12 meses de devocionales diarios con audio y video.',
                 body=body, extra_class=' is-plan')

# ── Datos derivados ────────────────────────────────────────────────────────
COVERS = {num: big(c['img']) for (slug, name, num), c in zip(MONTHS, DATA[PLAN]['cards'])}
MONTH_BY_NUM = {num: slug for slug, name, num in MONTHS}
PROM_BY_NUM = {num: slug for slug, name, num in PROMESAS}

def write(route, content):
    d = os.path.join(ROOT, route)
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(content)
    return f'/{route}/'

if __name__ == '__main__':
    done = [write(PLAN, build_plan())]
    for slug, name, num in MONTHS:
        done.append(write(slug, build_listing(slug, name, num, MONTHS, 'mes')))
    for slug, name, num in PROMESAS:
        done.append(write(slug, build_listing(slug, name, num, PROMESAS, 'promesas')))
    print(f'{len(done)} rutas generadas:')
    for r in done:
        print('  ', r)
