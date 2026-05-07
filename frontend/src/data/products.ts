import type { Product } from '../types/product'

const serumImage =
  'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=900&q=80'
const velaImage =
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80'
const relaxImage =
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80'
const hairImage =
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
const oilsImage =
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80'
const soapImage =
  'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80'

export const mockProducts: Product[] = [
  {
    category: 'Cuidado',
    description: 'Serum ligero para hidratar y dar brillo natural a la piel.',
    id: 1,
    image: serumImage,
    images: [serumImage, soapImage],
    keywords: ['piel', 'cuidado', 'natural', 'hidratacion'],
    name: 'Serum Botanico',
    price: 89000,
    stock: 8,
  },
  {
    category: 'Hogar',
    description: 'Vela aromatica para crear una atmosfera suave y tranquila.',
    id: 2,
    image: velaImage,
    images: [velaImage, oilsImage],
    keywords: ['hogar', 'vela', 'ambiente', 'relax'],
    name: 'Vela Calmante',
    price: 45000,
    stock: 12,
  },
  {
    category: 'Bienestar',
    description: 'Kit pensado para pausas de descanso y rituales de autocuidado.',
    id: 3,
    image: relaxImage,
    images: [relaxImage, serumImage],
    keywords: ['bienestar', 'spa', 'relax', 'ritual'],
    name: 'Kit Relax',
    price: 129000,
    stock: 5,
  },
  {
    category: 'Pelo',
    description: 'Shampoo suave para limpiar sin resecar y mantener el pelo brillante.',
    id: 4,
    image: hairImage,
    images: [hairImage, oilsImage],
    keywords: ['pelo', 'shampoo', 'brillo', 'hidratacion'],
    name: 'Shampoo Nutritivo',
    price: 52000,
    stock: 10,
  },
  {
    category: 'Aromas',
    description: 'Mist aromatico para ropa de cama, cortinas y espacios de descanso.',
    id: 5,
    image: oilsImage,
    images: [oilsImage, velaImage],
    keywords: ['aroma', 'hogar', 'bruma', 'descanso'],
    name: 'Bruma de Lino',
    price: 39000,
    stock: 14,
  },
  {
    category: 'Cuidado',
    description: 'Jabon exfoliante con textura suave para una limpieza mas completa.',
    id: 6,
    image: soapImage,
    images: [soapImage, serumImage],
    keywords: ['jabon', 'exfoliante', 'piel', 'cuidado'],
    name: 'Jabon de Avena',
    price: 28000,
    stock: 18,
  },
  {
    category: 'Pelo',
    description: 'Mascarilla cremosa para reparar puntas y suavizar el cabello.',
    id: 7,
    image: hairImage,
    images: [hairImage, serumImage],
    keywords: ['pelo', 'mascarilla', 'suavidad', 'reparacion'],
    name: 'Mascarilla Capilar',
    price: 67000,
    stock: 9,
  },
  {
    category: 'Bienestar',
    description: 'Sales aromaticas para una experiencia de bano mas relajante.',
    id: 8,
    image: relaxImage,
    images: [relaxImage, soapImage],
    keywords: ['bano', 'bienestar', 'sales', 'calma'],
    name: 'Sales de Bano',
    price: 36000,
    stock: 11,
  },
  {
    category: 'Hogar',
    description: 'Difusor decorativo con aroma envolvente para sala o habitacion.',
    id: 9,
    image: velaImage,
    images: [velaImage, oilsImage],
    keywords: ['hogar', 'difusor', 'decoracion', 'aroma'],
    name: 'Difusor de Varillas',
    price: 58000,
    stock: 7,
  },
  {
    category: 'Aromas',
    description: 'Aceite esencial para espacios de descanso y momentos de pausa.',
    id: 10,
    image: oilsImage,
    images: [oilsImage, relaxImage],
    keywords: ['aceite', 'aroma', 'esencial', 'descanso'],
    name: 'Aceite de Lavanda',
    price: 49000,
    stock: 13,
  },
  {
    category: 'Cuidado',
    description: 'Crema corporal con tacto sedoso para rutina diaria.',
    id: 11,
    image: serumImage,
    images: [serumImage, hairImage],
    keywords: ['crema', 'cuerpo', 'hidratacion', 'piel'],
    name: 'Crema Corporal Seda',
    price: 61000,
    stock: 6,
  },
  {
    category: 'Bienestar',
    description: 'Rodillo facial frio para complementar rutinas de cuidado.',
    id: 12,
    image: relaxImage,
    images: [relaxImage, serumImage],
    keywords: ['facial', 'bienestar', 'rodillo', 'rutina'],
    name: 'Rodillo Facial',
    price: 55000,
    stock: 8,
  },
]
