const LINKS = [
  {
    label: 'Email',
    display: 'lunaselezman@gmail.com',
    href: 'mailto:lunaselezman@gmail.com',
    external: false,
  },
  {
    label: 'Instagram',
    display: '@lunaelenaskarlet',
    href: 'https://instagram.com/lunaelenaskarlet',
    external: true,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="bg-[#080808] border-t border-[#222] pt-16 pb-10 md:pt-24 md:pb-14">
      <div className="px-6 md:px-12">

        {/* Section header */}
        <h2 className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#e8e4dc]/55 mb-16 md:mb-20">
          Contact
        </h2>

        {/* Links table */}
        <div className="border-t border-[#222] mb-12">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group flex items-center justify-between py-5 border-b border-[#222]"
            >
              <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#e8e4dc]/35">
                {link.label}
              </span>
              <span className="font-sans text-sm text-[#e8e4dc] group-hover:text-[#c8f542] transition-colors duration-200">
                {link.display}
              </span>
            </a>
          ))}
        </div>

        {/* Commission CTA */}
        <div>
          <a
            href="mailto:lunaselezman@gmail.com?subject=Commission%20Inquiry"
            className="group inline-flex items-center gap-5 border border-[#e8e4dc]/25 px-8 py-4 hover:border-[#c8f542] transition-colors duration-200"
          >
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#e8e4dc] group-hover:text-[#c8f542] transition-colors duration-200">
              Commission a Work
            </span>
            {/* Arrow */}
            <span
              className="text-[#e8e4dc]/50 group-hover:text-[#c8f542] transition-colors duration-200"
              aria-hidden
            >
              →
            </span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 md:px-12 mt-24 pt-6 border-t border-[#222] flex justify-between items-center">
        <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#e8e4dc]/35">
          LÚNA SELEZMAN
        </span>
        <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#e8e4dc]/35">
          © 2024
        </span>
      </div>
    </section>
  )
}
