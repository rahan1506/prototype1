import { useEffect, useState } from 'react'
import SunMark from './SunMark'

/**
 * Frame — drop your photo/video into public/frames/<name> and it renders.
 * Until then a labelled placeholder is shown, so you know exactly
 * which file to add. A sun-mark animates gently while the slot is empty.
 */
export default function Frame({
  name,
  video,
  alt = '',
  className = '',
}) {
  const videoSrc = video || (name && name.endsWith('.mp4') ? `/frames/${name}` : null)
  const isVideo = Boolean(videoSrc)
  const src = videoSrc || `/frames/${name}`
  const [state, setState] = useState(isVideo ? 'ok' : 'loading')

  useEffect(() => {
    if (isVideo) {
      setState('ok')
      return
    }
    const img = new Image()
    img.onload = () => setState('ok')
    img.onerror = () => setState('missing')
    img.src = src
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src, isVideo])

  return (
    <figure className={`frame ${className} frame--${state}`}>
      {isVideo ? (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          aria-label={alt}
        />
      ) : state === 'ok' ? (
        <img src={src} alt={alt} />
      ) : (
        <div className="frame-ph" aria-hidden="true">
          <span className="frame-ph-inner">
            <SunMark className="frame-svg" />
            <span className="frame-name display">{alt || 'Casa di Solare'}</span>
            <span className="mono">{name}</span>
          </span>
        </div>
      )}
    </figure>
  )
}