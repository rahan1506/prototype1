import { useEffect, useState } from 'react'
import SunMark from './SunMark'

export default function Preloader() {
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [count, setCount] = useState(() => (reduced ? 100 : 0))
  const [done, setDone] = useState(reduced)

  useEffect(() => {
    document.body.classList.add('loading')

    if (reduced) {
      document.body.classList.remove('loading')
      document.body.classList.add('loaded')
      return
    }

    let rafId
    const t0 = performance.now()
    const DUR = 1500

    const step = (t) => {
      const e = Math.min((t - t0) / DUR, 1)
      setCount(Math.round(100 * (1 - Math.pow(1 - e, 3))))
      if (e < 1) rafId = requestAnimationFrame(step)
      else {
        document.fonts.ready.then(() => {
          document.body.classList.remove('loading')
          document.body.classList.add('loaded')
          setDone(true)
        })
      }
    }
    rafId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(rafId)
      document.body.classList.remove('loading')
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div className={`preloader ${done ? 'done' : ''}`} id="preloader">
      <div className="pre__col">
        <div className="pre__word mono">Casa di Solare — Marzamemi, Sicilia</div>
        <div className="pre__stage">
          <div className="pre__sunwrap">
            <SunMark />
          </div>
          <div className="pre__horizon" />
        </div>
      </div>
      <div className="pre__count" aria-hidden="true">{count}</div>
    </div>
  )
}