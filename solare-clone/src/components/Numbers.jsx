import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { NUMBERS } from '../lib/data'

function CountUp({ target, pad = 0, reduced }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [val, setVal] = useState(reduced ? target : 0)

  useEffect(() => {
    if (!inView || reduced) return
    let rafId
    const t0 = performance.now()
    const anim = (t) => {
      const p = Math.min((t - t0) / 1600, 1)
      setVal(Math.round(target * (1 - Math.pow(1 - p, 4))))
      if (p < 1) rafId = requestAnimationFrame(anim)
    }
    rafId = requestAnimationFrame(anim)
    return () => cancelAnimationFrame(rafId)
  }, [inView, target, reduced])

  return (
    <div className="num__val display" ref={ref}>
      {String(val).padStart(pad, '0')}
    </div>
  )
}

export default function Numbers() {
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <section id="numeri">
      <div className="sec-head mono" data-reveal>
        <span>—</span>
        <span>Alcuni numeri</span>
        <span className="rule" />
        <span>1923 → oggi</span>
      </div>

      <div className="nums">
        {NUMBERS.map((n, i) => (
          <div className="num" key={n.label} data-reveal style={{ '--d': `${i * 0.1}s` }}>
            <CountUp target={n.val} pad={n.pad} reduced={reduced} />
            <div className="num__label mono">{n.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}