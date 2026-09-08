import type { ComponentPropsWithoutRef, ElementType, ReactNode, Ref } from 'react'
import { useInView } from '../hooks/useInView'
import { cx } from '../lib/cx'

type RevealProps<T extends ElementType> = {
  /** Etiqueta a renderizar. Por defecto `div`. */
  as?: T
  /** Escalón de retardo. El CSS define los valores 1–5 en `.reveal[data-d]`. */
  d?: number
  className?: string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

/**
 * Aparece al entrar en pantalla. Es polimórfico a propósito: el estilo
 * `.reveal` se aplica sobre `p`, `li`, `div`… sin envoltorios extra que
 * romperían la maquetación.
 */
export function Reveal<T extends ElementType = 'div'>({
  as,
  d,
  className,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  const { ref, inView } = useInView<HTMLElement>()
  return (
    <Tag
      ref={ref as Ref<HTMLElement>}
      className={cx('reveal', inView && 'in', className)}
      data-d={d}
      {...rest}
    >
      {children}
    </Tag>
  )
}
