import { useEffect, useMemo, useState } from 'react'
import { useCartContext } from '../../context/CartContext'
import type { Product } from '../../types/product'
import { ProductCard } from './ProductCard'

type ProductCarouselProps = {
  emptyMessage?: string
  id?: string
  products: Product[]
  title: string
  onSelectProduct: (product: Product) => void
}

function getItemsPerPage(width: number) {
  if (width <= 640) {
    return 1
  }

  return 3
}

export function ProductCarousel({
  emptyMessage = 'No hay productos disponibles en esta seccion.',
  id,
  products,
  title,
  onSelectProduct,
}: ProductCarouselProps) {
  const { addItem } = useCartContext()
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null)
  const [itemsPerPage, setItemsPerPage] = useState(() =>
    typeof window === 'undefined' ? 3 : getItemsPerPage(window.innerWidth)
  )
  const [page, setPage] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage(window.innerWidth))
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage))
  const currentPage = Math.min(page, totalPages - 1)

  const visibleProducts = useMemo(() => {
    const start = currentPage * itemsPerPage

    return products.slice(start, start + itemsPerPage)
  }, [currentPage, itemsPerPage, products])

  if (products.length === 0) {
    return (
      <section className="panel" id={id}>
        <div className="carousel__header">
          <h2>{title}</h2>
        </div>
        <p>{emptyMessage}</p>
      </section>
    )
  }

  return (
    <section className="panel" id={id}>
      <div className="carousel__header">
        <div>
          <h2>{title}</h2>
          <p className="carousel__meta">
            Pagina {currentPage + 1} de {totalPages}
          </p>
        </div>
      </div>

      <div className="carousel__stage">
        <div className="carousel__controls" aria-label={`Controles de ${title}`}>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--left"
            onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 0))}
            disabled={currentPage === 0}
            aria-label={`Ver pagina anterior de ${title}`}
          >
            {'<'}
          </button>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--right"
            onClick={() =>
              setPage((currentPage) => Math.min(currentPage + 1, totalPages - 1))
            }
            disabled={currentPage === totalPages - 1}
            aria-label={`Ver pagina siguiente de ${title}`}
          >
            {'>'}
          </button>
        </div>

        <div
          className={[
            'product-grid',
            'product-grid--carousel',
            `product-grid--count-${visibleProducts.length}`,
          ].join(' ')}
        >
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addItem}
              onPreviewImage={setPreviewProduct}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </div>

      <div className="carousel__pagination" aria-label={`Paginas de ${title}`}>
        {Array.from({ length: totalPages }, (_, index) => {
          const isActive = index === currentPage

          return (
            <button
              key={`${title}-${index + 1}`}
              type="button"
              className={`carousel__page ${isActive ? 'carousel__page--active' : ''}`.trim()}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </button>
          )
        })}
      </div>

      {previewProduct ? (
        <div
          className="image-preview"
          role="presentation"
          onClick={() => setPreviewProduct(null)}
        >
          <div
            className="image-preview__dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Vista ampliada de ${previewProduct.name}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="image-preview__close"
              aria-label="Cerrar imagen"
              onClick={() => setPreviewProduct(null)}
            >
              X
            </button>
            <img
              className="image-preview__image"
              src={previewProduct.image}
              alt={previewProduct.name}
            />
          </div>
        </div>
      ) : null}
    </section>
  )
}
