import { Link } from 'react-router-dom'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SplitText } from '../SplitText'
import { MagneticA } from '../MagneticLink'
import { useInView } from '../../hooks/useInView'
import { MONTHS, PROMESAS } from '../../data/plan'
import { LINKS } from '../../data/site'
import { cx } from '../../lib/cx'

function MonthCard({ slug, name, num, i }: { slug: string; name: string; num: string; i: number }) {
  const { ref, inView } = useInView<HTMLAnchorElement>({ threshold: 0.1 })
  return (
    <Link
      ref={ref}
      to={`/${slug}/`}
      className={cx('mcard', inView && 'in')}
      style={{ transitionDelay: `${(i % 6) * 60}ms` }}
    >
      <em>{num}</em>
      <strong>{name}</strong>
      <Icon name="arrow" />
    </Link>
  )
}

export function Reto() {
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
            Un caminar íntimo, profundo y cercano con Dios. Elige tu mes y continúa el plan de
            lectura.
          </Reveal>
        </header>

        <div className="months">
          {MONTHS.map((m, i) => (
            <MonthCard key={m.slug} slug={m.slug} name={m.name} num={m.num} i={i} />
          ))}
        </div>

        <Reveal className="promesas">
          <p className="promesas__lb">
            <Icon name="sparkle" /> 365 promesas
          </p>
          <div className="promesas__list">
            {PROMESAS.map((p) => (
              <Link key={p.slug} to={`/${p.slug}/`}>
                {p.name}
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal className="cert">
          <img
            className="cert__img"
            src="/assets/img/certificado.jpg"
            alt="La Biblia en 365 días"
            data-parallax="-0.04"
            loading="lazy"
            decoding="async"
          />
          <div className="cert__copy">
            <h3>Llegaste a la meta</h3>
            <p>
              Empezaste un camino para toda la vida. Descarga tu certificado del reto cumplido y
              celébralo con quienes caminaron contigo.
            </p>
            <MagneticA className="btn btn--gold" href={LINKS.certificado}>
              <Icon name="download" />
              <span>Descargar certificado</span>
            </MagneticA>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
