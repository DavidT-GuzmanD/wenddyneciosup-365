import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'
import { useMagnetic } from '../hooks/useMagnetic'
import { cx } from '../lib/cx'

type AProps = AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }

/** Enlace externo con efecto magnético. Abre en pestaña nueva de forma segura. */
export function MagneticA({ className, children, href, ...rest }: AProps) {
  const ref = useMagnetic<HTMLAnchorElement>()
  const external = !!href && /^https?:/.test(href)
  return (
    <a
      ref={ref}
      href={href}
      className={cx('magnetic', className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}

/** Enlace interno (react-router) con efecto magnético. */
export function MagneticLink({ className, children, ...rest }: LinkProps & { children: ReactNode }) {
  const ref = useMagnetic<HTMLAnchorElement>()
  return (
    <Link ref={ref} className={cx('magnetic', className)} {...rest}>
      {children}
    </Link>
  )
}

/** Botón con efecto magnético. */
export function MagneticButton({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  const ref = useMagnetic<HTMLButtonElement>()
  return (
    <button ref={ref} className={cx('magnetic', className)} {...rest}>
      {children}
    </button>
  )
}
