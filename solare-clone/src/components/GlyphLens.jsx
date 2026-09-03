import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

/**
 * design_reference 3D-03 / WOW-05:
 * a cursor-following lens that reveals the "lit" glyph over its outline.
 */
export default function GlyphLens() {
  const ref = useRef(null)
  const mx = useMotionValue(-999)
  const my = useMotionValue(-999)
  const sx = useSpring(mx, { stiffness: 320, damping: 30, mass: 0.7 })
  const sy = useSpring(my, { stiffness: 320, damping: 30, mass: 0.7 })

  const lensX = useMotionTemplate`calc(${sx}px - 90px)`
  const lensY = useMotionTemplate`calc(${sy}px - 90px)`
  const clip = useMotionTemplate`circle(92px at ${sx}px ${sy}px)`

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }
  const onLeave = () => {
    mx.set(-999)
    my.set(-999)
  }

  return (
    <section className="glyph-sec" data-reveal>
      <div className="container">
        <div className="sec-head mono">
          <span>—</span>
          <span>Il sole pone le lettere</span>
          <span className="rule" />
          <span>specimen</span>
        </div>

        <div className="glyph" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
          <motion.span className="glyph-outline display" aria-hidden="true">
            Luce
          </motion.span>
          <motion.span className="glyph-filled display" aria-hidden="true" style={{ clipPath: clip, WebkitClipPath: clip }}>
            Luce
          </motion.span>

          <motion.div className="glyph-lens" style={{ x: lensX, y: lensY }} aria-hidden="true">
            <span className="glyph-lens-ring" />
          </motion.div>

          <span className="glyph-hint mono">sposta il cursore — la luce rivela il carattere</span>
        </div>
      </div>
    </section>
  )
}