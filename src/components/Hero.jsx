export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center bg-[#080808] overflow-hidden">

      {/* Main content */}
      <div className="text-center px-4 select-none">
        {/* Eyebrow label */}
        <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#d4a843] mb-10">
          Visual Artist
        </p>

        {/* Name — glitch target */}
        <h1
          className="glitch font-display font-light uppercase leading-none mb-10 text-[#e8e4dc]"
          data-text="LÚNA SELEZMAN"
          style={{ fontSize: 'clamp(2.8rem, 9.5vw, 9rem)', letterSpacing: '-0.01em' }}
        >
          LÚNA SELEZMAN
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <span className="block h-px w-16 bg-[#222]" />
        <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-[#e8e4dc]/45">
          LS
        </span>
          <span className="block h-px w-16 bg-[#222]" />
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-[#e8e4dc]/45">
          Scroll
        </span>
        <div className="relative w-px h-14 bg-[#1c1c1c] overflow-hidden">
          <span className="scroll-line absolute top-0 left-0 right-0 h-4 bg-[#d4a843]" />
        </div>
      </div>

      {/* Vertical accent label — desktop only */}
      <div
        className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2"
        style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
      >
        <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#e8e4dc]/40">
          Painting · Graphics · Illustration
        </span>
      </div>
    </section>
  )
}
