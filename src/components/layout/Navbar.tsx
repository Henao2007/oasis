import { useState } from 'react'
import { SearchBar } from '../product/SearchBar'

type NavbarProps = {
  categories: string[]
  cartCount: number
  onOpenCart: () => void
  query: string
  selectedCategory: string
  onSelectCategory: (category: string) => void
  onQueryChange: (value: string) => void
}

export function Navbar({
  categories,
  cartCount,
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

  return (
    <header className="navbar">
      <div className="navbar__bar">
        <a className="navbar__brand" href="#inicio" aria-label="Ir al inicio">
          <span className="eyebrow">Oasis</span>
        </a>

        <SearchBar compact query={query} onQueryChange={onQueryChange} />

        <div className="navbar__actions">
          <nav className="navbar__nav navbar__nav--desktop" aria-label="Principal">
            <a href="#inicio">Inicio</a>
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
              className="navbar__text-button"
              onClick={onOpenCart}
            >
              Carrito ({cartCount})
            </button>
          </nav>

          <button
            type="button"
            className="navbar__menu-button"
            aria-expanded={isMenuOpen}
            aria-label="Abrir menu"
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          >
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
              >
                Cerrar
              </button>
            </div>

            <a href="#inicio" onClick={() => setIsMenuOpen(false)}>
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
              Carrito ({cartCount})
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
