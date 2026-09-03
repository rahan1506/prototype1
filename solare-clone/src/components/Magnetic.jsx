import { motion } from 'framer-motion'

export function Magnetic({ children, strength = 0.35, className = '' }) {
  const onMouseMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const onMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0px, 0px)'
  }

  return (
    <motion.div
      className={`magnetic ${className}`}
      style={{ display: 'inline-block', transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}