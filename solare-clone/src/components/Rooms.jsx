import { useEffect, useRef } from 'react'
import Frame from './Frame'
import { smoothScrollTo } from '../lib/scroll'
import { ROOMS } from '../lib/data'

function setRoomChip(name) {
  window.dispatchEvent(new CustomEvent('solar:room', { detail: name }))
}

export default function Rooms() {
  const framesRef = useRef([])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    let rafId
    const loop = () => {
      const vh = window.innerHeight
      framesRef.current.forEach((el) => {
        if (!el) return
        const img = el.querySelector('.frame > img, .frame .frame-ph')
        if (!img) return
        const r = el.getBoundingClientRect()
        if (r.bottom < 0 || r.top > vh) return
        const off = (r.top + r.height / 2 - vh / 2) / vh
        if (el.querySelector('.frame > img')) {
          el.querySelector('.frame > img').style.transform = `translateY(${(off * -6).toFixed(2)}%) scale(1.06)`
        }
      })
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <section id="stanze">
      <div className="sec-head mono" data-reveal>
        <span>04</span>
        <span>Le stanze</span>
        <span className="rule" />
        <span>Quattro luci</span>
      </div>

      <div className="stanze__intro" data-reveal>
        <h2 className="display">
          Quattro stanze, <em>quattro luci.</em>
        </h2>
        <p>
          Each room is named after the hour it belongs to. Choose the light you want to live in — the
          house takes care of the rest.
        </p>
      </div>

      {ROOMS.map((room) => (
        <article className={`room ${room.flip ? 'room--flip' : ''} ${room.bg ? 'room--bg' : ''}`} key={room.num} data-reveal>
          {room.bg && (
            <div className="room__bg-layer" aria-hidden="true">
              <img src={`/frames/${room.bg}`} alt="" className="room__bg-img" />
              <div className="room__bg-overlay"></div>
            </div>
          )}
          <div className="room__body">
            <span className="room__num mono">{room.num}</span>
            <h3 className="room__name display">{room.name}</h3>
            <p className="room__meta mono">{room.meta}</p>
            <p className="room__desc">{room.desc}</p>
            {room.num === 'USER 01' || room.num === 'Stanza 01' ? (
              <div className="room__actions">
                <a href="/register.html" className="nav-cta mono room__btn--primary">
                  Register
                </a>
                <a href="/login.html" className="nav-cta mono room__btn--secondary">
                  Login
                </a>
              </div>
            ) : (
              <a
                className="room__link mono"
                href="#casa"
                onClick={(e) => {
                  e.preventDefault()
                  smoothScrollTo('#casa')
                }}
              >
                Scopri la stanza
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 6h11M8 1.5 12.5 6 8 10.5" />
                </svg>
              </a>
            )}
          </div>
          <div
            className="room__media"
            ref={(el) => {
              framesRef.current = [...framesRef.current.filter(Boolean), el]
              return undefined
            }}
          >
            <div className="room__scale">
              <Frame name={room.frame} alt={room.alt} className="arch" />
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}