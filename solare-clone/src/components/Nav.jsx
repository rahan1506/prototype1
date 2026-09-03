import { useEffect, useState } from 'react'
import { NavLinks, LINKS, SICILY_TIME_ZONE } from '../lib/data'
import { smoothScrollTo } from '../lib/scroll'
import SunMark from './SunMark'
import { Magnetic } from './Magnetic'

function useClock() {
  const [time, setTime] = useState('--:--')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: SICILY_TIME_ZONE,
      hour: '2-digit',
      minute: '2-digit',
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 10000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const time = useClock()

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (!menuOpen && !document.body.classList.contains('menu-open')) {
        if (y > lastY + 4 && y > 320) setHidden(true)
        else if (y < lastY - 4) setHidden(false)
      }
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [menuOpen])

  const go = (e, target) => {
    if (!target) return
    e.preventDefault()
    setMenuOpen(false)
    smoothScrollTo(target)
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`} id="nav">
        <a className="brand" href="#top" onClick={(e) => go(e, '#top')}>
          <SunMark />Casa <em>di</em> Univo
        </a>
        <nav className="nav-links mono">
          {NavLinks.map((l) =>
            l.cta ? (
              <Magnetic key={l.href}>
                <a className="nav-cta" href={l.href} onClick={(e) => go(e, l.target)}>
                  {l.label}
                </a>
              </Magnetic>
            ) : (
              <a key={l.target} href={l.target} onClick={(e) => go(e, l.target)}>
                {l.label}
              </a>
            ),
          )}
        </nav>
        <span className="mono nav-clock">Sicilia · <span id="navClock">{time}</span></span>
        <button
          className="burger"
          id="burger"
          aria-label="Apri menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`menu ${menuOpen ? 'open' : ''}`} id="menu">
        {NavLinks.filter((l) => !l.cta).map((l, i) => (
          <a key={l.target} href={l.target} onClick={(e) => go(e, l.target)} style={{ transitionDelay: `${i * 0.08}s` }}>
            {l.label}
          </a>
        ))}
        <div className="menu__foot mono">{LINKS.coords}</div>
      </div>
    </>
  )
}