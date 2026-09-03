import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FadeUp } from './Reveal'
import { PANGRAAMS, POSSIBLE_CHARS } from '../lib/data'

function useScramble(value) {
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    let frame
    const start = performance.now()
    const duration = 700
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      if (p >= 1) {
        setDisplay(value)
        return
      }
      let out = ''
      const settle = Math.floor(value.length * p) + 1
      for (let i = 0; i < value.length; i++) {
        if (i < settle - (Math.random() > 0.6 ? 1 : 0)) {
          out += value[i]
        } else {
          out += POSSIBLE_CHARS[Math.floor(Math.random() * POSSIBLE_CHARS.length)]
        }
      }
      setDisplay(out)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])

  return display
}

function Slider({ label, value, min, max, step = 1, onChange, displayValue }) {
  return (
    <label className="tt-control">
      <span className="tt-control-head">
        <span className="mono">{label}</span>
        <span className="tt-control-val">{displayValue}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}

export default function TypeTester() {
  const [size, setSize] = useState(10)
  const [weight, setWeight] = useState(400)
  const [intensity, setIntensity] = useState(40)
  const [custom, setCustom] = useState('')
  const [pangramIndex, setPangramIndex] = useState(0)
  const stageRef = useRef(null)

  const text = custom.trim() || PANGRAAMS[pangramIndex]
  const scrambled = useScramble(text)

  const generate = () => setPangramIndex((i) => (i + 1) % PANGRAAMS.length)
  const opsz = Math.round(9 + (intensity / 100) * (144 - 9))
  const glow = (intensity / 100) * 12

  return (
    <section id="carattere" className="tt section">
      <div className="container">
        <div className="sec-head mono" data-reveal>
          <span>03</span>
          <span>Il carattere</span>
          <span className="rule" />
          <span>Solare — Nikolas Type</span>
        </div>

        <FadeUp>
          <h2 className="tt-title display">
            Solare, <em>la voce della casa.</em>
          </h2>
          <p className="tt-sub">
            Every letter is a room placed where the light wanted to fall. Interpolate
            its weight and intensity live — the same axes that give the house its hours.
          </p>
        </FadeUp>

        <div className="tt-layout">
          <div className="tt-panel">
            <FadeUp delay={0.05}>
              <div className="tt-panel-inner">
                <Slider label="Dimensione" value={size} min={6} max={22} onChange={setSize} displayValue={`${Math.round(size * 8.5)}px`} />
                <Slider label="Peso" value={weight} min={100} max={900} step={50} onChange={setWeight} displayValue={weight} />
                <Slider label="Intensità" value={intensity} min={0} max={100} onChange={setIntensity} displayValue={`${intensity}%`} />

                <motion.button type="button" className="btn btn--fill tt-generate" onClick={generate} whileTap={{ scale: 0.96 }}>
                  Nuovo pangramma <span className="arrow">↻</span>
                </motion.button>

                <input
                  className="tt-input"
                  type="text"
                  placeholder="(scrivi il tuo testo)"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  aria-label="Scrivi il tuo testo"
                />
              </div>
            </FadeUp>
          </div>

          <div className="tt-stage" ref={stageRef}>
            <FadeUp delay={0.1}>
              <p
                className="tt-sample display"
                style={{
                  fontSize: `${size * 8.5}px`,
                  fontFamily: 'var(--serif)',
                  fontVariationSettings: `'wght' ${weight}, 'opsz' ${opsz}`,
                  textShadow: intensity > 0 ? `0 0 ${glow}px rgba(193,90,46,${0.06 + intensity / 500})` : 'none',
                }}
                aria-live="polite"
              >
                {scrambled}
              </p>
              <div className="tt-meta mono">
                <span>wght {weight}</span>
                <span>·</span>
                <span>opsz {opsz}</span>
                <span>·</span>
                <span>{scrambled === text ? 'interpolazione live' : 'scramble…'}</span>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}