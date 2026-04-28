import { useState, type MouseEvent } from 'react'
import { SearchBar } from '../product/SearchBar'

type NavbarProps = {
  categories: string[]
  cartCount: number
  onGoHome: (event: MouseEvent<HTMLAnchorElement>) => void
  onOpenCart: () => void
  query: string
  selectedCategory: string
  onSelectCategory: (category: string) => void
  onQueryChange: (value: string) => void
}

export function Navbar({
  categories,
  cartCount,
  onGoHome,
  onOpenCart,
  query,
  selectedCategory,
  onSelectCategory,
  onQueryChange,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDesktopCategoriesOpen, setIsDesktopCategoriesOpen] = useState(false)
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false)

  const handleCategorySelect = (category: string) => {
    onSelectCategory(category)
    setIsDesktopCategoriesOpen(false)
    setIsMobileCategoriesOpen(false)
    setIsMenuOpen(false)
  }

  const cartBadge = cartCount > 0 ? (
    <span className="navbar__cart-badge" aria-hidden="true">
      {cartCount}
    </span>
  ) : null

  return (
    <header className="navbar">
      <div className="navbar__bar">
        <button
          type="button"
          className="navbar__brand"
          aria-label="Nombre de la marca"
        >
          <span className="eyebrow">The Doll House</span>
        </button>

        <SearchBar compact query={query} onQueryChange={onQueryChange} />

        <div className="navbar__actions">
          <nav className="navbar__nav navbar__nav--desktop" aria-label="Principal">
            <a href="#inicio" onClick={onGoHome}>
              Inicio
            </a>
            <div className="navbar__dropdown">
              <button
                type="button"
                className="navbar__text-button"
                aria-expanded={isDesktopCategoriesOpen}
                onClick={() =>
                  setIsDesktopCategoriesOpen((currentValue) => !currentValue)
                }
              >
                Categorias
              </button>

              {isDesktopCategoriesOpen ? (
                <div className="navbar__dropdown-menu">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={`navbar__dropdown-item ${
                        selectedCategory === category
                          ? 'navbar__dropdown-item--active'
                          : ''
                      }`.trim()}
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <button
              type="button"
              className="navbar__icon-button"
              onClick={onOpenCart}
              aria-label={`Abrir carrito con ${cartCount} productos`}
            >
              {cartBadge}
              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.16 14h9.96c.75 0 1.4-.41 1.74-1.03l3.58-6.49A1 1 0 0 0 21.56 5H6.21l-.47-2H2v2h2.08l2.4 10.12-.9 1.63A1.98 1.98 0 0 0 7.16 20H19v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63ZM6.68 7h13.2l-2.76 5H7.86L6.68 7Z"
                />
              </svg>
            </button>
          </nav>

          <button
            type="button"
            className="navbar__menu-button"
            aria-expanded={isMenuOpen}
            aria-label="Abrir menu"
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          >
            {cartCount > 0 ? (
              <span className="navbar__menu-badge" aria-hidden="true">
                {cartCount}
              </span>
            ) : null}
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <nav
        className={`navbar__mobile-menu ${isMenuOpen ? 'navbar__mobile-menu--open' : ''}`.trim()}
        aria-label="Menu movil"
      >
        <div
          className="navbar__mobile-overlay"
          role="presentation"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="navbar__mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu lateral"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="navbar__mobile-header">
              <span className="eyebrow">Menu</span>
              <button
                type="button"
                className="modal-card__close"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Cerrar menu"
              >
                X
              </button>
            </div>

            <a
              href="#inicio"
              onClick={(event) => {
                onGoHome(event)
                setIsMenuOpen(false)
              }}
            >
              Inicio
            </a>
            <div className="navbar__mobile-group">
              <button
                type="button"
                className="navbar__mobile-trigger"
                aria-expanded={isMobileCategoriesOpen}
                onClick={() =>
                  setIsMobileCategoriesOpen((currentValue) => !currentValue)
                }
              >
                Categorias
              </button>

              {isMobileCategoriesOpen ? (
                <div className="navbar__mobile-submenu">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={`navbar__mobile-subitem ${
                        selectedCategory === category
                          ? 'navbar__mobile-subitem--active'
                          : ''
                      }`.trim()}
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <button
              type="button"
              className="navbar__mobile-trigger"
              onClick={() => {
                setIsMenuOpen(false)
                onOpenCart()
              }}
            >
              <span className="navbar__mobile-cart">
                <span>Carrito</span>
                {cartBadge}
                <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.16 14h9.96c.75 0 1.4-.41 1.74-1.03l3.58-6.49A1 1 0 0 0 21.56 5H6.21l-.47-2H2v2h2.08l2.4 10.12-.9 1.63A1.98 1.98 0 0 0 7.16 20H19v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63ZM6.68 7h13.2l-2.76 5H7.86L6.68 7Z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
