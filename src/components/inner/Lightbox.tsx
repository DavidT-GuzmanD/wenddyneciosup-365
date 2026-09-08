import { useCallback, useEffect } from 'react'
import { Icon } from '../Icon'
import { cx } from '../../lib/cx'

interface LightboxProps {
  images: { src: string; alt: string }[]
  index: number | null
  onClose: () => void
  onIndex: (i: number) => void
}

/** Visor a pantalla completa con flechas, teclado y clic fuera para cerrar. */
export function Lightbox({ images, index, onClose, onIndex }: LightboxProps) {
  const open = index !== null
  const move = useCallback(
    (delta: number) => {
      if (index === null || !images.length) return
      onIndex((index + delta + images.length) % images.length)
    },
    [index, images.length, onIndex],
  )

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') move(-1)
      else if (e.key === 'ArrowRight') move(1)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, move])

  if (!open) return null
  const image = images[index]

  return (
    <div className={cx('lb', 'on')} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button className="lb__x" aria-label="Cerrar" onClick={onClose} autoFocus>
        <Icon name="chevron" />
      </button>
      <button className="lb__nav lb__prev" aria-label="Anterior" onClick={() => move(-1)}>
        <Icon name="chevron" className="ico--l" />
      </button>
      <img src={image?.src} alt={image?.alt ?? ''} />
      <button className="lb__nav lb__next" aria-label="Siguiente" onClick={() => move(1)}>
        <Icon name="chevron" className="ico--r" />
      </button>
    </div>
  )
}
