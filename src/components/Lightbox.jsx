import { useEffect, useCallback, useRef, useState } from 'react'

export default function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const image = images[currentIndex]
  const total = images.length
  const touchStart = useRef(null)
  const [zoomed, setZoomed] = useState(false)
  const scrollRef = useRef(null)

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + total) % total)
  }, [currentIndex, total, onNavigate])

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % total)
  }, [currentIndex, total, onNavigate])

  useEffect(() => {
    setZoomed(false)
  }, [currentIndex])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (zoomed) setZoomed(false)
        else onClose()
      } else if (!zoomed) {
        if (e.key === 'ArrowLeft') goPrev()
        else if (e.key === 'ArrowRight') goNext()
      }
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goPrev, goNext, zoomed])

  const handleTouchStart = (e) => {
    if (zoomed) return
    touchStart.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (zoomed) return
    if (touchStart.current === null) return
    const delta = e.changedTouches[0].clientX - touchStart.current
    const SWIPE_THRESHOLD = 50
    if (delta < -SWIPE_THRESHOLD) goNext()
    else if (delta > SWIPE_THRESHOLD) goPrev()
    touchStart.current = null
  }

  const handleImageClick = (e) => {
    e.stopPropagation()
    if (!zoomed) {
      setZoomed(true)
      requestAnimationFrame(() => {
        const el = scrollRef.current
        if (!el) return
        const x = (el.scrollWidth - el.clientWidth) / 2
        const y = (el.scrollHeight - el.clientHeight) / 2
        el.scrollTo(x, y)
      })
    } else {
      setZoomed(false)
    }
  }

  if (!image) return null

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>

        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {!zoomed && (
          <button className="lightbox-arrow lightbox-arrow--left hidden sm:flex" onClick={goPrev} aria-label="Previous">
            ←
          </button>
        )}

        <div
          ref={scrollRef}
          className={`lightbox-zoom-container ${zoomed ? 'lightbox-zoom-container--active' : ''}`}
          onClick={zoomed ? handleImageClick : undefined}
        >
          <img
            src={image.src}
            alt={image.title}
            className={zoomed ? 'lightbox-image-zoomed' : 'lightbox-image'}
            onClick={!zoomed ? handleImageClick : undefined}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            draggable={false}
          />
        </div>

        {!zoomed && (
          <button className="lightbox-arrow lightbox-arrow--right hidden sm:flex" onClick={goNext} aria-label="Next">
            →
          </button>
        )}

        <div className={`lightbox-info ${zoomed ? 'lightbox-info--hidden' : ''}`}>
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
