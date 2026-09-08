import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

export interface ScrollState {
  /** Progreso de lectura de la página, de 0 a 1. */
  progress: number
  /** El encabezado ya no está sobre el hero. */
  stuck: boolean
  /** Se está bajando: el encabezado se retira. */
  hidden: boolean
  /** Hay recorrido suficiente para ofrecer «volver arriba». */
  showTop: boolean
}

/**
 * Un único listener de scroll para toda la página: barra de progreso,
 * estado del encabezado, botón de volver arriba y las capas con parallax.
 * Las capas se leen del DOM (`[data-parallax]`) para no acoplar cada sección.
 */
export function useScrollEffects(deps: unknown[] = []): ScrollState {
  const reduced = useReducedMotion()
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    stuck: false,
    hidden: false,
    showTop: false,
  })

  useEffect(() => {
    let ticking = false
    let lastY = window.scrollY
    const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    const ctaBg = document.querySelector<HTMLElement>('.cta-final__bg')
    const ctaSec = document.querySelector<HTMLElement>('.cta-final')

    const run = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight

      setState((prev) => {
        const next: ScrollState = {
          progress: max > 0 ? y / max : 0,
          stuck: y > 30,
          hidden: y > lastY && y > 480 && !document.body.classList.contains('lock'),
          showTop: y > 900,
        }
        return prev.progress === next.progress &&
          prev.stuck === next.stuck &&
          prev.hidden === next.hidden &&
          prev.showTop === next.showTop
          ? prev
          : next
      })
      lastY = y

      if (!reduced) {
        const vh = window.innerHeight
        for (const el of layers) {
          const r = el.getBoundingClientRect()
          if (r.bottom < -200 || r.top > vh + 200) continue
          const speed = parseFloat(el.dataset.parallax ?? '0')
          const off = (r.top + r.height / 2 - vh / 2) * speed
          el.style.transform = `translate3d(0,${off.toFixed(1)}px,0)`
        }
        if (ctaBg && ctaSec) {
          const r = ctaSec.getBoundingClientRect()
          if (r.bottom > 0 && r.top < vh) {
            ctaBg.style.transform = `scale(1.14) translate3d(0,${((r.top - vh / 2) * -0.07).toFixed(1)}px,0)`
          }
        }
      }
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(run)
    }

    run()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps])

  return state
}
