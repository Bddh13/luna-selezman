import { useEffect, useRef, useState, useCallback } from 'react'
import Lightbox from './Lightbox'

const COLLECTIONS = [
  {
    id: 'collection_01',
    title: 'Angels',
    heroFile: 'dancing_angel_2024.jpeg',
    works: [
      { file: 'ardhanarishvara_2025_80x120.jpeg',   title: 'Ardhanarishvara',  year: 2025, size: '80 × 120 cm' },
      { file: 'dancing_angel_2024.jpeg',             title: 'Dancing Angel',    year: 2024 },
      { file: 'demons_2024_80x120.jpeg',             title: 'Demons',           year: 2024, size: '80 × 120 cm' },
      { file: 'second_angel_2024_70x70.jpeg',        title: 'Second Angel',     year: 2024, size: '70 × 70 cm' },
      { file: 'angels_kiss_2024.jpeg',              title: "Angel's Kiss",     year: 2024 },
      { file: 'dancing_Harpy_2023_40x60.jpeg',      title: 'Dancing Harpy',    year: 2023, size: '40 × 60 cm' },
      { file: 'two_angels_2024_80x120.jpeg',         title: 'Two Angels',       year: 2024, size: '80 × 120 cm' },
    ],
  },
  {
    id: 'collection_03',
    title: 'Visionary Art',
    heroFile: 'buddha_2024_80x100.jpeg',
    works: [
      { file: 'winter_blooming_2025_90x120.jpeg',    title: 'Winter Blooming',  year: 2025, size: '90 × 120 cm' },
      { file: 'buddha_2024_80x100.jpeg',             title: 'Buddha',           year: 2024, size: '80 × 100 cm' },
      { file: 'mediitation_2024_50x70.jpeg',         title: 'Meditation',       year: 2024, size: '50 × 70 cm' },
      { file: 'blossom_2025_80x110.jpeg',           title: 'Blossom',          year: 2025, size: '80 × 110 cm' },
    ],
  },
  {
    id: 'collection_02',
    title: 'Self-Portrait',
    heroFile: 'she_60×80_2025.jpg',
    works: [
      { file: 'she_60×80_2025.jpg',                          title: 'She',                         year: 2025, size: '60 × 80 cm' },
      { file: 'dreams_2025_80x80.jpeg',                     title: 'Dreams',                      year: 2025, size: '80 × 80 cm' },
      { file: 'the_Id_ego_and_superego_2025_70x70.jpeg',    title: 'The Id, Ego and Superego',    year: 2025, size: '70 × 70 cm' },
      { file: 'the_touch_2025_70x70.jpeg',                  title: 'The Touch',                   year: 2025, size: '70 × 70 cm' },
      { file: 'shining_2024_80x120.jpeg',                   title: 'Shining',                     year: 2024, size: '80 × 120 cm' },
    ],
  },
  {
    id: 'meditation',
    title: 'Meditation',
    heroFile: 'meditation01_2025_200x200.jpg',
    link: { href: 'https://www.bddh13.com/meditation', label: 'About the Vernissage' },
    works: [
      { file: 'meditation01_2025_200x200.jpg', title: 'Meditation I',   year: 2025, size: '200 × 200 cm' },
      { file: 'meditation02_2025_200x200.jpg', title: 'Meditation II',  year: 2025, size: '200 × 200 cm' },
      { file: 'meditation03_2025_200x200.jpg', title: 'Meditation III', year: 2025, size: '200 × 200 cm' },
    ],
  },
]

const FEATURED = {
  file: 'thought_2026_80x120.png',
  title: 'Thought',
  year: 2026,
  size: '80 × 120 cm',
  note: 'THE FIRST DROP FROM THE DRAGON COLLECTION',
}

const totalWorks = COLLECTIONS.reduce((sum, c) => sum + c.works.length, 0) + 1

const allImages = [
  { src: `/art/${FEATURED.file}`, title: FEATURED.title, year: FEATURED.year, size: FEATURED.size },
  ...COLLECTIONS.flatMap((c) =>
    c.works.map((w) => ({
      src: `/art/${c.id}/${w.file}`,
      title: w.title,
      year: w.year,
      size: w.size,
    })),
  ),
]

function flatIndexOf(colIdx, workIdx) {
  let idx = 1
  for (let i = 0; i < colIdx; i++) idx += COLLECTIONS[i].works.length
  return idx + workIdx
}

function Carousel({ collection, colIdx, activeIdx, onActiveChange, onOpen }) {
  const stripRef = useRef(null)
  const touchStart = useRef(null)
  const works = collection.works

  const scrollToIdx = (idx) => {
    const el = stripRef.current
    if (!el) return
    const items = el.querySelectorAll('.carousel-card')
    if (items[idx]) {
      const card = items[idx]
      const scrollLeft = card.offsetLeft - el.clientWidth / 2 + card.offsetWidth / 2
      el.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }

  const goPrev = () => {
    const next = (activeIdx - 1 + works.length) % works.length
    onActiveChange(next)
    scrollToIdx(next)
  }

  const goNext = () => {
    const next = (activeIdx + 1) % works.length
    onActiveChange(next)
    scrollToIdx(next)
  }

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return
    const delta = e.changedTouches[0].clientX - touchStart.current
    if (delta < -50) goNext()
    else if (delta > 50) goPrev()
    touchStart.current = null
  }

  return (
    <div className="relative group/carousel">
      <button
        className="carousel-arrow carousel-arrow--left"
        onClick={goPrev}
        aria-label="Previous"
      >
        ←
      </button>

      <div
        ref={stripRef}
        className="carousel-strip"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {works.map((work, i) => (
          <div
            key={work.file}
            className={`carousel-card ${i === activeIdx ? 'carousel-card--active' : ''}`}
            onClick={() => {
              onActiveChange(i)
              scrollToIdx(i)
            }}
            onDoubleClick={() => onOpen(flatIndexOf(colIdx, i))}
          >
            <img
              src={`/art/${collection.id}/${work.file}`}
              alt={work.title}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <button
        className="carousel-arrow carousel-arrow--right"
        onClick={goNext}
        aria-label="Next"
      >
        →
      </button>
    </div>
  )
}

export default function Gallery() {
  const sectionRef = useRef(null)
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const [activeIndices, setActiveIndices] = useState(() =>
    COLLECTIONS.map((c) => {
      const idx = c.works.findIndex((w) => w.file === c.heroFile)
      return idx >= 0 ? idx : 0
    }),
  )

  const openLightbox = useCallback((flatIdx) => setLightboxIndex(flatIdx), [])
  const closeLightbox = useCallback(() => setLightboxIndex(-1), [])

  const setActiveForCol = useCallback((colIdx, workIdx) => {
    setActiveIndices((prev) => {
      const next = [...prev]
      next[colIdx] = workIdx
      return next
    })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )

    const items = sectionRef.current?.querySelectorAll('.gallery-item')
    items?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-[#080808] border-t border-[#222] pt-16 pb-20 md:pt-24 md:pb-28"
    >
      <div className="px-6 md:px-12 mb-10 flex items-baseline justify-between border-b border-[#222] pb-6">
        <h2 className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#e8e4dc]/55">
          Selected Works
        </h2>
        <span className="font-sans text-[10px] tracking-[0.2em] text-[#e8e4dc]/40">
          ({totalWorks})
        </span>
      </div>

      {/* Featured work */}
      <div className="mb-24">
        <div className="px-6 md:px-12 mb-2">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#e8e4dc]/45">
            {FEATURED.note}
          </p>
        </div>
        <div
          className="gallery-item px-6 md:px-12 mb-4 cursor-pointer"
          onClick={() => openLightbox(0)}
        >
          <div className="relative overflow-hidden">
            <img
              src={`/art/${FEATURED.file}`}
              alt={FEATURED.title}
              className="w-full max-h-[75vh] object-contain transition-transform duration-500 hover:scale-[1.02]"
            />
            <div className="gallery-overlay">
              <div>
                <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#d4a843] mb-1">
                  {FEATURED.year} — {FEATURED.size}
                </p>
                <p className="font-display text-xl font-light text-[#e8e4dc]">
                  {FEATURED.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {COLLECTIONS.map((collection, colIdx) => {
        const activeWork = collection.works[activeIndices[colIdx]]
        const heroFlatIdx = flatIndexOf(colIdx, activeIndices[colIdx])

        return (
          <div key={collection.id} className="mb-24 last:mb-0">
            {/* Header */}
            <div className="px-6 md:px-12 mb-6 flex items-baseline justify-between">
              <h3 className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#e8e4dc]/45">
                {collection.title}
                <span className="ml-4 text-[#e8e4dc]/35">({collection.works.length})</span>
              </h3>
              {collection.link && (
                <a
                  href={collection.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[10px] tracking-[0.2em] text-[#d4a843] hover:text-[#e8e4dc] transition-colors duration-200"
                >
                  {collection.link.label}
                </a>
              )}
            </div>

            {/* Hero image */}
            <div
              className="gallery-item px-6 md:px-12 mb-6 cursor-pointer"
              onClick={() => openLightbox(heroFlatIdx)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={`/art/${collection.id}/${activeWork.file}`}
                  alt={activeWork.title}
                  className="w-full max-h-[70vh] object-contain transition-transform duration-500 hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#d4a843] mb-1">
                      {activeWork.year}{activeWork.size ? ` — ${activeWork.size}` : ''}
                    </p>
                    <p className="font-display text-xl font-light text-[#e8e4dc]">
                      {activeWork.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel */}
            <div className="gallery-item px-6 md:px-12">
              <Carousel
                collection={collection}
                colIdx={colIdx}
                activeIdx={activeIndices[colIdx]}
                onActiveChange={(i) => setActiveForCol(colIdx, i)}
                onOpen={openLightbox}
              />
            </div>
          </div>
        )
      })}

      {lightboxIndex >= 0 && (
        <Lightbox
          images={allImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  )
}
