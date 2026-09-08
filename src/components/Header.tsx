import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from './Icon'
import { MagneticA } from './MagneticLink'
import { LINKS, NAV } from '../data/site'
import { PLAN_SLUG } from '../data/plan'
import { cx } from '../lib/cx'

interface HeaderProps {
  stuck: boolean
  hidden: boolean
  drawerOpen: boolean
  onToggleDrawer: () => void
}

/**
 * Encabezado fijo. Publica su alto real en `--hdr-h`, que usan la barra
 * pegajosa de meses y todos los saltos de ancla para no quedar por debajo.
 */
export function Header({ stuck, hidden, drawerOpen, onToggleDrawer }: HeaderProps) {
  const ref = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [active, setActive] = useState('')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const publish = () =>
      document.documentElement.style.setProperty('--hdr-h', `${el.offsetHeight}px`)
    publish()
    window.addEventListener('resize', publish)
    const ro = 'ResizeObserver' in window ? new ResizeObserver(publish) : null
    ro?.observe(el)
    return () => {
      window.removeEventListener('resize', publish)
      ro?.disconnect()
    }
  }, [])

  // Resalta la sección visible mientras se recorre la portada.
  useEffect(() => {
    if (!isHome) {
      setActive('')
      return
    }
    const sections = NAV.map((n) => document.getElementById(n.hash.slice(1))).filter(
      (el): el is HTMLElement => !!el,
    )
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive('#' + e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [isHome, pathname])

  return (
    <header
      ref={ref}
      className={cx('hdr', (stuck || !isHome) && 'stuck', hidden && !drawerOpen && 'hide')}
      id="hdr"
    >
      <div className="hdr__in">
        <Link to="/" className="hdr__logo" aria-label="Wenddy Neciosup, inicio">
          <img src="/assets/img/logo.png" alt="Wenddy Neciosup" />
        </Link>

        <nav className="nav" aria-label="Principal">
          {!isHome && (
            <Link to={`/${PLAN_SLUG}/`} className="nav__l">
              Plan 365
            </Link>
          )}
          {NAV.map((item) => (
            <Link
              key={item.hash}
              to={{ pathname: '/', hash: item.hash }}
              className={cx('nav__l', active === item.hash && 'on')}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hdr__act">
          {isHome ? (
            <MagneticA className="btn btn--sm btn--primary" href={LINKS.amazon40}>
              <Icon name="amazon" />
              <span>Conseguir el libro</span>
            </MagneticA>
          ) : (
            <MagneticA className="btn btn--sm btn--primary" href={LINKS.spotify}>
              <Icon name="spotify" />
              <span>Escuchar el podcast</span>
            </MagneticA>
          )}
          <button
            className={cx('burger', drawerOpen && 'on')}
            aria-label={drawerOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={drawerOpen}
            onClick={onToggleDrawer}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
