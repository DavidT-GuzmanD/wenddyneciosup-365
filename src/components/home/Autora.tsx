import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SplitText } from '../SplitText'
import { MagneticA } from '../MagneticLink'
import { BADGES, LINKS, TIMELINE } from '../../data/site'

export function Autora() {
  return (
    <section className="sec sec--autora" id="autora">
      <div className="wrap grid-2 grid-2--rev">
        <Reveal className="autora__media">
          <div className="autora__frame">
            <img
              src="/assets/img/wenddy-retrato.png"
              alt="Retrato de Wenddy Neciosup"
              data-parallax="-0.04"
              loading="lazy"
              decoding="async"
            />
          </div>
          <img
            className="autora__mini"
            src="/assets/img/wenddy-alas.jpg"
            alt="Wenddy Neciosup frente a un mural de alas"
            data-parallax="0.06"
            loading="lazy"
            decoding="async"
          />
          <div className="badges">
            {BADGES.map((b) => (
              <img key={b.alt} src={b.src} alt={b.alt} loading="lazy" decoding="async" />
            ))}
          </div>
        </Reveal>

        <div className="autora__copy">
          <Reveal as="p" className="kicker">
            <i />
            Sobre la autora
          </Reveal>
          <SplitText className="h2">Wenddy Neciosup</SplitText>
          <Reveal as="p" d={1}>
            Peruana de nacimiento, hija de pastores, la mayor de tres hermanas y descendiente de una
            familia de músicos. Licenciada en educación y psicología, técnica informática con
            diplomatura en Marketing Digital. Reconocida líder y maestra, apasionada por inspirar a
            las nuevas generaciones.
          </Reveal>

          <ol className="timeline">
            {TIMELINE.map((m, i) => (
              <Reveal as="li" key={m.year} d={i + 1}>
                <span>{m.year}</span>
                <div>
                  <strong>{m.title}</strong>
                  {m.text}
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="row-cta" d={2}>
            <MagneticA className="btn btn--dark" href={LINKS.instagram}>
              <Icon name="instagram" />
              <span>Seguir en Instagram</span>
            </MagneticA>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
