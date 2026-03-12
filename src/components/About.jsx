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
            className="absolute left-1/2 font-display font-light uppercase text-white whitespace-nowrap select-none pointer-events-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
            style={{
              fontSize: 'clamp(1rem, 6.5vw, 7rem)',
              letterSpacing: '0.15em',
              top: '75%',
              transform: 'translate(-50%, -50%)',
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
                Lúna Selezman (born 2000, Langepas, Russia) is an academic painter working
                in the tradition of the Russian school. Trained under masters connected to
                the Repin Academy, she works primarily with oil painting, exploring
                mythological imagery, archetypes, and symbolic transformation.
              </p>
              <p className="font-sans font-light text-sm md:text-base leading-relaxed text-[#e8e4dc]/75">
                Her works combine classical technique with contemporary visual language,
                often depicting hybrid figures, animals, and mythic forms that reflect
                inner psychological states.
              </p>
            </div>
          </div>

          <div className="about-fade">
            <h3 className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#d4a843] mb-8">
              Artist Statement
            </h3>
            <div className="space-y-5">
              <p className="font-sans font-light text-sm md:text-base leading-relaxed text-[#e8e4dc]/75">
                My work explores transformation through mythological and archetypal imagery.
                Using the language of academic painting, I create symbolic figures and hybrid
                beings that reflect inner psychological and emotional states.
              </p>
              <p className="font-sans font-light text-sm md:text-base leading-relaxed text-[#e8e4dc]/75">
                I am interested in the moment where the human, animal, and mythic intersect,
                revealing deeper layers of identity and perception.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
