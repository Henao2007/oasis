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
      <p className="footer__shipping">
        <span className="footer__shipping-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path
              fill="currentColor"
              d="M3 6.5A2.5 2.5 0 0 1 5.5 4h7A2.5 2.5 0 0 1 15 6.5V7h1.76c.75 0 1.45.38 1.86 1.02l1.78 2.75c.4.63.6 1.36.6 2.1v2.38A1.75 1.75 0 0 1 19.25 17H19a3 3 0 0 1-6 0H9a3 3 0 0 1-6 0h-.25A1.75 1.75 0 0 1 1 15.25V8.25C1 7.28 1.78 6.5 2.75 6.5H3Zm2.5-1A1 1 0 0 0 4.5 6.5V7h9V6.5a1 1 0 0 0-1-1h-7Zm-.5 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM2.75 8A.25.25 0 0 0 2.5 8.25v7c0 .14.11.25.25.25H3a3 3 0 0 1 6 0h4a3 3 0 0 1 6 0h.25c.14 0 .25-.11.25-.25v-2.38c0-.45-.13-.89-.38-1.27l-1.78-2.75a1.25 1.25 0 0 0-1.05-.6H15V8H2.75Z"
            />
          </svg>
        </span>
        <span>
          Hacemos envios a todo Colombia. El costo del domicilio se confirma al
          finalizar tu pedido, segun tu ubicacion.
        </span>
      </p>
    </footer>
  )
}
