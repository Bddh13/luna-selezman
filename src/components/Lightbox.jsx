import { useEffect, useCallback, useRef, useState } from 'react'

const MIN_SCALE = 1
const MAX_SCALE = 5
const SCALE_STEP = 0.5

export default function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const image = images[currentIndex]
  const total = images.length
  const touchStart = useRef(null)
  const pinchDist = useRef(null)
  const [scale, setScale] = useState(1)
  const [origin, setOrigin] = useState({ x: 50, y: 50 })
  const containerRef = useRef(null)

  const zoomed = scale > 1

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + total) % total)
  }, [currentIndex, total, onNavigate])

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % total)
  }, [currentIndex, total, onNavigate])

  useEffect(() => {
    setScale(1)
    setOrigin({ x: 50, y: 50 })
  }, [currentIndex])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (zoomed) { setScale(1); setOrigin({ x: 50, y: 50 }) }
        else onClose()
      } else if (!zoomed) {
        if (e.key === 'ArrowLeft') goPrev()
        else if (e.key === 'ArrowRight') goNext()
      } else if (e.key === '+' || e.key === '=') {
        setScale((s) => Math.min(s + SCALE_STEP, MAX_SCALE))
      } else if (e.key === '-') {
        setScale((s) => { const next = Math.max(s - SCALE_STEP, MIN_SCALE); if (next === 1) setOrigin({ x: 50, y: 50 }); return next })
      }
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goPrev, goNext, zoomed])

  const handleWheel = useCallback((e) => {
    e.preventDefault()
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setOrigin({ x, y })
    }
    setScale((s) => {
      const next = e.deltaY < 0 ? Math.min(s + SCALE_STEP, MAX_SCALE) : Math.max(s - SCALE_STEP, MIN_SCALE)
      if (next === 1) setOrigin({ x: 50, y: 50 })
      return next
    })
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      pinchDist.current = Math.hypot(dx, dy)
      touchStart.current = null
      return
    }
    if (zoomed) return
    touchStart.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && pinchDist.current !== null) {
      e.preventDefault()
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const delta = dist - pinchDist.current
      if (Math.abs(delta) > 10) {
        setScale((s) => {
          const next = Math.min(Math.max(s + (delta > 0 ? SCALE_STEP : -SCALE_STEP), MIN_SCALE), MAX_SCALE)
          if (next === 1) setOrigin({ x: 50, y: 50 })
          return next
        })
        pinchDist.current = dist
      }
    }
  }

  const handleTouchEnd = (e) => {
    pinchDist.current = null
    if (zoomed) return
    if (touchStart.current === null) return
    const delta = e.changedTouches[0].clientX - touchStart.current
    if (delta < -50) goNext()
    else if (delta > 50) goPrev()
    touchStart.current = null
  }

  const handleImageClick = (e) => {
    e.stopPropagation()
    if (!zoomed) {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setOrigin({ x, y })
      }
      setScale(2.5)
    } else {
      setScale(1)
      setOrigin({ x: 50, y: 50 })
    }
  }

  const zoomIn = (e) => {
    e.stopPropagation()
    setScale((s) => Math.min(s + SCALE_STEP, MAX_SCALE))
  }

  const zoomOut = (e) => {
    e.stopPropagation()
    setScale((s) => {
      const next = Math.max(s - SCALE_STEP, MIN_SCALE)
      if (next === 1) setOrigin({ x: 50, y: 50 })
      return next
    })
  }

  if (!image) return null

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
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
          ref={containerRef}
          className="lightbox-zoom-container"
          style={{ cursor: zoomed ? 'zoom-out' : 'zoom-in' }}
        >
          <img
            src={image.src}
            alt={image.title}
            className="lightbox-image"
            onClick={handleImageClick}
            draggable={false}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: `${origin.x}% ${origin.y}%`,
              transition: 'transform 0.25s ease',
            }}
          />
        </div>

        {!zoomed && (
          <button className="lightbox-arrow lightbox-arrow--right hidden sm:flex" onClick={goNext} aria-label="Next">
            →
          </button>
        )}

        {/* Zoom controls */}
        <div className="lightbox-zoom-controls">
          <button onClick={zoomOut} aria-label="Zoom out" disabled={scale <= MIN_SCALE}>−</button>
          <span className="font-sans text-[9px] tracking-[0.2em] text-[#e8e4dc]/50">
            {Math.round(scale * 100)}%
          </span>
          <button onClick={zoomIn} aria-label="Zoom in" disabled={scale >= MAX_SCALE}>+</button>
        </div>

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
