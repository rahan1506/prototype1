import { useState, useRef } from 'react'
import ThreeScene from './ThreeScene'
import Frame from './Frame'
import SunMark from './SunMark'

export default function Hero() {
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)

  const toggleAudio = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted
      videoRef.current.muted = nextMuted
      setIsMuted(nextMuted)
      if (!nextMuted) {
        videoRef.current.play().catch(() => { })
      }
    }
  }

  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero__video"
          src="/frames/facciata.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero__overlay" />
      </div>
      <ThreeScene />

      <div className="hero__eyebrow mono">
        <span>Dimora storica · Marzamemi, Sicilia</span>
        <span>37.07° N — 14.24° E</span>
      </div>

      <h1 className="hero__title">
        <span className="mask">
          <span className="l l1" style={{ '--i': 0 }}>Casa&nbsp;di</span>
        </span>
        <span className="mask">
          <span className="l l2" style={{ '--i': 1 }}>UNIVO</span>
        </span>
      </h1>

      <p className="hero__sub">
        <span className="mask">
          <span className="l">
            <span className="sub--dark">India Has the Skills. We Connect the Possibilities.</span><br />
            <em>One Workforce. Fairer Opportunities. Stronger Communities.</em>
          </span>
        </span>
      </p>

      <div className="hero__arch" data-reveal style={{ '--d': '.6s' }}>
        <SunMark className="hero__sun" />
        <Frame name="facciata.jpg" alt="La facciata a mezzogiorno" className="arch" />
        <figcaption className="hero__cap mono">La facciata a mezzogiorno — ore 13:00</figcaption>
      </div>

      <div className="hero__foot mono">
        <span>
          Scorri{' '}
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 1v11M1.5 8.5 6 13l4.5-4.5" />
          </svg>
        </span>
        <button
          type="button"
          onClick={toggleAudio}
          className={`hero__sound-toggle ${!isMuted ? 'playing' : ''}`}
          aria-label={isMuted ? 'Attiva audio' : 'Silenzia audio'}
        >
          <span>{isMuted ? '🔇' : '🔊'}</span>
          <span>{isMuted ? 'Audio: Spento' : 'Audio: Attivo'}</span>
        </button>
        <span>Est. 1923 — 312 giorni di sole</span>
      </div>
    </section>
  )
}