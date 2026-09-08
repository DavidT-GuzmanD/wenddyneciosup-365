import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { SplitText } from '../components/SplitText'
import { MagneticA, MagneticLink } from '../components/MagneticLink'
import { PlatformStrip } from '../components/inner/PlatformStrip'
import { useInView } from '../hooks/useInView'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { planCovers, PROMESAS } from '../data/plan'
import { LINKS, PLATFORMS } from '../data/site'
import { cx } from '../lib/cx'

function Tile({ slug, name, num, cover, i }: { slug: string; name: string; num: string; cover: string; i: number }) {
  const { ref, inView } = useInView<HTMLAnchorElement>({ threshold: 0.08 })
  return (
    <Link
      ref={ref}
      to={`/${slug}/`}
      className={cx('tile', inView && 'in')}
      style={{ transitionDelay: `${(i % 8) * 45}ms` }}
    >
      <img src={cover} alt={`Portada de ${name}`} loading="lazy" decoding="async" />
      <span className="tile__b">
        <em>{num}</em>
        <strong>{name}</strong>
        <Icon name="arrow" />
      </span>
    </Link>
  )
}

export default function Plan() {
  useDocumentMeta(
    'La Biblia en 365 días · Plan de lectura — Wenddy Neciosup',
    'Plan de lectura bíblica de un año con Wenddy Neciosup: 12 meses de devocionales diarios con audio y video.',
  )

  return (
    <>
      <section className="phero phero--plan">
        <div className="phero__bg" aria-hidden="true">
          <span className="blob blob--1" />
          <span className="blob blob--2" />
        </div>
        <div className="wrap phero__in phero__in--center">
          <div>
            <nav className="crumbs" aria-label="Ruta">
              <Link to="/">Inicio</Link>
              <span>/</span>
              <b>La Biblia en 365 días</b>
            </nav>
            <SplitText as="h1" className="phero__h1">
              Plan de lectura bíblica
            </SplitText>
            <Reveal as="p" className="phero__lede" d={1}>
              Un año entero para caminar por la Palabra, un día a la vez. Elige tu mes y continúa
              donde lo dejaste.
            </Reveal>
            <Reveal className="phero__act" d={2}>
              <MagneticLink className="btn btn--primary" to="/enero/">
                <Icon name="calendar" />
                <span>Empezar por enero</span>
              </MagneticLink>
              <MagneticA className="btn btn--gold" href={LINKS.certificado}>
                <Icon name="download" />
                <span>Certificado del reto</span>
              </MagneticA>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec sec--tiles">
        <div className="wrap">
          <header className="sec-head sec-head--center">
            <Reveal as="p" className="kicker kicker--c">
              <i />
              Los 12 meses
            </Reveal>
            <SplitText className="h2">Elige tu mes</SplitText>
          </header>

          <div className="tiles">
            {planCovers().map(({ month, cover }, i) => (
              <Tile key={month.slug} slug={month.slug} name={month.name} num={month.num} cover={cover} i={i} />
            ))}
          </div>

          <Reveal className="promesas" style={{ marginTop: 36 }}>
            <p className="promesas__lb">
              <Icon name="sparkle" /> 365 promesas
            </p>
            <div className="promesas__list promesas__list--num">
              {PROMESAS.map((p) => (
                <Link key={p.slug} to={`/${p.slug}/`}>
                  <em>{p.num}</em>
                  {p.name}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <PlatformStrip
        text="Cada lectura tiene su episodio en audio y en video."
        platforms={PLATFORMS.slice(0, 3)}
      />
    </>
  )
}
