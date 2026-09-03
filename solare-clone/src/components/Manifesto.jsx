import { useEffect, useRef, useState } from 'react'
import { FadeUp } from './Reveal'
import { CASA_LIST } from '../lib/data'

const WORDS = [
  { t: 'We', em: false },
  { t: 'built', em: false },
  { t: 'nothing.', em: false },
  { t: 'We', em: false },
  { t: 'simply', em: false },
  { t: 'placed', em: false },
  { t: 'the', em: false },
  { t: 'rooms', em: false },
  { t: 'where', em: false },
  { t: 'the', em: false },
  { t: 'light', em: true },
  { t: 'wanted', em: false },
  { t: 'to', em: false },
  { t: 'fall', em: false },
  { t: '—', em: false },
  { t: 'and', em: false },
  { t: 'let', em: false },
  { t: 'the', em: false },
  { t: 'sun', em: true },
  { t: 'decide', em: false },
  { t: 'the', em: false },
  { t: 'rest.', em: false },
]

export default function Manifesto() {
  const scrubRef = useRef(null)
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [lit, setLit] = useState(() => (reduced ? WORDS.length : 0))

  useEffect(() => {
    if (reduced) return
    const clampv = (v, a, b) => Math.min(b, Math.max(a, v))
    let rafId
    const update = () => {
      const el = scrubRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = clampv((vh * 0.75 - r.top) / (r.height + vh * 0.2), 0, 1)
      setLit(Math.round(p * WORDS.length))
      rafId = requestAnimationFrame(update)
    }
    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [reduced])

  return (
    <section id="casa">
      <div className="sec-head mono" data-reveal>
        <span>01</span>
        <span>La casa</span>
        <span className="rule" />
        <span>Casa di Solare</span>
      </div>

      <p className="scrub" ref={scrubRef} id="scrub">
        {WORDS.map((w, i) => (
          <span key={i} className={`w ${w.em ? 'w-em' : ''} ${i < lit ? 'on' : ''}`}>
            {w.t}{' '}
          </span>
        ))}
      </p>

      <FadeUp>
        <p className="casa__echo">Non abbiamo costruito nulla: abbiamo solo disposto le stanze dove la luce voleva cadere.</p>
      </FadeUp>

      <div className="casa__grid">
        <dl className="casa__list mono" data-reveal>
          {CASA_LIST.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>

        <FadeUp delay={0.15}>
          <p>
            The house was raised in 1923 from local calcarenite — thick walls, vaulted ceilings, oriented so that no
            hour of the day arrives unannounced. In the morning the light enters through the lemon garden; at noon it
            bounces off white lime; in the evening it floods the west terrace, then politely leaves.
          </p>
          <p>
            Nothing here is decorative. Every shutter, arch and metre of stone sits where it sits because the sun asked
            for it — and after a century, the arrangement still works. The typeface that carries the house’s name,
            Solare, was cut to the same logic: every letterform is placed where its light falls best.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}