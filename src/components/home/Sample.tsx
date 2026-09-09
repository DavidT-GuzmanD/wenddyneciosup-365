import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SplitText } from '../SplitText'
import { LINKS } from '../../data/site'

/**
 * Extracto real del libro, completo y sin plegar. Debajo de la ficha, fuera
 * de ella, la invitación a leerlo entero y dónde conseguirlo.
 */
export function Sample() {
  return (
    <section className="sec sec--sample" id="muestra">
      <div className="wrap">
        <header className="sec-head">
          <Reveal as="p" className="kicker">
            <i />
            Muestra gratuita
          </Reveal>
          <SplitText className="h2">Vitamina A — Ánimo</SplitText>
        </header>

        <Reveal as="article" className="page" d={1}>
          <div className="page__body">
            <p>
              Querido Paciente: una de las batallas que todos tenemos que pelear es la batalla con
              el desánimo. No tenemos ganas de nada; si estás apático, sin motivación, necesitas
              esta vitamina A, de ánimo.
            </p>
            <p>
              Debemos saber que nuestros sueños no siempre se cumplen según nuestro calendario.
              Basta mirar la agenda del año y todo lo que está en espera o por realizarse, porque
              definitivamente hay cosas que no podemos controlar.
            </p>
            <p>
              Atravesamos desengaños y adversidades, y es fácil perder el entusiasmo y la
              felicidad; te ves al espejo y estás, como dice la canción, «flaco, ojeroso, cansado y
              sin ilusiones». En estos momentos es bueno subir la dosis con el mejor entrenador del
              universo: <strong>Jesús</strong>. Él nos puede alentar y animar a seguir adelante.
            </p>

            <figure className="verse">
              <Icon name="quote" className="verse__q" />
              <blockquote>
                David estaba seriamente preocupado, porque sus soldados, en su profundo dolor por
                sus hijos, comenzaron a hablar de matarlo. Pero David halló fortaleza en el Señor su
                Dios.
              </blockquote>
              <figcaption>
                1 Samuel 30:6 <span>NBV</span>
              </figcaption>
            </figure>

            <p>
              Esto es lo que el rey David tuvo que hacer. Acababa de sufrir un importante revés; fue
              uno de los momentos más difíciles de su vida: su ciudad había sido destruida, su
              familia había sido secuestrada y todos los que trabajaban con él se volvieron en su
              contra. La situación se volvió imposible…
            </p>
          </div>

          <p className="page__quote">
            «Cuando no pasa nada bueno, no pierdas el ánimo: sigue fortalecido en Dios, confiando.»
          </p>
        </Reveal>

        <div className="sample__foot">
          <Reveal as="p" className="sample__more">
            Leerlo completo
          </Reveal>

          <Reveal
            as="img"
            className="sample__orn"
            src="/assets/img/ornamento.png"
            alt="También disponible en"
            width={216}
            height={109}
            loading="lazy"
            decoding="async"
          />

          <Reveal className="sample__stores" d={1}>
            <a className="store" href={LINKS.amazon40} target="_blank" rel="noopener noreferrer">
              <img className="store__a" src="/assets/img/btn-amazon.png" alt="Amazon" loading="lazy" decoding="async" />
              <img className="store__b" src="/assets/img/btn-amazon-h.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
            </a>
            <a className="store" href={LINKS.amazon365} target="_blank" rel="noopener noreferrer">
              <img className="store__a" src="/assets/img/btn-kindle.png" alt="Kindle" loading="lazy" decoding="async" />
              <img className="store__b" src="/assets/img/btn-kindle-h.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
