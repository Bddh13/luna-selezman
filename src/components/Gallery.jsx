import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import Lightbox from './Lightbox'

const COLLECTIONS = [
  {
    id: 'collection_01',
    title: 'Collection I',
    works: [
      { file: 'ardhanarishvara_2025_80x120.jpeg',   title: 'Ardhanarishvara',  year: 2025, size: '80 × 120 cm' },
      { file: 'dancing_angel_2024.jpeg',             title: 'Dancing Angel',    year: 2024 },
      { file: 'second_angel_2024_70x70.jpeg',        title: 'Second Angel',     year: 2024, size: '70 × 70 cm' },
      { file: 'angels_kiss_2024.jpeg',              title: "Angel's Kiss",     year: 2024 },
      { file: 'dancing_Harpy_2023_40x60.jpeg',      title: 'Dancing Harpy',    year: 2023, size: '40 × 60 cm' },
      { file: 'dancing_angel_2024_30x30.jpeg',       title: 'Dancing Angel',    year: 2024, size: '30 × 30 cm' },
      { file: 'demons_2024_80x120.jpeg',             title: 'Demons',           year: 2024, size: '80 × 120 cm' },
      { file: 'two_angels_2024_80x120.jpeg',         title: 'Two Angels',       year: 2024, size: '80 × 120 cm' },
    ],
  },
  {
    id: 'collection_03',
    title: 'Collection II',
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

export default function Gallery() {
  const itemRefs = useRef([])
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const openLightbox = useCallback((flatIdx) => setLightboxIndex(flatIdx), [])
  const closeLightbox = useCallback(() => setLightboxIndex(-1), [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target
            const delay = parseInt(el.dataset.delay ?? '0', 10)
            setTimeout(() => el.classList.add('visible'), delay)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.08 },
    )

    itemRefs.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  let globalIdx = 0

  return (
    <section id="gallery" className="bg-[#080808] border-t border-[#222] pt-16 pb-20 md:pt-24 md:pb-28">

      <div className="px-6 md:px-12 mb-10 flex items-baseline justify-between border-b border-[#222] pb-6">
        <h2 className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#e8e4dc]/55">
          Selected Works
        </h2>
        <span className="font-sans text-[10px] tracking-[0.2em] text-[#e8e4dc]/40">
          ({totalWorks})
        </span>
      </div>

      {COLLECTIONS.map((collection) => {
        const collectionItems = collection.works.map((work, i) => {
          const idx = globalIdx++
          const flatIdx = idx
          return (
            <div
              key={work.file}
              className="masonry-item gallery-item"
              data-delay={String(i * 75)}
              ref={(el) => { itemRefs.current[idx] = el }}
              onClick={() => openLightbox(flatIdx)}
            >
              <img
                src={`/art/${collection.id}/${work.file}`}
                alt={work.title}
                loading="lazy"
              />

              <div className="gallery-overlay">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#c8f542] mb-1">
                    {work.year}{work.size ? ` — ${work.size}` : ''}
                  </p>
                  <p className="font-display text-xl font-light text-[#e8e4dc]">
                    {work.title}
                  </p>
                </div>
              </div>
            </div>
          )
        })

        return (
          <div key={collection.id} className="mb-16 last:mb-0">
            <div className="px-6 md:px-12 mb-6">
              <h3 className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#e8e4dc]/45">
                {collection.title}
                <span className="ml-4 text-[#e8e4dc]/35">({collection.works.length})</span>
              </h3>
            </div>

            <div className="masonry px-6 md:px-12">
              {collectionItems}
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
