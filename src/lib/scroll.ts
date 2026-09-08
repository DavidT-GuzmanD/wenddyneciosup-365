/** Alto real del encabezado fijo, publicado por el layout como `--hdr-h`. */
export function headerHeight(): number {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--hdr-h')
  return parseFloat(v) || 64
}

/** Alto de la barra pegajosa de meses, si la página la tiene. */
export function stickyHeight(): number {
  return document.querySelector<HTMLElement>('.switch')?.offsetHeight ?? 0
}

/** Desplazamiento necesario para que un destino no quede bajo las barras fijas. */
export function scrollOffset(extra = 16): number {
  return headerHeight() + stickyHeight() + extra
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Lleva la vista a un elemento dejando libre el espacio de las barras fijas. */
export function scrollToId(id: string, extra = 16): boolean {
  const target = document.getElementById(id.replace(/^#/, ''))
  if (!target) return false
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - scrollOffset(extra),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
  return true
}
