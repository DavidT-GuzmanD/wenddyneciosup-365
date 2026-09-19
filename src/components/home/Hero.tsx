import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SplitText } from '../SplitText'
import { MagneticA } from '../MagneticLink'
import { LINKS } from '../../data/site'
import { scrollToId } from '../../lib/scroll'

/**
 * Portada. Usa la fotografía editorial de la autora —la misma del sitio
 * original— en lugar de la cubierta del libro, que ya protagoniza la sección
 * «El libro». El texto se apoya sobre un velo cálido por la izquierda, que es
 * justo donde la foto deja aire.
 */
export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__photo" data-parallax="0.05" aria-hidden="true" />
      <div className="hero__veil" aria-hidden="true" />

      <div className="wrap hero__in">
        <div className="hero__copy">
          {/* <Reveal as="p" className="eyebrow">
            <Icon name="sparkle" /> Devocional diario · #365conDios
          </Reveal> */}

          <SplitText as="h1" className="hero__h1">
            La mejor amistad empieza cada mañana
          </SplitText>

          <Reveal as="p" className="hero__lede" d={1}>
            Un devocional al día para escuchar Su dirección, tomar mejores decisiones y llenarte de
            fe. Empieza con <strong>«40 días de amistad con Dios»</strong> y continúa con los 365.
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
