import { useEffect, useRef } from 'react'
import { MARQUEE } from '../lib/data'
import SunMark from './SunMark'

export default function Marquee() {
  const trackRef = useRef(null)
  const groupRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    const group = groupRef.current
    if (!track || !group) return
    const clone = group.cloneNode(true)
    clone.setAttribute('aria-hidden', 'true')
    track.appendChild(clone)
  }, [])

  return (
    <div className="mq" aria-label="Gli elementi della casa">
      <div className="mq__track" ref={trackRef}>
        <div className="mq__group" ref={groupRef}>
          {MARQUEE.map((w) => (
            <span key={w}>
              {w} <SunMark className="mq-center" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}