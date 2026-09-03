export function smoothScrollTo(selector, offset = -20) {
  const el = document.querySelector(selector)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export function smoothScrollTop() {
  if (window.__lenis) window.__lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}