import type { CartItem } from '../../types/cart'
import { formatCurrency } from '../../utils/formatCurrency'

type CartSummaryProps = {
  embedded?: boolean
  items: CartItem[]
  total: number
  onIncrease: (productId: number) => void
  onDecrease: (productId: number) => void
  onRemove: (productId: number) => void
}

export function CartSummary({
  embedded = false,
  items,
  total,
  onIncrease,
  onDecrease,
  onRemove,
}: CartSummaryProps) {
  return (
    <section className={embedded ? 'cart-summary' : 'panel cart-summary'} id="carrito">
      {embedded ? null : <h2>Carrito</h2>}

      {items.length === 0 ? (
        <p>Tu carrito esta vacio por ahora.</p>
      ) : (
        <div className="cart-list">
          {items.map((item) => (
            <article key={item.product.id} className="cart-item">
              <div>
                <h3>{item.product.name}</h3>
                <p>{formatCurrency(item.product.price)}</p>
              </div>

              <div className="cart-item__actions">
                <button type="button" onClick={() => onDecrease(item.product.id)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => onIncrease(item.product.id)}>
                  +
                </button>
                <button type="button" onClick={() => onRemove(item.product.id)}>
                  Quitar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="cart-total">Total: {formatCurrency(total)}</p>
    </section>
  )
}
