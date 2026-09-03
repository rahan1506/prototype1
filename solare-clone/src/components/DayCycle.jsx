import { useEffect, useRef } from 'react'
import { CHAPTERS } from '../lib/data'

/* ---- color helpers ---- */
const hex = (h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
]
const mix = (a, b, t) => {
  const A = hex(a)
  const B = hex(b)
  return `rgb(${Math.round(A[0] + (B[0] - A[0]) * t)},${Math.round(A[1] + (B[1] - A[1]) * t)},${Math.round(
    A[2] + (B[2] - A[2]) * t,
  )})`
}
function sample(stops, p) {
  for (let i = 0; i < stops.length - 1; i++) {
    const [t0, c0] = stops[i]
    const [t1, c1] = stops[i + 1]
    if (p <= t1) return mix(c0, c1, Math.min(1, Math.max(0, (p - t0) / (t1 - t0))))
  }
  return stops[stops.length - 1][1]
}
const clampv = (v, a, b) => Math.min(b, Math.max(a, v))

const SKY = [
  [0, '#E9BE96'],
  [0.3, '#F2E0BC'],
  [0.55, '#F7F1E3'],
  [0.78, '#C97B45'],
  [0.92, '#4A2611'],
  [1, '#241207'],
]
const SUN = [
  [0, '#D86A2B'],
  [0.5, '#F2C14E'],
  [1, '#E0641F'],
]
const FAR = [
  [0, '#9C7A5C'],
  [0.55, '#8A6A4E'],
  [0.78, '#5A3A22'],
  [1, '#1D1009'],
]
const NEAR = [
  [0, '#3A2415'],
  [0.55, '#33200F'],
  [1, '#120A05'],
]

export default function DayCycle() {
  const sectionRef = useRef(null)
  const skyRef = useRef(null)
  const starsRef = useRef(null)
  const sunRef = useRef(null)
  const farRef = useRef(null)
  const nearRef = useRef(null)
  const houseRef = useRef(null)
  const win1Ref = useRef(null)
  const win2Ref = useRef(null)
  const timeRef = useRef(null)
  const fillRef = useRef(null)
  const uiRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* star field */
    for (let i = 0; i < 60; i++) {
      const s = document.createElement('span')
      s.className = 'day__star'
      s.style.left = `${Math.random() * 100}%`
      s.style.top = `${Math.random() * 100}%`
      s.style.animationDelay = `${(Math.random() * 4).toFixed(2)}s`
      s.style.animationDuration = `${(2.5 + Math.random() * 3.5).toFixed(2)}s`
      starsRef.current?.appendChild(s)
    }

    let lastP = -1

    const updateDay = (p) => {
      const setFill = (el, c) => el?.setAttribute('fill', c)

      skyRef.current.style.backgroundColor = sample(SKY, p)
      sunRef.current.style.backgroundColor = sample(SUN, p)
      setFill(farRef.current, sample(FAR, p))

      const nf = sample(NEAR, p)
      setFill(nearRef.current, nf)
      setFill(houseRef.current, nf)

      const arc = Math.sin(p * Math.PI)
      sunRef.current.style.left = `${8 + p * 84}%`
      sunRef.current.style.top = `${64 - arc * 49}%`
      sunRef.current.style.transform = `translate(-50%,-50%) scale(${1 + 0.18 * (1 - arc)})`

      starsRef.current.style.opacity = `${clampv((p - 0.8) / 0.16, 0, 1) * 0.9}`

      const lit = clampv((p - 0.7) / 0.18, 0, 1)
      const wc = mix('#5A4228', '#F2B03D', lit)
      setFill(win1Ref.current, wc)
      setFill(win2Ref.current, wc)

      const m = Math.round(372 + p * (1187 - 372))
      const hh = String(Math.floor(m / 60)).padStart(2, '0')
      const mm = String(m % 60).padStart(2, '0')
      timeRef.current.textContent = `${hh}:${mm}`

      /* chapters */
      const chapters = sectionRef.current?.querySelectorAll('.day__chapter') || []
      chapters.forEach((c) => {
        const [a, b] = c.dataset.range.split(',').map(Number)
        const o = clampv((p - a) / 0.06, 0, 1) * clampv((b - p) / 0.06, 0, 1)
        c.style.opacity = o
        c.style.transform = `translateY(${(1 - o) * 18}px)`
      })

      fillRef.current.style.transform = `scaleX(${p})`
      uiRef.current.classList.toggle('night', p > 0.8)
    }

    if (reduced) {
      updateDay(0.55)
      return
    }

    let rafId
    const loop = () => {
      const dr = sectionRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      if (dr.bottom > 0 && dr.top < vh) {
        const p = clampv(-dr.top / (dr.height - vh), 0, 1)
        if (Math.abs(p - lastP) > 0.0005) {
          updateDay(p)
          lastP = p
        }
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <section id="giornata" ref={sectionRef} aria-label="Una giornata in casa">
      <div className="day__sticky">
        <div className="day__sky" ref={skyRef} />
        <div className="day__stars" ref={starsRef} />
        <div className="day__sun" ref={sunRef} />
        <div className="day__land">
          <svg viewBox="0 0 1440 260" preserveAspectRatio="none" aria-hidden="true">
            <path
              ref={farRef}
              id="farHill"
              fill="#9C7A5C"
              d="M0 96 C120 56 260 78 400 58 C540 38 640 84 780 70 C920 56 1040 92 1180 66 C1290 46 1380 84 1440 72 L1440 260 L0 260 Z"
            />
            <path
              ref={nearRef}
              id="nearHill"
              fill="#33200F"
              d="M0 190 C150 140 300 168 470 150 C640 132 760 178 930 156 C1090 136 1230 180 1440 150 L1440 260 L0 260 Z"
            />
            <g ref={houseRef} fill="#33200F">
              <polygon points="554,114 670,114 612,84" />
              <rect x="560" y="112" width="62" height="44" />
              <polygon points="660,80 652,158 668,158" />
            </g>
            <rect ref={win1Ref} id="win1" x="570" y="122" width="10" height="13" fill="#5A4228" />
            <rect ref={win2Ref} id="win2" x="602" y="122" width="10" height="13" fill="#5A4228" />
          </svg>
        </div>

        <div className="day__ui" ref={uiRef} id="dayUI">
          <span className="day__label mono">02 — Una giornata in casa</span>
          <div className="day__time">
            <span ref={timeRef} id="dayTime">06:12</span>
            <small className="mono">Ora locale</small>
          </div>

          <div className="day__chapters">
            {CHAPTERS.map((c) => (
              <div
                className="day__chapter"
                key={c.chip}
                data-range={c.range.join(',')}
              >
                <span className="day__chip">{c.chip}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>

          <div className="day__progress">
            <div className="day__bar">
              <span className="day__fill" ref={fillRef} />
            </div>
            <div className="day__ticks mono">
              <span>Alba</span>
              <span>Mezzogiorno</span>
              <span>Tramonto</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}