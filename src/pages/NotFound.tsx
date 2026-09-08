import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { SplitText } from '../components/SplitText'
import { Reveal } from '../components/Reveal'
import { MagneticLink } from '../components/MagneticLink'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { PLAN_SLUG } from '../data/plan'

export default function NotFound() {
  useDocumentMeta('Página no encontrada — Wenddy Neciosup')

  return (
    <section className="phero">
      <div className="phero__bg" aria-hidden="true">
        <span className="blob blob--1" />
        <span className="blob blob--2" />
      </div>
      <div className="wrap phero__in phero__in--center">
        <div>
          <nav className="crumbs" aria-label="Ruta">
            <Link to="/">Inicio</Link>
            <span>/</span>
            <b>No encontrada</b>
          </nav>
          <SplitText as="h1" className="phero__h1">
            Esta página no existe
          </SplitText>
          <Reveal as="p" className="phero__lede" d={1}>
            Puede que el enlace haya cambiado. Vuelve al inicio o entra al plan de lectura.
          </Reveal>
          <Reveal className="phero__act" d={2}>
            <MagneticLink className="btn btn--primary" to="/">
              <Icon name="arrow" />
              <span>Ir al inicio</span>
            </MagneticLink>
            <MagneticLink className="btn btn--ghost" to={`/${PLAN_SLUG}/`}>
              <Icon name="calendar" />
              <span>Plan de lectura</span>
            </MagneticLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
