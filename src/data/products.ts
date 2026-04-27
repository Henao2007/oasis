import type { Product } from '../types/product'

const placeholder = 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=900&q=80'
const placeholderTwo = 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80'
const placeholderThree = 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80'

export const mockProducts: Product[] = [
  {
    category: 'Cuidado',
    description: 'Producto base de referencia para iniciar el detalle visual del MVP.',
    id: 1,
    image: placeholder,
    images: [placeholder, placeholderTwo],
    keywords: ['piel', 'cuidado', 'natural'],
    name: 'Serum Botanico',
    price: 89000,
    stock: 8,
  },
  {
    category: 'Hogar',
    description: 'Articulo inicial para validar tarjetas, filtros y catalogo.',
    id: 2,
    image: placeholderTwo,
    images: [placeholderTwo, placeholderThree],
    keywords: ['hogar', 'aroma', 'ambiente'],
    name: 'Vela Calmante',
    price: 45000,
    stock: 12,
  },
  {
    category: 'Bienestar',
    description: 'Producto de muestra para checkout, relacionados y carrito.',
    id: 3,
    image: placeholderThree,
    images: [placeholderThree, placeholder],
    keywords: ['bienestar', 'relax', 'spa'],
    name: 'Kit Relax',
    price: 129000,
    stock: 5,
  },
]
