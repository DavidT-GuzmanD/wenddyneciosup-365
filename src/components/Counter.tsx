import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface CounterProps {
  to: number
  duration?: number
}

/** Cuenta de 0 al valor final la primera vez que se ve. */
export function Counter({ to, duration = 1400 }: CounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.6 })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setValue(to)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const step = (t: number) => {
      const p = Math.min((t - t0) / duration, 1)
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduced])

  return (
    <span className="count" ref={ref}>
      {value}
    </span>
  )
}
