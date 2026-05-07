import { useEffect, useState, type MouseEvent } from 'react'
import { CartSummary } from '../components/cart/CartSummary'
import { LeadForm } from '../components/forms/LeadForm'
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { FeaturedProducts } from '../components/product/FeaturedProducts'
import { ProductDetail } from '../components/product/ProductDetail'
import { ProductCarousel } from '../components/product/ProductCarousel'
import { RelatedProducts } from '../components/product/RelatedProducts'
import { categories } from '../constants/categories'
import { useCartContext } from '../context/CartContext'
import { useProductContext } from '../context/ProductContext'
import { useLeadForm } from '../hooks/useLeadForm'

export function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileLayout, setIsMobileLayout] = useState(false)
  const [isCategoryOverview, setIsCategoryOverview] = useState(false)
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
  const {
    errors,
    isSubmitting,
    submitError,
    submitLead,
    submitMessage,
    updateField,
    values,
  } = useLeadForm()

  useEffect(() => {
    const syncLayout = () => {
      setIsMobileLayout(window.innerWidth < 900)
    }

    syncLayout()
    window.addEventListener('resize', syncLayout)

    return () => window.removeEventListener('resize', syncLayout)
  }, [])

  useEffect(() => {
    if (!selectedProduct) {
      return
    }

    const detailSection = document.getElementById('producto-detalle')

    detailSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [selectedProduct])

  useEffect(() => {
    if (!isCartOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalogo')

    catalogSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setIsCategoryOverview(false)
    setSelectedProduct(null)
    window.setTimeout(scrollToCatalog, 0)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setIsCategoryOverview(category === 'Todas')
    setSelectedProduct(null)
    window.setTimeout(scrollToCatalog, 0)
  }

  const handleGoHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setQuery('')
    setSelectedCategory('Todas')
    setIsCategoryOverview(false)
    setSelectedProduct(null)

    window.setTimeout(() => {
      const homeSection = document.getElementById('inicio')

      homeSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  const shouldShowCatalogFirst =
    selectedCategory !== 'Todas' || query.trim().length > 0
  const orderedCategorySections = categories
    .filter((category) => category !== 'Todas')
    .map((category) => ({
      category,
      products: featuredProducts.filter((product) => product.category === category),
    }))
    .filter(({ products }) => products.length > 0)

  const catalogTitle =
    selectedCategory === 'Todas'
      ? 'Explora mas productos'
      : `${selectedCategory} de lado a lado`

  return (
    <div className="page-shell">
      <Navbar
        categories={categories}
        cartCount={count}
        onGoHome={handleGoHome}
        onOpenCart={() => setIsCartOpen(true)}
        query={query}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
        onQueryChange={handleQueryChange}
      />

      <main className="page-content">
        {selectedProduct ? (
          <>
            <div className="product-flow">
              <ProductDetail
                client={values}
                product={selectedProduct}
                onAddToCart={addItem}
                onClose={() => setSelectedProduct(null)}
              />

              {isMobileLayout ? null : (
                <LeadForm
                  values={values}
                  errors={errors}
                  isSubmitting={isSubmitting}
                  submitError={submitError}
                  submitMessage={submitMessage}
                  onChange={updateField}
                  onSubmit={submitLead}
                />
              )}
            </div>

            <RelatedProducts
              products={relatedProducts}
              onSelectProduct={setSelectedProduct}
            />

            <FeaturedProducts
              products={featuredProducts}
              onSelectProduct={setSelectedProduct}
            />

            {isMobileLayout ? (
              <LeadForm
                values={values}
                errors={errors}
                isSubmitting={isSubmitting}
                submitError={submitError}
                submitMessage={submitMessage}
                onChange={updateField}
                onSubmit={submitLead}
              />
            ) : null}
          </>
        ) : null}

        {!selectedProduct && shouldShowCatalogFirst ? (
          <>
            <ProductCarousel
              id="catalogo"
              key={`${selectedCategory}-${query}`}
              products={visibleProducts}
              title={catalogTitle}
              onSelectProduct={setSelectedProduct}
            />

            <FeaturedProducts
              products={featuredProducts}
              onSelectProduct={setSelectedProduct}
            />
          </>
        ) : null}

        {!selectedProduct && !shouldShowCatalogFirst && isCategoryOverview ? (
          <>
            {orderedCategorySections.map(({ category, products }, index) => (
              <ProductCarousel
                id={index === 0 ? 'catalogo' : undefined}
                key={category}
                products={products}
                title={category}
                onSelectProduct={setSelectedProduct}
              />
            ))}

            <FeaturedProducts
              products={featuredProducts}
              onSelectProduct={setSelectedProduct}
            />
          </>
        ) : null}

        {!selectedProduct && !shouldShowCatalogFirst && !isCategoryOverview ? (
          <>
            <FeaturedProducts
              products={featuredProducts}
              onSelectProduct={setSelectedProduct}
            />

            {orderedCategorySections.map(({ category, products }, index) => (
              <ProductCarousel
                id={index === 0 ? 'catalogo' : undefined}
                key={category}
                products={products}
                title={category}
                onSelectProduct={setSelectedProduct}
              />
            ))}
          </>
        ) : null}
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
                aria-label="Cerrar carrito"
              >
                X
              </button>
            </div>

            <CartSummary
              client={values}
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
