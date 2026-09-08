import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from '../Icon'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useToast } from '../../hooks/useToast'
import { cx } from '../../lib/cx'

const BARS = 56

/** Perfil de onda estable para el estado en reposo. */
const BASE = Array.from({ length: BARS }, (_, i) =>
  Math.min(1, 0.28 + 0.5 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23) + Math.sin(i * 1.9) * 0.35)),
)

const fmt = (s: number): string => {
  if (!Number.isFinite(s)) return '--:--'
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

interface AudioPlayerProps {
  src: string
  title: string
}

/**
 * Reproductor con onda reactiva. Las 56 barras se escriben directamente en el
 * DOM desde el bucle de animación: pasarlas por el estado de React sería un
 * re-render por fotograma. Si el navegador o el origen no permiten el
 * analizador (por ejemplo con `file://`), cae a una onda sintética.
 */
export function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const waveRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<HTMLElement[]>([])
  const ctxRef = useRef<AudioContext | 'off' | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null)
  const rafRef = useRef(0)

  const reduced = useReducedMotion()
  const { toast } = useToast()
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(NaN)

  const collect = useCallback(() => {
    barsRef.current = Array.from(waveRef.current?.querySelectorAll('b') ?? [])
  }, [])

  useEffect(collect, [collect])

  const rest = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    barsRef.current.forEach((b, i) => {
      b.style.height = `${(BASE[i] ?? 0.4) * 100}%`
    })
  }, [])

  const animate = useCallback(() => {
    const audio = audioRef.current
    if (!audio || audio.paused) return
    const analyser = analyserRef.current
    const data = dataRef.current
    if (analyser && data) {
      analyser.getByteFrequencyData(data)
      for (let i = 0; i < BARS; i++) {
        const v = (data[Math.floor((i * data.length) / BARS)] ?? 0) / 255
        const bar = barsRef.current[i]
        if (bar) bar.style.height = `${Math.max((BASE[i] ?? 0.4) * 22, v * 100)}%`
      }
    } else {
      const t = performance.now() / 260
      for (let i = 0; i < BARS; i++) {
        const bar = barsRef.current[i]
        if (bar) bar.style.height = `${(BASE[i] ?? 0.4) * (0.55 + 0.45 * Math.abs(Math.sin(t + i * 0.42))) * 100}%`
      }
    }
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  const setupGraph = useCallback(() => {
    if (ctxRef.current || reduced) return
    const audio = audioRef.current
    if (!audio) return
    try {
      const Ctor = window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Ctor) return
      const ctx = new Ctor()
      const source = ctx.createMediaElementSource(audio)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 128
      analyser.smoothingTimeConstant = 0.75
      source.connect(analyser)
      analyser.connect(ctx.destination)
      ctxRef.current = ctx
      analyserRef.current = analyser
      dataRef.current = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount))
    } catch {
      // Origen no permitido para el analizador: seguimos con la onda sintética.
      ctxRef.current = 'off'
    }
  }, [reduced])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    setupGraph()
    const ctx = ctxRef.current
    if (ctx && ctx !== 'off' && ctx.state === 'suspended') void ctx.resume()

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setPlaying(true)
          animate()
        })
        .catch(() => toast('No se pudo reproducir el audio'))
    } else {
      audio.pause()
      setPlaying(false)
      rest()
    }
  }, [setupGraph, animate, rest, toast])

  const seek = useCallback((clientX: number) => {
    const audio = audioRef.current
    const wave = waveRef.current
    if (!audio || !wave || !audio.duration) return
    const r = wave.getBoundingClientRect()
    audio.currentTime = Math.min(Math.max((clientX - r.left) / r.width, 0), 1) * audio.duration
  }, [])

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current)
      const ctx = ctxRef.current
      if (ctx && ctx !== 'off') void ctx.close()
    }
  }, [])

  const progress = duration ? current / duration : 0
  const played = Math.round(progress * BARS)

  return (
    <div className="player">
      <div className="player__head">
        <span className="player__badge">
          <Icon name="headphones" /> Episodio destacado
        </span>
        <p className="player__title">{title}</p>
      </div>

      <div className="player__row">
        <button
          className={cx('player__play', playing && 'playing')}
          aria-label={playing ? 'Pausar' : 'Reproducir'}
          onClick={toggle}
        >
          <Icon name="play" className="i-play" />
          <Icon name="pause" className="i-pause" />
        </button>

        <div
          className="player__wave"
          ref={waveRef}
          role="slider"
          tabIndex={0}
          aria-label="Progreso del audio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          onClick={(e) => seek(e.clientX)}
          onKeyDown={(e) => {
            const audio = audioRef.current
            if (!audio?.duration) return
            if (e.key === 'ArrowRight') {
              audio.currentTime = Math.min(audio.duration, audio.currentTime + 10)
              e.preventDefault()
            } else if (e.key === 'ArrowLeft') {
              audio.currentTime = Math.max(0, audio.currentTime - 10)
              e.preventDefault()
            } else if (e.key === ' ' || e.key === 'Enter') {
              toggle()
              e.preventDefault()
            }
          }}
        >
          {BASE.map((h, i) => (
            <b key={i} className={i < played ? 'on' : undefined} style={{ height: `${h * 100}%` }} />
          ))}
        </div>

        <div className="player__time">
          <span>{fmt(current)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        preload="metadata"
        src={src}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onEnded={() => {
          setPlaying(false)
          rest()
        }}
      />
    </div>
  )
}
