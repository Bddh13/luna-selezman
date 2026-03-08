import { useEffect, useRef, useState } from 'react'

export default function Header() {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY.current && y > 60)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`header-bar fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="flex justify-between items-center px-6 md:px-12 py-5">
        <a
          href="#"
          className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#e8e4dc]/50 hover:text-[#d4a843] transition-colors duration-200"
        >
          Portfolio
        </a>
        <nav className="flex items-center gap-8">
          {['Gallery', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#e8e4dc]/50 hover:text-[#d4a843] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
