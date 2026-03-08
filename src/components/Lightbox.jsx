import { useEffect, useCallback } from 'react'

export default function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const image = images[currentIndex]
  const total = images.length

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + total) % total)
  }, [currentIndex, total, onNavigate])

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % total)
  }, [currentIndex, total, onNavigate])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goPrev, goNext])

  if (!image) return null

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Prev */}
        <button className="lightbox-arrow lightbox-arrow--left" onClick={goPrev} aria-label="Previous">
          ←
        </button>

        {/* Image */}
        <img
          src={image.src}
          alt={image.title}
          className="lightbox-image"
        />

        {/* Next */}
        <button className="lightbox-arrow lightbox-arrow--right" onClick={goNext} aria-label="Next">
          →
        </button>

        {/* Info bar */}
        <div className="lightbox-info">
          <p className="font-display text-lg md:text-xl font-light text-[#e8e4dc]">
            {image.title}
          </p>
          <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#e8e4dc]/55 mt-1">
            {image.year}{image.size ? ` — ${image.size}` : ''}
            <span className="ml-4">{currentIndex + 1} / {total}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
