import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SplitText } from '../SplitText'
import { DIGITAL_FEATURES } from '../../data/site'

export function Digital() {
  return (
    <section className="sec sec--digital" id="digital">
      <div className="wrap">
        <header className="sec-head sec-head--center">
          <Reveal as="p" className="kicker kicker--c">
            <i />
            Libro digital
          </Reveal>
          <SplitText className="h2">365 días con Dios</SplitText>
          <Reveal as="p" className="sec-head__sub" d={1}>
            Inspiración diaria para tu camino espiritual. ¿Deseas fortalecer tu conexión con Dios
            día tras día? Esta es tu guía para un año lleno de reflexión.
          </Reveal>
        </header>

        <div className="digital">
          <Reveal
            as="img"
            className="digital__img"
            src="/assets/img/ipad-365.png"
            alt="Libro digital 365 con Dios en una tablet"
            data-parallax="-0.06"
            loading="lazy"
            decoding="async"
          />

          <div className="dcards">
            {DIGITAL_FEATURES.map((f, i) => (
              <Reveal as="article" className="dcard" key={f.title} d={i + 1}>
                <Icon name={f.icon} className="dcard__i" />
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="band">
          <p>
            ¡Haz de cada día un día con Dios! Con <strong>#365conDios</strong> estarás en el camino
            hacia una conexión más profunda con el eterno.
          </p>
          <img
            className="band__img"
            src="/assets/img/tablet-2023.jpg"
            alt="365 con Dios abierto en una tablet, junto a un móvil con el podcast"
            width={768}
            height={595}
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </div>
    </section>
  )
}
