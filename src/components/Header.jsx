export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 border-b border-[#222] bg-[#080808]/90 backdrop-blur-sm z-50">
      <div className="flex justify-between items-center px-6 md:px-12 py-5">
        <a
          href="#"
          className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#e8e4dc]/50 hover:text-[#c8f542] transition-colors duration-200"
        >
          Portfolio
        </a>
        <nav className="flex items-center gap-8">
          {['Gallery', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#e8e4dc]/50 hover:text-[#c8f542] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
