import { useEffect, useState } from 'react'

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const pageHeight = document.documentElement.scrollHeight

      setIsVisible(scrollPosition >= pageHeight - 32)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <footer className={`footer ${isVisible ? 'footer--visible' : ''}`.trim()}>
      <div className="footer__content">
        <div>
          <p className="footer__brand">The Doll House</p>
          <p className="footer__copy">© 2026 The Doll House. Todos los derechos reservados.</p>
        </div>
        <div className="footer__contact">
          <p>contacto@thedollhouse.store</p>
          <p>+57 300 000 0000</p>
        </div>
      </div>
    </footer>
  )
}
