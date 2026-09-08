import { useState } from 'react'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SplitText } from '../SplitText'
import { MagneticA } from '../MagneticLink'
import { LINKS } from '../../data/site'

const BOTON_IMG = '/assets/img/boton-certificado.png'

/**
 * El reto. La rejilla de los 12 meses y la barra de promesas se movieron
 * fuera de la portada: aquí solo queda la invitación y el certificado.
 */
export function Reto() {
  // Si la imagen del botón no está disponible, se cae al botón de texto
  // para que la descarga nunca quede sin acceso visible.
  const [imagenOk, setImagenOk] = useState(true)

  return (
    <section className="sec sec--reto" id="reto">
      <div className="wrap">
        <header className="sec-head sec-head--center">
          <Reveal as="p" className="kicker kicker--c">
            <i />
            El reto
          </Reveal>
          <SplitText className="h2">La Biblia en 365 días</SplitText>
          <Reveal as="p" className="sec-head__sub" d={1}>
            Un caminar íntimo, profundo y cercano con Dios, un día a la vez.
          </Reveal>
        </header>

        <div className="reto">
          <Reveal
            as="img"
            className="reto__img"
            src="/assets/img/certificado.jpg"
            alt="La Biblia en 365 días"
            data-parallax="-0.04"
            loading="lazy"
            decoding="async"
          />

          <div className="reto__copy">
            <Reveal as="h3" d={1}>
              Llegaste a la meta
            </Reveal>
            <Reveal as="p" d={2}>
              Empezaste un camino para toda la vida. Descarga tu certificado del reto cumplido y
              celébralo con quienes caminaron contigo.
            </Reveal>
            <Reveal className="row-cta" d={3}>
              {imagenOk ? (
                <MagneticA
                  className="cert-btn"
                  href={LINKS.certificado}
                  aria-label="Descargar el certificado del reto"
                >
                  <img
                    src={BOTON_IMG}
                    alt="Descargar certificado"
                    width={1536}
                    height={338}
                    decoding="async"
                    onError={() => setImagenOk(false)}
                  />
                </MagneticA>
              ) : (
                <MagneticA className="btn btn--gold" href={LINKS.certificado}>
                  <Icon name="download" />
                  <span>Descargar certificado</span>
                </MagneticA>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
