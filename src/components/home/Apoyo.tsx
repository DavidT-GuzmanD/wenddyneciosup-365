import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SplitText } from '../SplitText'
import { EMAIL, LINKS } from '../../data/site'
import { useToast } from '../../hooks/useToast'

export function Apoyo() {
  const { copy } = useToast()

  return (
    <section className="sec sec--apoyo" id="apoyo">
      <div className="wrap">
        <header className="sec-head sec-head--center">
          <img className="apoyo__heart float" src="/assets/img/hearts.jpg" alt="" loading="lazy" decoding="async" />
          <Reveal as="p" className="kicker kicker--c">
            <i />
            Ofrenda
          </Reveal>
          <SplitText className="h2">¿Quieres apoyar este ministerio?</SplitText>
          <Reveal as="p" className="sec-head__sub" d={1}>
            Si este contenido ha sido de bendición para ti y sientes en tu corazón el deseo de hacer
            una ofrenda, donativo o aporte, aquí te comparto cómo hacerlo.
          </Reveal>
        </header>

        <div className="give">
          <Reveal className="give__col">
            <p className="give__lb">
              <Icon name="globe" /> Internacionales
            </p>

            <a className="gcard gcard--paypal" href={LINKS.paypal} target="_blank" rel="noopener noreferrer">
              <Icon name="paypal" className="gcard__i" />
              <div>
                <strong>PayPal</strong>
                <span>paypal.me/wenddyneciosup</span>
              </div>
              <Icon name="arrow" className="gcard__a" />
            </a>

            <div className="gcard">
              <span className="gcard__logo gcard__logo--zelle">Z</span>
              <div>
                <strong>Zelle</strong>
                <span>{EMAIL}</span>
              </div>
              <button className="copy" aria-label="Copiar correo de Zelle" onClick={() => void copy(EMAIL)}>
                <Icon name="copy" />
              </button>
            </div>

            <div className="gcard">
              <span className="gcard__logo gcard__logo--wu">WU</span>
              <div>
                <strong>Western Union</strong>
                <span>Claudia Wenddy Neciosup Morales · Lima, Perú</span>
              </div>
              <a
                className="copy"
                href={LINKS.westernUnion}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ir a Western Union"
              >
                <Icon name="arrow" />
              </a>
            </div>
          </Reveal>

          <Reveal className="give__col" d={1}>
            <p className="give__lb">
              <Icon name="pin" /> Nacionales · Perú
            </p>
            <div className="qr">
              <img src="/assets/img/yape-qr.png" alt="Código QR de Yape para donaciones" loading="lazy" decoding="async" />
              <div className="qr__copy">
                <strong>Escanea con Yape</strong>
                <span>Apoya el ministerio desde tu app bancaria.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
