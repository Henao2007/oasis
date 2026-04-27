import { useState } from 'react'
import { CartSummary } from '../components/cart/CartSummary'
import { SectionMessage } from '../components/feedback/SectionMessage'
import { LeadForm } from '../components/forms/LeadForm'
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { CategoryFilter } from '../components/product/CategoryFilter'
import { FeaturedProducts } from '../components/product/FeaturedProducts'
import { ProductDetail } from '../components/product/ProductDetail'
import { ProductCard } from '../components/product/ProductCard'
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
    selectedProduct,
    setQuery,
    setSelectedCategory,
    setSelectedProduct,
    visibleProducts,
  } = useProductContext()
  const {
    addItem,
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
        <SectionMessage
          title="Tienda MVP"
          description="Base inicial del proyecto para comenzar el e-commerce SPA con React, TypeScript y Vite."
        />

        <FeaturedProducts
          products={featuredProducts}
          onSelectProduct={setSelectedProduct}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <section className="panel">
          <h2>Catalogo visible</h2>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        </section>

        <ProductDetail product={selectedProduct} onAddToCart={addItem} />

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
