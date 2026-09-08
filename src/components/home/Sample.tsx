import { useState } from 'react'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SplitText } from '../SplitText'
import { MagneticButton } from '../MagneticLink'

/** Extracto real del libro, con el resto plegado hasta que se pide leerlo. */
export function Sample() {
  const [open, setOpen] = useState(false)

  return (
    <section className="sec sec--sample" id="muestra">
      <div className="wrap">
        <header className="sec-head">
          <Reveal as="p" className="kicker">
            <i />
            Muestra gratuita
          </Reveal>
          <SplitText className="h2">Así se lee un día</SplitText>
          <Reveal as="p" className="sec-head__sub" d={1}>
            Un extracto real del libro. Tómate cinco minutos, respira y lee despacio.
          </Reveal>
        </header>

        <Reveal as="article" className="page" d={1}>
          <div className="page__tab">
            <Icon name="calendar" /> Día 01
          </div>
          <h3 className="page__title">
            Vitamina A <em>— Ánimo</em>
          </h3>

          <div className="page__body">
            <p className="dropcap">
              Querido Paciente: una de las batallas que todos tenemos que pelear es la batalla con
              el desánimo. No tenemos ganas de nada; si estás apático, sin motivación, necesitas
              esta vitamina A, de ánimo.
            </p>
            <p>
              Debemos saber que nuestros sueños no siempre se cumplen según nuestro calendario.
              Basta mirar la agenda del año y todo lo que está en espera o por realizarse, porque
              definitivamente hay cosas que no podemos controlar.
            </p>

            {open && (
              <div className="more anim" id="sampleMore">
                <p>
                  Atravesamos desengaños y adversidades, y es fácil perder el entusiasmo y la
                  felicidad; te ves al espejo y estás, como dice la canción, «flaco, ojeroso,
                  cansado y sin ilusiones». En estos momentos es bueno subir la dosis con el mejor
                  entrenador del universo: <strong>Jesús</strong>. Él nos puede alentar y animar a
                  seguir adelante.
                </p>
                <figure className="verse">
                  <Icon name="quote" className="verse__q" />
                  <blockquote>
                    David estaba seriamente preocupado, porque sus soldados, en su profundo dolor
                    por sus hijos, comenzaron a hablar de matarlo. Pero David halló fortaleza en el
                    Señor su Dios.
                  </blockquote>
                  <figcaption>
                    1 Samuel 30:6 <span>NBV</span>
                  </figcaption>
                </figure>
                <p>
                  Esto es lo que el rey David tuvo que hacer. Acababa de sufrir un importante
                  revés; fue uno de los momentos más difíciles de su vida: su ciudad había sido
                  destruida, su familia había sido secuestrada y todos los que trabajaban con él se
                  volvieron en su contra. La situación se volvió imposible…
                </p>
              </div>
            )}
          </div>

          <p className="page__quote">
            «Cuando no pasa nada bueno, no pierdas el ánimo: sigue fortalecido en Dios,
            confiando.»
          </p>

          <MagneticButton
            className="btn btn--primary"
            aria-expanded={open}
            aria-controls="sampleMore"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? 'Mostrar menos' : 'Leerlo completo'}</span>
            <Icon name="chevron" className="ico--rot" />
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
