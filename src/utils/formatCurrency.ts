export function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', {
    currency: 'COP',
    style: 'currency',
    maximumFractionDigits: 0,
  }).format(value)
}
