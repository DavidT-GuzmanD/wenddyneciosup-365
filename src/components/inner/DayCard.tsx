import { Icon } from '../Icon'
import { useInView } from '../../hooks/useInView'
import { cx } from '../../lib/cx'
import type { Card } from '../../data/plan'

interface DayCardProps {
  card: Card
  n: number
  alt: string
  index: number
  hidden: boolean
  onOpen: () => void
}

export function DayCard({ card, n, alt, index, hidden, onOpen }: DayCardProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.08, rootMargin: '0px 0px -4% 0px' })

  return (
    <article
      ref={ref}
      className={cx('day', inView && 'in')}
      style={{ transitionDelay: `${(index % 8) * 45}ms` }}
      hidden={hidden}
    >
      <button className="day__fig" aria-label={`Ampliar ${alt}`} onClick={onOpen}>
        <img src={card.img} alt={alt} loading="lazy" decoding="async" />
        <span className="day__n">{String(n).padStart(2, '0')}</span>
        <span className="day__zoom">
          <Icon name="sparkle" />
        </span>
      </button>

      <div className="day__act">
        {card.yt && (
          <a className="dbtn dbtn--yt" href={card.yt.trim()} target="_blank" rel="noopener noreferrer">
            <Icon name="youtube" />
            <span>Ver</span>
          </a>
        )}
        {card.sp && (
          <a className="dbtn dbtn--sp" href={card.sp.trim()} target="_blank" rel="noopener noreferrer">
            <Icon name="spotify" />
            <span>Escuchar</span>
          </a>
        )}
      </div>
    </article>
  )
}
