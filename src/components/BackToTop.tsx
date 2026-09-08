import { useEffect, useState } from 'react'
import { Icon } from './Icon'
import { cx } from '../lib/cx'
import { prefersReducedMotion } from '../lib/scroll'

/**
 * Vuelve al inicio. Se aparta cuando el pie o la paginación entran en pantalla,
 * para no taparlos.
 */
export function BackToTop({ visible }: { visible: boolean }) {
  const [tucked, setTucked] = useState(false)

  useEffect(() => {
    const targets = ['.ftr', '.pager']
      .map((s) => document.querySelector(s))
      .filter((el): el is Element => !!el)
    if (!targets.length) return
    const io = new IntersectionObserver(
      (entries) => setTucked(entries.some((e) => e.isIntersecting)),
      { rootMargin: '0px 0px -20% 0px' },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  })

  return (
    <button
      className={cx('totop', visible && 'on', tucked && 'tuck')}
      aria-label="Volver arriba"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      }
    >
      <Icon name="chevron" />
    </button>
  )
}
