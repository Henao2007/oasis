import type { Product } from '../../types/product'
import { formatCurrency } from '../../utils/formatCurrency'
import { Button } from '../ui/Button'
import { ProductGallery } from './ProductGallery'

type ProductDetailProps = {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductDetail({ product, onAddToCart }: ProductDetailProps) {
  return (
    <section className="product-detail panel">
      <ProductGallery product={product} />

      <div className="product-detail__content">
        <p className="eyebrow">{product.category}</p>
        <h2>{product.name}</h2>
        <p className="product-detail__price">{formatCurrency(product.price)}</p>
        <p>{product.description}</p>
        <p>Disponibles: {product.stock}</p>
        <Button onClick={() => onAddToCart(product)}>Agregar al carrito</Button>
      </div>
    </section>
  )
}
