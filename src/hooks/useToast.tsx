import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface ToastApi {
  toast: (message: string) => void
  /** Copia al portapapeles y avisa; con respaldo para navegadores sin permiso. */
  copy: (text: string) => Promise<void>
}

const Ctx = createContext<ToastApi | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const toast = useCallback((text: string) => {
    setMessage(text)
    setOpen(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(false), 2400)
  }, [])

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        toast('Copiado: ' + text)
      } catch {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        try {
          document.execCommand('copy')
          toast('Copiado: ' + text)
        } catch {
          toast(text)
        }
        ta.remove()
      }
    },
    [toast],
  )

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <Ctx.Provider value={{ toast, copy }}>
      {children}
      <div className={open ? 'toast on' : 'toast'} role="status" aria-live="polite">
        {message}
      </div>
    </Ctx.Provider>
  )
}

export function useToast(): ToastApi {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider>')
  return ctx
}
