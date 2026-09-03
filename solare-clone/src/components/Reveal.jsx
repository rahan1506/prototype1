import { motion } from 'framer-motion'

export function Word({ text, delay = 0, className = '', emphasis = false, as: Tag = 'span' }) {
  const cls = [className, emphasis ? 'word-emphasis' : ''].filter(Boolean).join(' ')
  const words = text.split(' ')
  return (
    <Tag className={cls} aria-label={text}>
      {words.map((word, i) => (
        <span className="stagger-word" key={`${word}-${i}`}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.08 }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function FadeUp({ children, delay = 0, className = '', ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}