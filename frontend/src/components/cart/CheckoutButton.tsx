import { config } from '../../constants/config'
import type { CartItem } from '../../types/cart'
import type { ClientLead } from '../../types/client'
import { buildWhatsAppMessage } from '../../utils/buildWhatsAppMessage'
import { Button } from '../ui/Button'

type CheckoutButtonProps = {
  items: CartItem[]
  client?: ClientLead
}

export function CheckoutButton({ items, client }: CheckoutButtonProps) {
  const handleCheckout = () => {
    const message = encodeURIComponent(buildWhatsAppMessage(items, client))
    window.open(`https://wa.me/${config.whatsAppNumber}?text=${message}`, '_blank')
  }

  return (
    <Button onClick={handleCheckout} disabled={items.length === 0}>
      Pagar por WhatsApp
    </Button>
  )
}
