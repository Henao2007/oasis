import { config } from '../../constants/config'
import type { ClientLead } from '../../types/client'
import { buildWhatsAppMessage } from '../../utils/buildWhatsAppMessage'
import type { Product } from '../../types/product'
import { formatCurrency } from '../../utils/formatCurrency'
import { Button } from '../ui/Button'
import { ProductGallery } from './ProductGallery'

type ProductDetailProps = {
  client?: ClientLead
  product: Product
  onAddToCart: (product: Product) => void
  onClose: () => void
}

export function ProductDetail({
  client,
  product,
  onAddToCart,
  onClose,
}: ProductDetailProps) {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      buildWhatsAppMessage([{ product, quantity: 1 }], client)
    )

    window.open(`https://wa.me/${config.whatsAppNumber}?text=${message}`, '_blank')
  }

  return (
    <section className="product-detail panel" id="producto-detalle">
      <ProductGallery product={product} />

      <div className="product-detail__content">
        <div className="product-detail__header">
          <p className="eyebrow">{product.category}</p>
          <button
            type="button"
            className="modal-card__close"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
        <h2>{product.name}</h2>
        <p className="product-detail__price">{formatCurrency(product.price)}</p>
        <p>{product.description}</p>
        <p>Disponibles: {product.stock}</p>
        <div className="product-detail__actions">
          <Button onClick={() => onAddToCart(product)}>Agregar al carrito</Button>
          <Button variant="secondary" onClick={handleWhatsAppClick}>
            Comprar por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
