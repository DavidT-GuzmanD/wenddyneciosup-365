const ITEMS = [
  '40 días de amistad con Dios',
  '#365conDios',
  'Un día a la vez',
  'Devocionales diarios',
  'La Biblia en 365 días',
]

/** Cinta infinita: el contenido va duplicado para que el bucle no salte. */
export function Marquee() {
  return (
    <div className="marquee" id="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((group) => (
          <div className="marquee__grp" key={group}>
            {ITEMS.map((text) => (
              <span key={text}>{text}</span>
            )).flatMap((node, i) => [node, <i key={`sep-${i}`}>✦</i>])}
          </div>
        ))}
      </div>
    </div>
  )
}
