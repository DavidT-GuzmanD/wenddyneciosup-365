import { Fragment } from 'react'
import type { ElementType, Ref } from 'react'
import { useInView } from '../hooks/useInView'
import { cx } from '../lib/cx'

interface SplitTextProps {
  as?: ElementType
  className?: string
  /** El texto se parte en palabras; cada una entra desde abajo. */
  children: string
}

/**
 * Titular que entra palabra a palabra. Cada palabra vive en una caja con
 * `overflow:hidden`; el CSS le añade relleno y margen negativo para que esa
 * caja no corte tildes ni colas de letras.
 */
export function SplitText({ as, className, children }: SplitTextProps) {
  const Tag = (as ?? 'h2') as ElementType
  const { ref, inView } = useInView<HTMLElement>()
  const words = children.trim().split(/\s+/)

  return (
    <Tag ref={ref as Ref<HTMLElement>} className={cx('split', inView && 'in', className)}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {i > 0 && ' '}
          <span className="w">
            <i style={{ transitionDelay: `${i * 55}ms` }}>{word}</i>
          </span>
        </Fragment>
      ))}
    </Tag>
  )
}
