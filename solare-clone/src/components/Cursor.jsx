import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let mx1 = window.innerWidth / 2
    let my1 = window.innerHeight / 2
    let rx = mx1
    let ry = my1
    let rafId

    const dot = dotRef.current
    const ring = ringRef.current

    const onMove = (e) => {
      mx1 = e.clientX
      my1 = e.clientY
      dot.style.transform = `translate(${mx1 - 3}px, ${my1 - 3}px)`
    }

    const onOver = (e) => {
      const t = e.target
      if (t.closest('input, textarea, select')) {
        ring.style.opacity = 0
      } else {
        ring.style.opacity = 1
        ring.style.transform = ring.style.transform.replace(/scale\([^)]*\)/, '')
        ring.dataset.grow = t.closest('a, button, .frame, [data-hover]') ? '1' : '0'
      }
    }

    const ringLoop = () => {
      rx += (mx1 - rx) * 0.14
      ry += (my1 - ry) * 0.14
      const s = ring.dataset.grow === '1' ? 1.7 : 1
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px) scale(${s})`
      rafId = requestAnimationFrame(ringLoop)
    }

    if (!reduced) rafId = requestAnimationFrame(ringLoop)
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}