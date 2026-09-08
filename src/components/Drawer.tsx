import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import { DRAWER_NAV, LINKS } from '../data/site'

interface DrawerProps {
  open: boolean
  onClose: () => void
}

/** Menú a pantalla completa para móvil, con apertura circular. */
export function Drawer({ open, onClose }: DrawerProps) {
  useEffect(() => {
    document.body.classList.toggle('lock', open)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.classList.remove('lock')
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div className={open ? 'drawer open' : 'drawer'} aria-hidden={!open}>
      <nav className="drawer__nav">
        {DRAWER_NAV.map((item, i) => (
          <Link
            key={item.hash}
            to={{ pathname: '/', hash: item.hash }}
            onClick={onClose}
            style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
            tabIndex={open ? 0 : -1}
          >
            <span>{item.n}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="drawer__foot">
        <a href={LINKS.spotify} target="_blank" rel="noopener noreferrer" aria-label="Spotify" tabIndex={open ? 0 : -1}>
          <Icon name="spotify" />
        </a>
        <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" tabIndex={open ? 0 : -1}>
          <Icon name="youtube" />
        </a>
        <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" tabIndex={open ? 0 : -1}>
          <Icon name="instagram" />
        </a>
        <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" tabIndex={open ? 0 : -1}>
          <Icon name="facebook" />
        </a>
      </div>
    </div>
  )
}
