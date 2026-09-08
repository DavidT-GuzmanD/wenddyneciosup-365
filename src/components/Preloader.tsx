import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

/** Pantalla de carga inicial. Nunca bloquea: se retira sí o sí a los 3,5 s. */
export function Preloader() {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(false)

  useEffect(() => {
    const hide = () => setDone(true)
    const onLoad = () => window.setTimeout(hide, reduced ? 0 : 620)
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad)
    const failsafe = window.setTimeout(hide, 3500)
    return () => {
      window.removeEventListener('load', onLoad)
      window.clearTimeout(failsafe)
    }
  }, [reduced])

  return (
    <div className={done ? 'loader done' : 'loader'} aria-hidden="true">
      <div className="loader__inner">
        <img src="/assets/img/logo.png" alt="" className="loader__logo" />
        <div className="loader__bar">
          <span />
        </div>
        <p className="loader__txt">un día a la vez</p>
      </div>
    </div>
  )
}
