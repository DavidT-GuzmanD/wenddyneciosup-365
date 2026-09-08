import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from './useReducedMotion'

/**
 * El elemento se acerca ligeramente al puntero. Solo con ratón y si no se
 * pidió reducir el movimiento.
 */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !fine || reduced) return

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) * 0.22
      const y = (e.clientY - r.top - r.height / 2) * 0.3
      el.style.transform = `translate(${x}px,${y}px)`
    }
    const onLeave = () => {
      el.style.transform = ''
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.style.transform = ''
    }
  }, [fine, reduced])

  return ref
}
