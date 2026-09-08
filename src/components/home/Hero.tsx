import { useEffect, useRef } from 'react'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SplitText } from '../SplitText'
import { MagneticA } from '../MagneticLink'
import { LINKS } from '../../data/site'
import { useFinePointer, useReducedMotion } from '../../hooks/useReducedMotion'
import { scrollToId } from '../../lib/scroll'

export function Hero() {
  const art = useRef<HTMLDivElement>(null)
  const tilt = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()

  // La portada se inclina siguiendo al puntero.
  useEffect(() => {
    const zone = art.current
    const card = tilt.current
    if (!zone || !card || !fine || reduced) return

    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      card.style.transform = `perspective(1100px) rotateY(${px * 16}deg) rotateX(${-py * 13}deg) translateZ(24px)`
    }
    const onLeave = () => {
      card.style.transform = ''
    }

    zone.addEventListener('pointermove', onMove)
    zone.addEventListener('pointerleave', onLeave)
    return () => {
      zone.removeEventListener('pointermove', onMove)
      zone.removeEventListener('pointerleave', onLeave)
      card.style.transform = ''
    }
  }, [fine, reduced])

  return (
    <section className="hero" id="inicio">
      <div className="hero__bg" aria-hidden="true">
        <span className="blob blob--1" data-parallax="0.10" />
        <span className="blob blob--2" data-parallax="0.16" />
        <span className="blob blob--3" data-parallax="0.06" />
        <span className="grid-dots" />
      </div>

      <div className="wrap hero__in">
        <div className="hero__copy">
          <Reveal as="p" className="eyebrow">
            <Icon name="sparkle" /> Devocional diario · #365conDios
          </Reveal>

          <SplitText as="h1" className="hero__h1">
            40 días de amistad con Dios
          </SplitText>

          <Reveal as="p" className="hero__lede" d={1}>
            40 reflexiones inspiradoras y motivadoras que te ayudarán a tomar mejores decisiones y
            a llevar una vida en paz. La dinámica es simple: <strong>una reflexión por día</strong>.
          </Reveal>

          <Reveal className="hero__cta" d={2}>
            <MagneticA
              className="btn btn--primary"
              href="#muestra"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('muestra')
              }}
            >
              <Icon name="book" />
              <span>Leer una muestra</span>
            </MagneticA>
            <MagneticA
              className="btn btn--ghost"
              href="#podcast"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('podcast')
              }}
            >
              <Icon name="headphones" />
              <span>Escuchar el podcast</span>
            </MagneticA>
          </Reveal>

          <Reveal className="hero__trust" d={3}>
            <p className="hero__trust-lb">Escúchalo en</p>
            <div className="brands">
              <a className="brand brand--spotify" href={LINKS.spotify} target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                <Icon name="spotify" />
              </a>
              <a className="brand brand--yt" href={LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Icon name="youtube" />
              </a>
              <a className="brand brand--apple" href={LINKS.apple} target="_blank" rel="noopener noreferrer" aria-label="Apple Podcasts">
                <Icon name="apple" />
              </a>
              <a className="brand brand--amazon" href={LINKS.amazon365} target="_blank" rel="noopener noreferrer" aria-label="Amazon Music">
                <Icon name="amazon" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="hero__art" ref={art}>
          <div className="hero__stage">
            <div className="hero__halo" aria-hidden="true" />
            <span className="ring-wrap" aria-hidden="true">
              <span className="ring" />
            </span>
            <div className="tilt" ref={tilt}>
              <img
                className="hero__book"
                src="/assets/img/libro-40dias.png"
                alt="Portada del libro 40 días de amistad con Dios, de Wenddy Neciosup"
                width={800}
                height={787}
                fetchPriority="high"
              />
            </div>
          </div>
          <div className="hero__chips">
            <div className="chip">
              <strong>40</strong>
              <span>devocionales</span>
            </div>
            <div className="chip">
              <Icon name="award" />
              <span>Premio Águila</span>
            </div>
            <div className="chip">
              <Icon name="headphones" />
              <span>365 audios</span>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#marquee"
        className="scroll-cue"
        aria-label="Bajar"
        onClick={(e) => {
          e.preventDefault()
          scrollToId('marquee')
        }}
      >
        <span />
        desliza
      </a>
    </section>
  )
}
