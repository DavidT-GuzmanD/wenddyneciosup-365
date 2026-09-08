import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import { EMAIL, LINKS, SOCIALS } from '../data/site'
import { PLAN_SLUG } from '../data/plan'
import { useToast } from '../hooks/useToast'

export function Footer() {
  const { copy } = useToast()

  return (
    <footer className="ftr">
      <div className="wrap ftr__in">
        <div className="ftr__brand">
          <img src="/assets/img/logo.png" alt="Wenddy Neciosup" />
          <p>Devocionales diarios, libros y podcast para caminar con Dios un día a la vez.</p>
          <div className="socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`soc soc--${s.modifier}`}
                aria-label={s.label}
              >
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
        </div>

        <nav className="ftr__nav" aria-label="Secciones">
          <h4>Explora</h4>
          <Link to={{ pathname: '/', hash: '#libro' }}>40 días de amistad con Dios</Link>
          <Link to={{ pathname: '/', hash: '#digital' }}>365 con Dios</Link>
          <Link to={{ pathname: '/', hash: '#podcast' }}>Podcast</Link>
          <Link to={{ pathname: '/', hash: '#reto' }}>La Biblia en 365 días</Link>
          <Link to={{ pathname: '/', hash: '#autora' }}>Sobre la autora</Link>
        </nav>

        <nav className="ftr__nav" aria-label="Plan de lectura">
          <h4>Plan 365</h4>
          <Link to={`/${PLAN_SLUG}/`}>La Biblia en 365 días</Link>
          <Link to="/enero/">Devocionales por mes</Link>
          <Link to="/promesas-enero/">365 promesas</Link>
          <a href={LINKS.certificado} target="_blank" rel="noopener noreferrer">
            Certificado del reto
          </a>
        </nav>

        <div className="ftr__contact">
          <h4>Contacto</h4>
          <button className="mailbtn" onClick={() => void copy(EMAIL)}>
            <Icon name="mail" />
            <span>{EMAIL}</span>
          </button>
          <p className="ftr__note">Haz clic para copiar el correo.</p>
        </div>
      </div>

      <div className="wrap ftr__base">
        <p>© {new Date().getFullYear()} Wenddyneciosup.com — Todos los derechos reservados.</p>
        <p>Diseño original: Miguel Flores · Rediseño y desarrollo 2026</p>
      </div>
    </footer>
  )
}
