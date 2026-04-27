import type { CartItem } from '../../types/cart'
import type { ClientLead } from '../../types/client'
import { buildWhatsAppMessage } from '../../utils/buildWhatsAppMessage'
import { config } from '../../constants/config'

type FloatingWhatsAppProps = {
  items?: CartItem[]
  client?: ClientLead
}

export function FloatingWhatsApp({
  items = [],
  client,
}: FloatingWhatsAppProps) {
  const message =
    items.length > 0
      ? encodeURIComponent(buildWhatsAppMessage(items, client))
      : ''

  return (
    <a
      className="floating-whatsapp"
      href={`https://wa.me/${config.whatsAppNumber}${message ? `?text=${message}` : ''}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp"
    >
      <span>WA</span>
    </a>
  )
}
