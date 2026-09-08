import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SplitText } from '../SplitText'
import { MagneticA } from '../MagneticLink'
import { BOOK_FEATURES, LINKS } from '../../data/site'
import { scrollToId } from '../../lib/scroll'

export function BookSection() {
  return (
    <section className="sec sec--book" id="libro">
      <div className="wrap grid-2">
        <Reveal className="book-visual">
          <div className="book-visual__glow" aria-hidden="true" />
          <span className="ring-wrap" aria-hidden="true">
            <span className="ring" />
          </span>
          <img
            className="book-visual__main tilt-soft"
            src="/assets/img/libro-40dias.png"
            alt="Libro 40 días de amistad con Dios"
            data-parallax="-0.05"
            loading="lazy"
            decoding="async"
          />
        </Reveal>

        <div className="book-copy">
          <Reveal as="p" className="kicker">
            <i />
            Libro impreso
          </Reveal>

          <SplitText className="h2">¿Qué es 40 días de amistad con Dios?</SplitText>

          <Reveal as="p" d={1}>
            Es un libro con <strong>40 reflexiones diarias</strong>, inspiracionales y motivadoras,
            que te ayudarán a tomar decisiones y a llevar una vida en paz y tranquila. Inspirado en{' '}
            <strong>#365conDios</strong>, presenta un devocional para cada uno de los 40 días.
          </Reveal>

          <Reveal as="p" d={2}>
            Cada devocional busca que profundices en tu relación con Dios y apliques el
            conocimiento, los valores y la sabiduría de la Biblia a tu vida diaria, con un lenguaje
            moderno que capta la belleza eterna de la Escritura.
          </Reveal>

          <ul className="feats">
            {BOOK_FEATURES.map((f, i) => (
              <Reveal as="li" key={f.title} d={i + 1}>
                <span>
                  <Icon name={f.icon} />
                </span>
                <div>
                  <strong>{f.title}</strong>
                  {f.text}
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal as="blockquote" className="pull" d={2}>
            La mejor amistad que podemos tener es con Dios: léelo un día a la vez, escucha Su
            dirección y llénate de fe conociendo Su propósito para tu vida, familia y ministerio.
          </Reveal>

          <Reveal className="row-cta" d={3}>
            <MagneticA className="btn btn--dark" href={LINKS.amazon40}>
              <Icon name="amazon" />
              <span>Comprar en Amazon</span>
            </MagneticA>
            <a
              className="btn btn--link"
              href="#muestra"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('muestra')
              }}
            >
              <span>Ver muestra de un día</span>
              <Icon name="arrow" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
