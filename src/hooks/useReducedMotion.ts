import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/** `true` si la persona pidió menos movimiento en su sistema. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/** `true` en dispositivos con puntero fino (ratón), donde los efectos de hover tienen sentido. */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover:hover) and (pointer:fine)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(hover:hover) and (pointer:fine)')
    const onChange = () => setFine(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return fine
}
