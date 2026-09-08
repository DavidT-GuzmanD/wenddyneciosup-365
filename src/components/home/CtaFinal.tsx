import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SplitText } from '../SplitText'
import { MagneticA } from '../MagneticLink'
import { EMAIL, LINKS } from '../../data/site'

export function CtaFinal() {
  return (
    <section className="cta-final" id="contacto">
      <div className="cta-final__bg" aria-hidden="true" />
      <div className="wrap cta-final__in">
        <SplitText className="h2--light">Empieza hoy tus 40 días</SplitText>
        <Reveal as="p" d={1}>
          Un devocional al día. Una decisión a la vez. Una amistad que dura toda la vida.
        </Reveal>
        <Reveal className="row-cta row-cta--c" d={2}>
          <MagneticA className="btn btn--primary btn--lg" href={LINKS.amazon40}>
            <Icon name="amazon" />
            <span>Conseguir el libro</span>
          </MagneticA>
          <MagneticA className="btn btn--outline btn--lg" href={`mailto:${EMAIL}`}>
            <Icon name="mail" />
            <span>Escríbeme</span>
          </MagneticA>
        </Reveal>
      </div>
    </section>
  )
}
