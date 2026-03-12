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
    title: 'Collection III',
    heroFile: 'shining_2024_80x120.jpeg',
    works: [
      { file: 'shining_2024_80x120.jpeg',                   title: 'Shining',                     year: 2024, size: '80 × 120 cm' },
      { file: 'dreams_2025_80x80.jpeg',                     title: 'Dreams',                      year: 2025, size: '80 × 80 cm' },
      { file: 'the_Id_ego_and_superego_2025_70x70.jpeg',    title: 'The Id, Ego and Superego',    year: 2025, size: '70 × 70 cm' },
      { file: 'the_touch_2025_70x70.jpeg',                  title: 'The Touch',                   year: 2025, size: '70 × 70 cm' },
    ],
  },
  {
    id: 'meditation',
    title: 'Meditation',
    heroFile: 'meditation01_2025_200x200.jpg',
    link: { href: 'https://www.bddh13.com/meditation', label: 'About the Vernissage 🔥' },
    works: [
      { file: 'meditation01_2025_200x200.jpg', title: 'Meditation I',   year: 2025, size: '200 × 200 cm' },
      { file: 'meditation02_2025_200x200.jpg', title: 'Meditation II',  year: 2025, size: '200 × 200 cm' },
      { file: 'meditation03_2025_200x200.jpg', title: 'Meditation III', year: 2025, size: '200 × 200 cm' },
    ],
  },
]

const totalWorks = COLLECTIONS.reduce((sum, c) => sum + c.works.length, 0)

const allImages = COLLECTIONS.flatMap((c) =>
  c.works.map((w) => ({
    src: `/art/${c.id}/${w.file}`,
    title: w.title,
    year: w.year,
    size: w.size,
  })),
)

function flatIndexOf(colIdx, workIdx) {
  let idx = 0
  for (let i = 0; i < colIdx; i++) idx += COLLECTIONS[i].works.length
  return idx + workIdx
}

function ThumbStrip({ items, onSelect }) {
  const stripRef = useRef(null)
  const touchStart = useRef(null)

  const scroll = (dir) => {
    const el = stripRef.current
    if (!el) return
    const amount = el.clientWidth * 0.6
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return
    const delta = e.changedTouches[0].clientX - touchStart.current
    if (Math.abs(delta) > 50) scroll(delta < 0 ? 1 : -1)
    touchStart.current = null
  }

  return (
    <div className="relative group/strip">
      <button
        className="thumb-arrow thumb-arrow--left hidden sm:flex"
        onClick={() => scroll(-1)}
        aria-label="Previous"
      >
        ←
      </button>

      <div
        ref={stripRef}
        className="thumb-strip"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item) => (
          <div
            key={item.file}
            className="thumb-strip-item"
            onClick={() => onSelect(item.flatIdx)}
          >
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
            />
            <div className="gallery-overlay">
              <div>
                <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#d4a843] mb-1">
                  {item.year}{item.size ? ` — ${item.size}` : ''}
                </p>
                <p className="font-display text-base font-light text-[#e8e4dc]">
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="thumb-arrow thumb-arrow--right hidden sm:flex"
        onClick={() => scroll(1)}
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

  const openLightbox = useCallback((flatIdx) => setLightboxIndex(flatIdx), [])
  const closeLightbox = useCallback(() => setLightboxIndex(-1), [])

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

      {COLLECTIONS.map((collection, colIdx) => {
        const heroIdx = collection.works.findIndex((w) => w.file === collection.heroFile)
        const hero = collection.works[heroIdx]
        const heroFlatIdx = flatIndexOf(colIdx, heroIdx)

        const thumbs = collection.works
          .map((w, i) => ({ ...w, src: `/art/${collection.id}/${w.file}`, flatIdx: flatIndexOf(colIdx, i) }))
          .filter((_, i) => i !== heroIdx)

        return (
          <div key={collection.id} className="mb-20 last:mb-0">
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
              className="gallery-item px-6 md:px-12 mb-1 cursor-pointer"
              onClick={() => openLightbox(heroFlatIdx)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={`/art/${collection.id}/${hero.file}`}
                  alt={hero.title}
                  className="w-full max-h-[70vh] object-cover transition-transform duration-500 hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#d4a843] mb-1">
                      {hero.year}{hero.size ? ` — ${hero.size}` : ''}
                    </p>
                    <p className="font-display text-xl font-light text-[#e8e4dc]">
                      {hero.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail strip */}
            {thumbs.length > 0 && (
              <div className="gallery-item px-6 md:px-12">
                <ThumbStrip items={thumbs} onSelect={openLightbox} />
              </div>
            )}
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
