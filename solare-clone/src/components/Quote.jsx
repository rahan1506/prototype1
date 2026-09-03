import { FadeUp } from './Reveal'

export default function Quote() {
  return (
    <section className="quote">
      <p className="quote__it display" data-reveal>
        «Questa casa non ha padroni: ha un orario.»
      </p>
      <FadeUp delay={0.15}>
        <p className="quote__en mono" data-reveal style={{ '--d': '.15s' }}>
          This house has no owners — only a schedule. · carved on the architrave, 1923
        </p>
      </FadeUp>
    </section>
  )
}