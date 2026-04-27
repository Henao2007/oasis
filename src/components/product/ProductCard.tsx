import type { Product } from '../../types/product'
import { formatCurrency } from '../../utils/formatCurrency'

type ProductCardProps = {
  onAddToCart?: (product: Product) => void
  product: Product
  onSelect: (product: Product) => void
}

export function ProductCard({ onAddToCart, product, onSelect }: ProductCardProps) {
  return (
    <article className="product-card">
      <img
        className="product-card__image"
        src={product.image}
        alt={product.name}
      />
      <div className="product-card__content">
        <p className="eyebrow">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{formatCurrency(product.price)}</p>
        <button
          type="button"
          className="button button--secondary"
          onClick={() => onSelect(product)}
        >
          Ver producto
        </button>
        {onAddToCart ? (
          <button
            type="button"
            className="button button--primary"
            onClick={() => onAddToCart(product)}
          >
            Agregar al carrito
          </button>
        ) : null}
      </div>
    </article>
  )
}
