export const SICILY_TIME_ZONE = 'Europe/Rome'

export const LINKS = {
  coords: '37.07° N — 14.24° E · Sicilia',
  email: 'mailto:scrivi@casadisolare.com',
  address: 'Via del Tramonto 7, Marzamemi (SR)',
  unseen: 'https://unseen.co/',
  nikolas: 'https://www.nikolastype.com',
}

export const NavLinks = [
  { label: 'La casa', target: '#casa' },
  { label: 'Una giornata', target: '#giornata' },
  { label: 'Le stanze', target: '#stanze' },
  { label: 'Il carattere', target: '#carattere' },
  { label: 'Prenota', target: '#prenota', cta: true, href: '#prenota' },
]

/* marquee band */
export const MARQUEE = ['Luce', 'Calore', 'Pietra', 'Limoni', 'Mare', 'Vento', 'Ombra', 'Sale']

/* manifesto + house facts */
export const CASA_LIST = [
  { k: 'Luogo', v: 'Marzamemi (SR), Sicilia' },
  { k: 'Prima pietra', v: '1923' },
  { k: 'Pietra', v: 'Calcarenite locale' },
  { k: 'Giardino', v: '24 limoni, 7 ulivi' },
  { k: 'Esposizione', v: 'Sud-ovest' },
]

/* type tester */
export const PANGRAAMS = [
  'Luce e pietra, vento e sale.',
  'The quick brown fox jumps over a lazy dog.',
  'Pack my box with five dozen liquor jugs.',
  'Il sole decide la forma di ogni ombra.',
  'Sphinx of black quartz, judge my vow.',
  'Calore, limoni, mare e una casa bianca.',
  'How vexingly quick daft zebras jump!',
  'Every hour of the day is written in light.',
]

export const POSSIBLE_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

/* day cycle chapters */
export const CHAPTERS = [
  {
    chip: 'Alba — 06:12',
    title: 'The valley wakes up in rose gold.',
    body: 'The shutters open on their own, almost out of habit. First light gathers on the stone like spilled wine.',
    range: [0, 0.3],
  },
  {
    chip: 'Mezzogiorno — 13:00',
    title: 'The white walls play the light.',
    body: 'At noon the house becomes an instrument: the white bounces the sun, and shade becomes the luxury of the day.',
    range: [0.34, 0.62],
  },
  {
    chip: 'Tramonto — 19:47',
    title: 'The west terrace catches fire.',
    body: 'For eleven exact minutes, everything is amber. Then — the table is already set.',
    range: [0.68, 1.05],
  },
]

/* rooms */
export const ROOMS = [
  {
    num: 'USER 01',
    name: 'CUSTOMER',
    meta: 'The Right Help, When You Need It',
    desc: 'Tell UNIVO what you need through text, voice, or a photo. We understand the request, find the right qualified worker, and help you track the service from start to finish.',
    frame: 'Customer_scrolling_on_phone_202609021028.mp4',
    bg: 'Interior_of_traditional_Japanese._2K_202609022217.jpeg',
    alt: 'Customer scrolling on phone',
    flip: false,
  },
  {
    num: 'Stanza 02',
    name: 'La Suite del Limone',
    meta: '36 m² · 2 ospiti · Nel limoneto',
    desc: 'Waking up among the lemons: pale stone, washed linen, and a scent that enters without knocking.',
    frame: 'limone.jpg',
    alt: 'La Suite del Limone',
    flip: true,
  },
  {
    num: 'Stanza 03',
    name: 'La Biblioteca di Pietra',
    meta: '55 m² · 4 ospiti · Esposizione nord',
    desc: 'The noon refuge: walls a metre thick, cool all summer, a thousand books and not a single clock.',
    frame: 'biblioteca.jpg',
    alt: 'La Biblioteca di Pietra',
    flip: false,
  },
  {
    num: 'Stanza 04',
    name: 'La Cucina del Sole',
    meta: '30 m² · 10 ospiti · A tavola',
    desc: 'The heart of the house: a common walnut table, grandfather’s wood-fired oven, and the vegetable garden ten steps away.',
    frame: 'cucina.jpg',
    alt: 'La Cucina del Sole',
    flip: true,
  },
]

/* numbers */
export const NUMBERS = [
  { val: 312, label: 'giorni di sole, ogni anno', pad: 0 },
  { val: 1923, label: 'l’anno della prima pietra', pad: 0 },
  { val: 4, label: 'stanze — una per ogni luce', pad: 2 },
  { val: 11, label: 'minuti di tramonto, ogni sera', pad: 0 },
]

/* booking info */
export const BOOKING_INFO = [
  { k: 'Indirizzo', v: 'Via del Tramonto 7, Marzamemi (SR)' },
  { k: 'Scrivici', v: 'scrivi@casadisolare.com', href: LINKS.email },
  { k: 'Stagione', v: 'Aprile — Ottobre' },
]

export const MARQUEE_WORDS = MARQUEE