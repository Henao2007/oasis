# Documentacion del MVP E-commerce SPA

## 1. Objetivo del proyecto

Construir una pagina web tipo e-commerce MVP con React + TypeScript, orientada a conversion rapida de ventas por WhatsApp, captura de leads y navegacion fluida sin recargas de pagina.

El producto debe priorizar:

- rapidez de uso
- claridad visual
- facilidad para comprar
- baja complejidad tecnica
- estructura lista para crecer luego
- experiencia responsive en todas las pantallas

## 2. Enfoque general

La aplicacion sera una SPA responsiva. Toda la experiencia principal debe ocurrir dentro de una sola vista dinamica, evitando redirecciones innecesarias. El objetivo no es crear un e-commerce completo con pasarela de pago en esta fase, sino validar ventas reales con un flujo simple y funcional.

La responsividad es un requisito obligatorio desde el inicio. La interfaz debe adaptarse correctamente a:

- celulares pequenos
- celulares grandes
- tablets
- laptops
- pantallas de escritorio

## 3. Propuesta de stack

### Frontend

- React
- TypeScript
- React Router para navegacion SPA si luego se necesita dividir vistas sin recargar
- CSS Modules, SCSS modular o styled system consistente por componentes

### Backend MVP

- API REST ligera
- Node.js con Express o framework equivalente
- Base de datos relacional simple

### Integraciones

- WhatsApp mediante enlace `wa.me`

## 4. Objetivos de negocio del MVP

- mostrar productos de forma atractiva
- permitir exploracion sin salir de la pagina
- facilitar la seleccion de productos
- generar un pedido listo para enviar por WhatsApp
- capturar datos de clientes potenciales
- sentar base para futuras automatizaciones

## 5. Requerimientos funcionales

### 5.1 Navbar

Debe incluir:

- logo de la marca
- buscador de productos
- acceso a inicio
- acceso a categorias
- acceso visual al carrito

La navbar debe permanecer clara y visible, especialmente en mobile.

Debe adaptarse correctamente a cualquier ancho de pantalla sin romper:

- logo
- buscador
- accesos principales
- carrito

### 5.2 Buscador con SEO basico

El buscador debe filtrar productos por:

- nombre
- categoria
- coincidencias parciales de palabras clave

Debe funcionar dentro de la misma SPA, sin redireccionar a otra pagina.

Objetivo SEO interno:

- mejorar encontrabilidad de productos
- reforzar keywords visibles en la interfaz
- ayudar al usuario a encontrar productos rapidamente

### 5.3 Productos destacados

Se mostraran 3 productos principales en la pantalla inicial.

Cada producto debe destacar:

- imagen
- nombre
- precio
- llamada a la accion clara

Al hacer clic en un producto:

- no debe abrir otra pagina
- debe cargar su detalle en la misma vista
- debe actualizar el estado del producto seleccionado

### 5.4 Vista de producto en la misma pagina

La informacion dinamica del producto debe mostrar:

- imagen principal grande
- miniaturas o selector de imagenes si el producto tiene varias fotos
- nombre
- categoria
- precio
- cantidad disponible
- boton para agregar al carrito

Esta vista debe sentirse inmediata y sin recarga.

Objetivo visual:

- permitir que el usuario contemple el producto con claridad
- dar protagonismo a la imagen
- aumentar confianza antes de agregar al carrito
- mejorar conversion con una presentacion mas inmersiva

Comportamiento sugerido:

- la imagen principal debe ocupar una zona destacada del layout
- al hacer clic en una miniatura, cambia la imagen principal
- en mobile, permitir deslizamiento o galeria simple
- permitir zoom ligero o ampliacion si no complica el MVP
- reorganizar el layout visual segun el ancho disponible sin perder jerarquia

### 5.5 Categorias

Al seleccionar una categoria:

- se filtran productos en la misma pantalla
- no se recarga la pagina
- puede convivir con el buscador

### 5.6 Productos relacionados

Cuando el usuario vea un producto, se deben mostrar productos relacionados debajo.

Criterios sugeridos:

- misma categoria
- coincidencia en etiquetas o keywords
- cercania tematica

### 5.7 Carrito de compras

El carrito debe permitir:

- agregar productos
- aumentar cantidades
- disminuir cantidades
- eliminar productos
- calcular subtotal y total en tiempo real

El estado del carrito debe mantenerse en memoria y, si se desea, persistirse luego con `localStorage`.

### 5.8 Checkout por WhatsApp

Al hacer clic en `Pagar`:

- no se usa pasarela de pago
- se construye un mensaje automatico
- se abre WhatsApp con el pedido listo para enviar
- no se debe obligar al cliente a completar datos antes de abrir WhatsApp

El mensaje debe incluir:

- lista de productos
- cantidad por producto
- total
- nombre del cliente solo si fue proporcionado
- numero de contacto solo si fue proporcionado

### 5.9 Boton flotante de WhatsApp

Debe estar visible en toda la aplicacion para:

- soporte rapido
- dudas antes de comprar
- contacto directo con el vendedor

### 5.10 Formulario de cliente

Campos:

- nombre
- correo
- numero

Objetivo:

- capturar leads
- guardar informacion solo si el cliente desea dejar sus datos

Regla funcional:

- este formulario es opcional
- no debe bloquear el checkout
- el cliente puede ir directo a WhatsApp sin completarlo
- si no deja sus datos, el vendedor los solicita manualmente en la conversacion

### 5.11 Footer

Debe incluir:

- logo
- copyright
- correo de contacto
- numero de contacto

Tambien debe reforzar identidad de marca mediante:

- tono visual consistente
- tipografia definida
- colores propios
- estilo reconocible

## 6. Base de datos MVP

Solo se utilizara una tabla:

### Tabla `clientes`

| Campo | Tipo | Regla |
|---|---|---|
| `id` | integer | autoincremental |
| `nombre` | string | requerido |
| `correo` | string | unico |
| `numero` | string | unico |
| `created_at` | timestamp | automatico |

Uso:

- almacenar clientes potenciales
- evitar duplicados por correo y numero
- servir como base para remarketing futuro

## 7. Arquitectura sugerida del frontend

```text
src/
  app/
    providers/
    routes/
    store/
  components/
    ui/
    layout/
    product/
    cart/
    forms/
  data/
    products.ts
  hooks/
    useCart.ts
    useProducts.ts
    useLeadForm.ts
    useProductGallery.ts
  types/
    product.ts
    cart.ts
    client.ts
  utils/
    formatCurrency.ts
    buildWhatsAppMessage.ts
    filterProducts.ts
  services/
    clientService.ts
    httpClient.ts
  context/
    CartContext.tsx
    ProductContext.tsx
  pages/
    HomePage.tsx
  constants/
    categories.ts
    config.ts
  styles/
    tokens.css
    globals.css
  App.tsx
  main.tsx
```

## 8. Arquitectura recomendada para escalabilidad

La arquitectura debe separar responsabilidades para evitar que toda la logica termine concentrada en `App.tsx`.

### Capas sugeridas

#### `app/`

Contiene configuracion global de la aplicacion:

- providers globales
- enrutamiento
- estado transversal
- configuracion de arranque

#### `pages/`

Representan vistas de alto nivel. En este MVP puede existir solo `HomePage`, pero se deja lista la estructura para crecer a:

- detalle de colecciones
- landing de promociones
- pagina de ayuda

#### `components/`

Se divide por dominio para facilitar mantenimiento:

- `ui/`: botones, inputs, badges, modales
- `layout/`: navbar, footer, wrappers
- `product/`: cards, galeria, detalle, relacionados
- `cart/`: panel, resumen, checkout
- `forms/`: formulario de cliente

#### `hooks/`

Encapsulan logica reutilizable:

- estado del carrito
- filtros
- galeria del producto
- envio de formularios

#### `services/`

Centralizan acceso a APIs y adaptadores externos:

- cliente HTTP
- servicios de leads
- futuros endpoints de catalogo

#### `utils/`

Funciones puras sin dependencia de React:

- filtros
- formateadores
- constructores de mensajes

#### `types/`

Contratos tipados compartidos entre componentes, hooks y servicios.

## 9. Buenas practicas de implementacion

### En React + TypeScript

- usar componentes pequenos y con una sola responsabilidad
- tipar props, estados y respuestas de servicios
- evitar logica pesada dentro del render
- mover calculos a hooks o utilidades puras
- mantener componentes presentacionales separados de logica de negocio
- evitar prop drilling excesivo usando context solo donde tenga sentido

### En organizacion de codigo

- una carpeta por dominio importante
- nombres consistentes y descriptivos
- exports explicitos
- reutilizar componentes base antes de duplicar UI
- documentar decisiones clave en la propia documentacion o comentarios breves

### En manejo de estado

- estado local para interacciones simples
- context para carrito y producto seleccionado si aplica globalmente
- no globalizar todo el estado sin necesidad

## 10. Componentes recomendados en React + TypeScript

### `Navbar`

Responsable de navegacion principal, branding y acceso rapido a busqueda, categorias y carrito.

### `SearchBar`

Maneja texto de busqueda y emite filtros al estado global o al contenedor principal.

### `FeaturedProducts`

Renderiza los 3 productos clave para generar atencion inicial.

### `ProductCard`

Tarjeta reutilizable para listas, destacados y relacionados.

### `ProductDetail`

Vista del producto seleccionado dentro de la misma SPA.

Debe incluir una galeria visual fuerte con:

- imagen principal grande
- miniaturas secundarias
- posibilidad de cambiar imagen activa
- layout adaptable a mobile

### `ProductGallery`

Subcomponente especializado para mostrar el producto de forma contemplativa.

Responsabilidades:

- renderizar imagen principal
- renderizar miniaturas
- cambiar la imagen visible
- preparar una futura ampliacion o zoom

### `CategoryFilter`

Permite activar una categoria sin cambiar de pagina.

### `RelatedProducts`

Sugiere mas productos relevantes desde el mismo flujo de compra.

### `Cart`

Muestra productos agregados, cantidades y total.

### `CheckoutButton`

Genera el mensaje de WhatsApp y activa la salida al chat del vendedor.

### `FloatingWhatsApp`

Boton fijo para contacto permanente.

### `LeadForm`

Captura los datos del cliente y los envia al backend.

### `Footer`

Cierra la pagina con informacion de marca y contacto.

## 11. Tipos sugeridos

```ts
export type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  image: string
  images?: string[]
  description?: string
  keywords?: string[]
}

export type CartItem = {
  product: Product
  quantity: number
}

export type ClientLead = {
  nombre: string
  correo: string
  numero: string
}
```

## 12. Logica del carrito

La logica del carrito debe centralizarse en un hook como `useCart`.

Funciones minimas:

- `addItem(product)`
- `removeItem(productId)`
- `increaseQuantity(productId)`
- `decreaseQuantity(productId)`
- `clearCart()`
- `getTotal()`

Comportamiento esperado:

- si el producto ya existe, aumentar cantidad
- impedir cantidades menores a 1 salvo eliminacion
- recalcular total en cada cambio
- validar stock antes de agregar o incrementar

## 13. Flujo de checkout por WhatsApp

### Paso a paso

1. El usuario agrega productos al carrito.
2. El usuario puede completar el formulario si desea dejar sus datos.
3. El sistema calcula el total.
4. Al pulsar `Pagar`, se genera un mensaje.
5. Se codifica el mensaje para URL.
6. Se abre `https://wa.me/<numero>?text=<mensaje>`.

### Ejemplo de mensaje

```text
Hola, quiero realizar este pedido:

- Producto A x2 = $40.000
- Producto B x1 = $25.000

Total: $65.000
Nombre: Juan Perez
Numero: 3001234567
```

Si el cliente no comparte sus datos, el mensaje puede salir asi:

```text
Hola, quiero realizar este pedido:

- Producto A x2 = $40.000
- Producto B x1 = $25.000

Total: $65.000
```

### Utilidad sugerida

```ts
export function buildWhatsAppMessage(items: CartItem[], client?: ClientLead) {
  const lines = items.map(
    ({ product, quantity }) =>
      `- ${product.name} x${quantity} = $${product.price * quantity}`
  )

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return [
    'Hola, quiero realizar este pedido:',
    '',
    ...lines,
    '',
    `Total: $${total}`,
    client?.nombre ? `Nombre: ${client.nombre}` : '',
    client?.numero ? `Numero: ${client.numero}` : '',
  ]
    .filter(Boolean)
    .join('\n')
}
```

## 14. Logica del buscador

El buscador debe trabajar con una funcion de filtrado local en memoria.

Criterios:

- coincidencia exacta
- coincidencia parcial
- categoria
- keywords secundarias si existen

Ejemplo:

```ts
export function filterProducts(products: Product[], query: string) {
  const normalized = query.trim().toLowerCase()

  if (!normalized) return products

  return products.filter((product) => {
    const text = [
      product.name,
      product.category,
      ...(product.keywords ?? []),
    ]
      .join(' ')
      .toLowerCase()

    return text.includes(normalized)
  })
}
```

## 15. Backend MVP para captura de clientes

### Responsabilidad

Exponer una API minima para registrar leads.

Esta API no hace parte del checkout obligatorio. Solo se usa cuando el cliente decide dejar sus datos voluntariamente.

### Endpoint sugerido

`POST /api/clientes`

### Payload

```json
{
  "nombre": "Juan Perez",
  "correo": "juan@email.com",
  "numero": "3001234567"
}
```

### Validaciones backend

- nombre requerido
- correo valido
- numero valido
- correo unico
- numero unico

### Respuestas sugeridas

- `201 Created` si se guarda correctamente
- `409 Conflict` si correo o numero ya existen
- `400 Bad Request` si faltan datos o son invalidos

## 16. Seguridad basica recomendada

### Frontend

- validar campos antes de enviar
- limitar longitud de entradas
- sanitizar texto mostrado si viene de fuentes externas
- bloquear envios vacios o mal formados
- validar tipos y formatos con esquemas claros
- restringir valores inesperados en filtros y formularios

### Backend

- validar y sanitizar payload
- usar consultas parametrizadas u ORM seguro
- proteger contra SQL Injection
- escapar contenido cuando aplique
- controlar CORS correctamente
- limitar tasa de peticiones si luego se expone publicamente
- no exponer mensajes internos del servidor
- centralizar manejo de errores
- registrar eventos de error sin filtrar datos sensibles

### Riesgos a cubrir

- XSS
- SQL Injection
- abuso de formularios
- datos duplicados
- datos maliciosos

## 17. Optimizacion y rendimiento

### Frontend

- cargar imagenes optimizadas
- usar `loading="lazy"` en imagenes no criticas
- mantener el bundle dividido por modulos si el proyecto crece
- evitar renders innecesarios por estados mal ubicados
- usar utilidades puras para filtros y totales
- minimizar dependencias externas no esenciales

### Imagenes de producto

- guardar varias resoluciones cuando sea posible
- usar una imagen principal de buena calidad sin exceder peso
- comprimir imagenes antes de publicarlas
- priorizar la primera imagen destacada del producto

### Experiencia percibida

- skeletons o placeholders simples
- feedback inmediato al agregar al carrito
- transiciones suaves en cambio de producto o imagen

## 18. SEO basico para el MVP

Aunque sea SPA, se pueden aplicar mejoras simples:

- titulos claros en `h1`, `h2` y nombres de producto
- textos descriptivos reales
- categorias con labels legibles
- `alt` utiles en imagenes de producto
- metadatos basicos en `index.html`
- URLs futuras limpias si luego se amplian rutas
- keywords visibles en buscador, productos y secciones

## 19. UX enfocada en conversion

Principios clave:

- mostrar productos importantes primero
- reducir friccion antes del contacto
- mantener el carrito siempre accesible
- hacer visible el boton de WhatsApp
- usar llamadas a la accion directas
- evitar pasos innecesarios
- garantizar legibilidad, toque comodo y orden visual en todas las pantallas
- no bloquear la compra solicitando datos obligatorios

Sugerencias concretas:

- boton `Agregar al carrito` muy visible
- boton `Pagar por WhatsApp` destacado
- mensajes de confianza simples
- indicador de stock disponible
- formulario corto
- feedback inmediato al agregar productos
- galeria visual grande en detalle de producto
- imagen principal limpia, enfocada y sin ruido visual
- botones con tamanos adecuados para interaccion tactil
- grids y espaciados que se adapten de mobile a desktop

## 20. Flujo recomendado del usuario

1. El usuario entra a la home.
2. Ve productos destacados.
3. Usa buscador o categorias.
4. Selecciona un producto sin salir de la pagina.
5. Revisa productos relacionados.
6. Agrega productos al carrito.
7. Opcionalmente deja sus datos si quiere.
8. Hace clic en `Pagar`.
9. Se abre WhatsApp con el pedido listo.

## 21. Alcance del MVP

### Incluido

- SPA responsiva
- productos destacados
- filtro por categorias
- buscador interno
- detalle dinamico de producto
- carrito funcional
- checkout por WhatsApp
- captura de leads
- API minima de clientes

### No incluido en esta fase

- pasarela de pagos
- autenticacion de usuarios
- panel administrativo complejo
- inventario en tiempo real con multiples roles
- sistema de envios avanzado

## 22. Propuesta de arquitectura backend MVP

```text
backend/
  src/
    config/
    controllers/
      clients.controller.ts
    routes/
      clients.routes.ts
    services/
      clients.service.ts
    repositories/
      clients.repository.ts
    middlewares/
      validateRequest.ts
      errorHandler.ts
    schemas/
      client.schema.ts
    db/
      connection.ts
    types/
    app.ts
    server.ts
```

Buenas practicas backend:

- separar rutas, controladores, servicios y acceso a datos
- validar entrada antes de tocar base de datos
- usar variables de entorno para configuracion sensible
- no mezclar reglas HTTP con reglas de negocio
- devolver respuestas consistentes

## 23. Proximas mejoras sin romper el MVP

- persistencia del carrito con `localStorage`
- analitica de eventos de conversion
- catalogo conectado a API real
- administracion basica de productos
- cupones o descuentos
- seguimiento de pedidos
- automatizacion CRM o remarketing

## 24. Recomendacion final de construccion

Para este proyecto conviene construir primero:

1. estructura base de carpetas
2. tipos y datos de producto
3. render de home con destacados y categorias
4. detalle de producto con galeria grande
5. carrito y calculo de totales
6. formulario de cliente
7. checkout a WhatsApp
8. API de clientes

Este orden reduce retrabajo y permite validar el flujo principal de negocio muy pronto.

## 25. Conclusion

Esta documentacion define una base clara para construir un e-commerce MVP moderno, simple y orientado a ventas por WhatsApp. La prioridad no es complejidad tecnica, sino velocidad de implementacion, facilidad de uso y conversion real.

La arquitectura propuesta permite empezar rapido con un proyecto en React + TypeScript, manteniendo buenas practicas de escalabilidad, seguridad y optimizacion desde el inicio, sin romper la simplicidad del MVP.
