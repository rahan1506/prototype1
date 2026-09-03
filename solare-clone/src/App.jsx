import { useEffect } from 'react'
import Lenis from 'lenis'
import Preloader from './components/Preloader'
import Grain from './components/Grain'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Manifesto from './components/Manifesto'
import DayCycle from './components/DayCycle'
import TypeTester from './components/TypeTester'
import Rooms from './components/Rooms'
import GlyphLens from './components/GlyphLens'
import Quote from './components/Quote'
import Numbers from './components/Numbers'
import Footer from './components/Footer'
import './App.css'

function App() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    window.__lenis = lenis
    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    if (!reduced) rafId = requestAnimationFrame(raf)

    /* heritage [data-reveal] observer (from ref.html) */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.__lenis = null
      io.disconnect()
    }
  }, [])

  return (
    <div className="page">
      <Preloader />
      <Grain />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <DayCycle />
        <TypeTester />
        <Rooms />
        <GlyphLens />
        <Quote />
        <Numbers />
      </main>
      <Footer />
    </div>
  )
}

export default App