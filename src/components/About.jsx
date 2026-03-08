import { useEffect, useRef } from 'react'

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.05 },
    )

    const items = sectionRef.current?.querySelectorAll('.about-fade')
    items?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#080808] border-t border-[#222] pt-16 pb-20 md:pt-24 md:pb-28"
    >
      <div className="px-6 md:px-12">

        <h2 className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#e8e4dc]/55 mb-16 md:mb-20">
          About
        </h2>

        <div className="about-fade mb-10 md:mb-20 relative overflow-hidden">
          <img
            src="/art/ABOUT.png"
            alt="Lúna Selezman"
            className="w-full max-h-[50vh] md:max-h-[75vh] object-cover"
            style={{ transform: 'scale(1.01)' }}
          />
          <span
            className="absolute left-1/2 font-display font-light uppercase text-white select-none pointer-events-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
            style={{
              fontSize: 'clamp(1.4rem, 8vw, 7rem)',
              letterSpacing: '0.15em',
              top: '75%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '90%',
              textAlign: 'center',
            }}
          >
            LÚNA SELEZMAN
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          <div className="about-fade">
            <h3 className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#d4a843] mb-8">
              Biography
            </h3>
            <div className="space-y-5">
              <p className="font-sans font-light text-sm md:text-base leading-relaxed text-[#e8e4dc]/75">
                Lúna Selezman (born 2000, Langepas, Russia) is an academic painter and
                performer whose artistic journey began under the mentorship of Repin Academy
                masters. Her training in classical techniques laid a solid foundation for her
                distinctive synthesis of painting and performance.
              </p>
              <p className="font-sans font-light text-sm md:text-base leading-relaxed text-[#e8e4dc]/75">
                Lúna's work bridges traditional and contemporary practices, often incorporating
                movement and dance into her creative process. This interdisciplinary approach
                has led her to perform in theaters, galleries, and even a planetarium, where she
                explores the dynamic relationship between visual art and physical expression.
              </p>
            </div>
          </div>

          <div className="about-fade">
            <h3 className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#d4a843] mb-8">
              Artist Statement
            </h3>
            <div className="space-y-5">
              <p className="font-sans font-light text-sm md:text-base leading-relaxed text-[#e8e4dc]/75">
                My art is a reflection of the profound connection between the body and emotion,
                using painting and movement as complementary languages. I draw inspiration from
                personal memories, archetypes, and the energy of natural elements, aiming to
                transform individual experiences into universally resonant images.
              </p>
              <p className="font-sans font-light text-sm md:text-base leading-relaxed text-[#e8e4dc]/75">
                Each piece invites the viewer into a shared space of exploration and
                introspection, encouraging deeper self-awareness and a sense of unity with the
                surrounding world. Through my work, I strive to dissolve boundaries between
                disciplines, crafting a holistic sensory experience that engages sight, movement,
                and emotion.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
