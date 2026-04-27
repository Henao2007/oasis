import { useState } from 'react'
import { CartSummary } from '../components/cart/CartSummary'
import { LeadForm } from '../components/forms/LeadForm'
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { FeaturedProducts } from '../components/product/FeaturedProducts'
import { ProductCarousel } from '../components/product/ProductCarousel'
import { RelatedProducts } from '../components/product/RelatedProducts'
import { categories } from '../constants/categories'
import { useCartContext } from '../context/CartContext'
import { useProductContext } from '../context/ProductContext'
import { useLeadForm } from '../hooks/useLeadForm'

export function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const {
    featuredProducts,
    query,
    relatedProducts,
    selectedCategory,
    setQuery,
    setSelectedCategory,
    setSelectedProduct,
    visibleProducts,
  } = useProductContext()
  const {
    count,
    decreaseQuantity,
    increaseQuantity,
    items,
    removeItem,
    total,
  } = useCartContext()
  const { errors, updateField, values } = useLeadForm()

  return (
    <div className="page-shell">
      <Navbar
        categories={categories}
        cartCount={count}
        onOpenCart={() => setIsCartOpen(true)}
        query={query}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onQueryChange={setQuery}
      />

      <main className="page-content">
        <FeaturedProducts
          products={featuredProducts}
          onSelectProduct={setSelectedProduct}
        />

        <ProductCarousel
          key={selectedCategory}
          products={visibleProducts}
          title={
            selectedCategory === 'Todas'
              ? 'Explora mas productos'
              : `${selectedCategory} de lado a lado`
          }
          onSelectProduct={setSelectedProduct}
        />

        <RelatedProducts
          products={relatedProducts}
          onSelectProduct={setSelectedProduct}
        />

        <LeadForm values={values} errors={errors} onChange={updateField} />
      </main>

      {isCartOpen ? (
        <div
          className="drawer-backdrop"
          role="presentation"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-panel__header">
              <h2 id="cart-modal-title">Carrito</h2>
              <button
                type="button"
                className="modal-card__close"
                onClick={() => setIsCartOpen(false)}
              >
                Cerrar
              </button>
            </div>

            <CartSummary
              embedded
              items={items}
              total={total}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeItem}
            />
          </div>
        </div>
      ) : null}

      <Footer />
      <FloatingWhatsApp items={items} client={values} />
    </div>
  )
}
