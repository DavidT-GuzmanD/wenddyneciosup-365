import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Listing } from '../../data/plan'

/**
 * Barra pegajosa para saltar de mes. Se ancla a `--hdr-h` (el alto real del
 * encabezado) y centra el mes activo al entrar.
 */
export function MonthSwitcher({ items, current }: { items: Listing[]; current: string }) {
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = box.current
    const active = el?.querySelector<HTMLElement>('[aria-current]')
    if (el && active) {
      el.scrollLeft = active.offsetLeft - el.clientWidth / 2 + active.clientWidth / 2
    }
  }, [current])

  return (
    <nav className="switch" aria-label="Cambiar de mes">
      <div className="switch__in" ref={box}>
        {items.map((item) => (
          <Link
            key={item.slug}
            to={`/${item.slug}/`}
            {...(item.slug === current ? { 'aria-current': 'page' as const } : {})}
          >
            <em>{item.num}</em>
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
