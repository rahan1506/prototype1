import { useEffect, useState } from 'react'
import SunMark from './SunMark'
import { smoothScrollTop } from '../lib/scroll'
import { LINKS, SICILY_TIME_ZONE } from '../lib/data'

export default function Footer() {
  const [time, setTime] = useState('--:--')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: SICILY_TIME_ZONE,
      hour: '2-digit',
      minute: '2-digit',
    })
    const hourFmt = new Intl.DateTimeFormat('en-GB', { timeZone: SICILY_TIME_ZONE, hour: 'numeric', hour12: false })
    const tick = () => {
      const now = new Date()
      const h = Number(hourFmt.format(now))
      const t = fmt.format(now)
      setTime(`A Marzamemi sono le ${t} — ${h >= 6 && h < 20 ? 'c\u2019\u00e8 il sole.' : 'c\u2019\u00e8 la luna.'}`)
    }
    tick()
    const id = setInterval(tick, 10000)
    return () => clearInterval(id)
  }, [])

  const toTop = () => smoothScrollTop()

  return (
    <footer>
      <div className="foot__mark display" data-reveal>
        Casa <em>di</em> Solare
      </div>

      <div className="foot__cols">
        <div>
          <h4>Esplora</h4>
          <a href="#casa">La casa</a>
          <a href="#giornata">Una giornata</a>
          <a href="#stanze">Le stanze</a>
          <a href="#carattere">Il carattere</a>
          <a href="#prenota">Prenota</a>
        </div>
        <div>
          <h4>Contatti</h4>
          <a href={LINKS.email}>scrivi@casadisolare.com</a>
          <p>{LINKS.address}</p>
          <p>Sicilia · {LINKS.coords}</p>
        </div>
        <div>
          <h4>Il carattere</h4>
          <p>“Solare” — a variable serif cut for the house.</p>
          <p>The typeface sits where its light falls best.</p>
        </div>
        <div>
          <h4>Le tue foto</h4>
          <p>
            Drop your frames into <span className="mono">public/frames/</span> —
            facciata.jpg · terrazza.jpg · limone.jpg · biblioteca.jpg · cucina.jpg
          </p>
        </div>
      </div>

      <div className="foot__base mono">
        <span>
          © {new Date().getFullYear()} Casa di Solare — fatto a mano, al sole.
        </span>
        <span id="footClock">{time}</span>
        <button className="up" onClick={toTop}>
          Torna su
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 13V2M1.5 6.5 6 2l4.5 4.5" />
          </svg>
        </button>
      </div>

      <div className="foot__credit mono">
        <SunMark className="foot-credit-svg" />
        <a href={LINKS.unseen} target="_blank" rel="noreferrer">Website by Unseen Studio<sup>®</sup></a>
        <span>·</span>
        <span>typeface concept after Nikolas Type</span>
      </div>
    </footer>
  )
}