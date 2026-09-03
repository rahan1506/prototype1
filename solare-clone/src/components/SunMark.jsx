const RAYS = Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI) / 6
  const r2 = i % 2 === 0 ? 46 : 38
  return {
    x1: 50 + 26 * Math.cos(a),
    y1: 50 + 26 * Math.sin(a),
    x2: 50 + r2 * Math.cos(a),
    y2: 50 + r2 * Math.sin(a),
  }
})

export default function SunMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="17" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        {RAYS.map((r, i) => (
          <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
        ))}
      </g>
    </svg>
  )
}