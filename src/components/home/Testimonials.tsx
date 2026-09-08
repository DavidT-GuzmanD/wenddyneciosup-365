import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SplitText } from '../SplitText'
import { TESTIMONIALS } from '../../data/site'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Carrusel con avance automático que se detiene en cuanto alguien interactúa. */
export function Testimonials() {
  const row = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const stopped = useRef(false)

  const step = useCallback(() => {
    const el = row.current
    const first = el?.firstElementChild as HTMLElement | null
    return first ? first.getBoundingClientRect().width + 24 : 400
  }, [])

  const sync = useCallback(() => {
    const el = row.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth - 4
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft >= max)
  }, [])

  const go = useCallback(
    (dir: -1 | 1) => {
      row.current?.scrollBy({ left: dir * step(), behavior: reduced ? 'auto' : 'smooth' })
    },
    [step, reduced],
  )

  useEffect(() => {
    const el = row.current
    if (!el) return
    sync()

    let timer: number | undefined
    const start = () => {
      if (reduced || stopped.current || timer) return
      timer = window.setInterval(() => {
        const max = el.scrollWidth - el.clientWidth - 4
        if (el.scrollLeft >= max) el.scrollTo({ left: 0, behavior: 'smooth' })
        else el.scrollBy({ left: step(), behavior: 'smooth' })
      }, 5200)
    }
    const stop = () => {
      window.clearInterval(timer)
      timer = undefined
    }
    const halt = () => {
      stopped.current = true
      stop()
    }

    const onScroll = () => requestAnimationFrame(sync)
    el.addEventListener('scroll', onScroll, { passive: true })
    for (const ev of ['pointerdown', 'wheel', 'touchstart'] as const) {
      el.addEventListener(ev, halt, { passive: true })
    }
    el.addEventListener('pointerenter', stop)
    el.addEventListener('pointerleave', start)

    const io = new IntersectionObserver((es) => (es.some((e) => e.isIntersecting) ? start() : stop()), {
      threshold: 0.25,
    })
    io.observe(el)

    return () => {
      stop()
      io.disconnect()
      el.removeEventListener('scroll', onScroll)
      for (const ev of ['pointerdown', 'wheel', 'touchstart'] as const) {
        el.removeEventListener(ev, halt)
      }
      el.removeEventListener('pointerenter', stop)
      el.removeEventListener('pointerleave', start)
    }
  }, [reduced, step, sync])

  return (
    <section className="sec sec--tst" id="testimonios">
      <div className="wrap">
        <header className="sec-head sec-head--row">
          <div>
            <Reveal as="p" className="kicker">
              <i />
              Opiniones
            </Reveal>
            <SplitText className="h2">Lo que dicen del libro</SplitText>
          </div>
          <Reveal className="tst__nav" d={1}>
            <button className="rnd" aria-label="Anterior" onClick={() => go(-1)} disabled={atStart}>
              <Icon name="chevron" className="ico--l" />
            </button>
            <button className="rnd" aria-label="Siguiente" onClick={() => go(1)} disabled={atEnd}>
              <Icon name="chevron" className="ico--r" />
            </button>
          </Reveal>
        </header>
      </div>

      <div className="tst">
        <div className="tst__row" ref={row}>
          {TESTIMONIALS.map((t) => (
            <article className="tcard" key={t.name}>
              <Icon name="quote" className="tcard__q" />
              <p>{t.quote}</p>
              <footer>
                <img src={t.photo} alt="" loading="lazy" decoding="async" />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
