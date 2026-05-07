import type { CartItem } from '../../types/cart'
import type { ClientLead } from '../../types/client'
import { formatCurrency } from '../../utils/formatCurrency'
import { CheckoutButton } from './CheckoutButton'

type CartSummaryProps = {
  client?: ClientLead
  embedded?: boolean
  items: CartItem[]
  total: number
  onIncrease: (productId: number) => void
  onDecrease: (productId: number) => void
  onRemove: (productId: number) => void
}

export function CartSummary({
  client,
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
                <p>
                  {item.quantity} x {formatCurrency(item.product.price)}
                </p>
                <p className="cart-item__subtotal">
                  Subtotal: {formatCurrency(item.product.price * item.quantity)}
                </p>
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

      <div className="cart-summary__checkout">
        <CheckoutButton items={items} client={client} />
      </div>
    </section>
  )
}
