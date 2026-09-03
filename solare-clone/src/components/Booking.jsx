import { useEffect, useState } from 'react'
import SunMark from './SunMark'
import { BOOKING_INFO } from '../lib/data'

const STARS = Array.from({ length: 40 }, () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 4}s`,
  duration: `${2.5 + Math.random() * 3.5}s`,
}))

function Toasts() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const add = (e) => {
      const { msg, err } = e.detail
      const id = Date.now() + Math.random()
      setItems((prev) => [...prev, { id, msg, err }])
      setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== id))
      }, 4200)
    }
    window.addEventListener('solar:toast', add)
    return () => window.removeEventListener('solar:toast', add)
  }, [])

  if (!items.length) return null
  return (
    <div className="toasts" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className={`toast ${t.err ? 'err' : ''}`}>
          <SunMark className="toast-svg" />
          <p>{t.msg}</p>
        </div>
      ))}
    </div>
  )
}

export default function Booking() {
  const today = new Date().toISOString().slice(0, 10)
  const [roomChip, setRoomChip] = useState(null)
  const [form, setForm] = useState({ arr: '', dep: '', guests: '2', email: '', note: '' })
  const [invalid, setInvalid] = useState({})

  useEffect(() => {
    const onRoom = (e) => setRoomChip(e.detail)
    window.addEventListener('solar:room', onRoom)
    return () => window.removeEventListener('solar:room', onRoom)
  }, [])

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setInvalid((v) => ({ ...v, [k]: false }))
  }

  const submit = (e) => {
    e.preventDefault()
    const bad = {}
    if (!form.arr) bad.arr = true
    if (!form.dep || (form.arr && new Date(form.dep) <= new Date(form.arr))) bad.dep = true
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) bad.email = true

    if (Object.keys(bad).length) {
      setInvalid(bad)
      window.dispatchEvent(
        new CustomEvent('solar:toast', {
          detail: { msg: 'Controlla i campi evidenziati — dates and a valid email are needed.', err: true },
        }),
      )
      return
    }

    window.dispatchEvent(
      new CustomEvent('solar:toast', {
        detail: {
          msg: `Richiesta inviata${roomChip ? ` — ${roomChip.replace('Stanza: ', '')}` : ''}. We reply within 24 hours. Grazie!`,
        },
      }),
    )
    setForm({ arr: '', dep: '', guests: '2', email: '', note: '' })
    setRoomChip(null)
  }

  return (
    <>
      <section id="prenota">
        <div className="book__stars" aria-hidden="true">
          {STARS.map((s, i) => (
            <span
              key={i}
              style={{
                left: s.left,
                top: s.top,
                animationDelay: s.delay,
                animationDuration: s.duration,
              }}
            />
          ))}
        </div>

        <div className="book__grid">
          <div>
            <div className="book__label mono" data-reveal>
              05 — Prenota
            </div>
            <h2 className="book__h display" data-reveal>
              Il tuo pezzo <em>di sole.</em>
            </h2>
            <div className="book__info" data-reveal>
              {BOOKING_INFO.map((r) => (
                <div key={r.k}>
                  <span className="k mono">{r.k}</span>
                  <span className="v">
                    {r.href ? <a href={r.href}>{r.v}</a> : r.v}
                  </span>
                </div>
              ))}
            </div>
            <p className="book__note" data-reveal>
              <SunMark className="book-note-svg" />We answer within 24 hours — between two suns.
            </p>
          </div>

          <form id="bookForm" noValidate data-reveal onSubmit={submit}>
            {roomChip && (
              <div className="chip" id="roomChip">
                <SunMark className="chip-svg" />
                <span>{roomChip}</span>
                <button type="button" aria-label="Rimuovi stanza" onClick={() => setRoomChip(null)}>
                  ✕
                </button>
              </div>
            )}

            <div className={`field ${invalid.arr ? 'invalid' : ''}`}>
              <label htmlFor="fArr">Arrivo</label>
              <input type="date" id="fArr" value={form.arr} min={today} onChange={set('arr')} />
            </div>
            <div className={`field ${invalid.dep ? 'invalid' : ''}`}>
              <label htmlFor="fDep">Partenza</label>
              <input type="date" id="fDep" value={form.dep} min={form.arr || today} onChange={set('dep')} />
            </div>
            <div className="field">
              <label htmlFor="fGuests">Ospiti</label>
              <select id="fGuests" value={form.guests} onChange={set('guests')}>
                <option value="1">1 ospite</option>
                <option value="2">2 ospiti</option>
                <option value="3">3 ospiti</option>
                <option value="4">4 ospiti</option>
                <option value="5">5 ospiti</option>
                <option value="6">6 ospiti</option>
                <option value="8">8 ospiti</option>
              </select>
            </div>
            <div className={`field ${invalid.email ? 'invalid' : ''}`}>
              <label htmlFor="fMail">Email</label>
              <input type="email" id="fMail" placeholder="nome@esempio.com" value={form.email} onChange={set('email')} />
            </div>

            <div className="field field--full">
              <label htmlFor="fMsg">Note (facoltative)</label>
              <textarea id="fMsg" rows="2" placeholder="Occasioni speciali, allergie, orari di arrivo…" value={form.note} onChange={set('note')} />
            </div>

            <button className="btn" type="submit">
              Richiedi disponibilità
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 6h11M8 1.5 12.5 6 8 10.5" />
              </svg>
            </button>
          </form>
        </div>
      </section>

      <Toasts />
    </>
  )
}