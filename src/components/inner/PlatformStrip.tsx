import { Icon } from '../Icon'
import { MagneticA } from '../MagneticLink'
import type { Platform } from '../../data/site'

export function PlatformStrip({ text, platforms }: { text: string; platforms: Platform[] }) {
  return (
    <section className="strip">
      <div className="wrap strip__in">
        <p>{text}</p>
        <div className="strip__b">
          {platforms.map((p) => (
            <MagneticA key={p.name} className={`plat plat--${p.modifier}`} href={p.href}>
              <Icon name={p.icon} />
              <div>
                <span>{p.eyebrow}</span>
                <strong>{p.name}</strong>
              </div>
            </MagneticA>
          ))}
        </div>
      </div>
    </section>
  )
}
