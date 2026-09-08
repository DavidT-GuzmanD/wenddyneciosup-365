import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from '../hooks/useReducedMotion'

/** Halo suave que sigue al puntero. Solo con ratón. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !fine || reduced) return

    document.body.classList.add('has-cursor')
    let tx = 0
    let ty = 0
    let x = 0
    let y = 0
    let raf = 0

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const loop = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.transform = `translate3d(${x}px,${y}px,0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
      document.body.classList.remove('has-cursor')
    }
  }, [fine, reduced])

  return <div className="cursor-glow" ref={ref} aria-hidden="true" />
}
