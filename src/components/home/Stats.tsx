import { Counter } from '../Counter'
import { Reveal } from '../Reveal'
import { STATS } from '../../data/site'

export function Stats() {
  return (
    <section className="stats">
      <div className="wrap stats__grid">
        {STATS.map((stat, i) => (
          <Reveal className="stat" key={stat.label} d={i}>
            <em>
              {stat.prefix}
              <Counter to={stat.value} />
              {stat.suffix}
            </em>
            <span>{stat.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
