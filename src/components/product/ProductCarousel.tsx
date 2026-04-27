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
    </section>
  )
}
