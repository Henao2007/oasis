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
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M19.1 4.9A9.82 9.82 0 0 0 12.06 2C6.56 2 2.08 6.48 2.08 11.98c0 1.76.46 3.49 1.33 5.02L2 22l5.12-1.34a9.9 9.9 0 0 0 4.94 1.34h.01c5.5 0 9.98-4.48 9.98-9.98a9.86 9.86 0 0 0-2.95-7.12ZM12.07 20.3h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.04.8.81-2.96-.19-.31a8.25 8.25 0 0 1-1.27-4.38c0-4.56 3.71-8.27 8.28-8.27 2.21 0 4.28.86 5.84 2.42a8.2 8.2 0 0 1 2.41 5.85c0 4.56-3.71 8.27-8.27 8.27Zm4.54-6.2c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.21-.74-.66-1.24-1.46-1.39-1.71-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.77-1.84-.2-.47-.4-.41-.56-.42h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03 0 1.2.87 2.35.99 2.52.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.39.52.58.18 1.1.15 1.52.09.46-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.22-.16-.47-.29Z"
        />
      </svg>
    </a>
  )
}
