import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SplitText } from '../SplitText'
import { MagneticA } from '../MagneticLink'
import { AudioPlayer } from './AudioPlayer'
import { LINKS, PLATFORMS } from '../../data/site'

export function Podcast() {
  return (
    <section className="sec sec--pod" id="podcast">
      <div className="pod__bg" aria-hidden="true">
        <span className="blob blob--p1" data-parallax="0.12" />
        <span className="blob blob--p2" data-parallax="0.08" />
      </div>

      <div className="wrap pod">
        <div className="pod__copy">
          <Reveal as="p" className="kicker kicker--d">
            <i />
            Versión audible
          </Reveal>
          <SplitText className="h2 h2--light">Cada día Dios quiere hablarte</SplitText>
          <Reveal as="p" d={1}>
            Sé animado, edificado y retado para tener una amistad con Dios a diario. Sigue este
            devocional inspirado en mi libro <strong>#365conDios</strong>: lo he grabado con el
            corazón en la mano, en las madrugadas de tranquilidad, y viviendo un día a la vez.
          </Reveal>

          <Reveal d={2}>
            <AudioPlayer src={LINKS.audioSample} title="3 SET · Proverbios 3 — Creados para ayudar a otros" />
          </Reveal>

          <Reveal className="pod__links" d={3}>
            {PLATFORMS.map((p) => (
              <MagneticA key={p.name} className={`plat plat--${p.modifier}`} href={p.href}>
                <Icon name={p.icon} />
                <div>
                  <span>{p.eyebrow}</span>
                  <strong>{p.name}</strong>
                </div>
              </MagneticA>
            ))}
          </Reveal>
        </div>

        <Reveal className="pod__art">
          <img
            src="/assets/img/tablet-audio.png"
            alt="Podcast 365 con Dios en tablet y móvil"
            data-parallax="-0.08"
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </div>
    </section>
  )
}
