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
- Vite
- React Router para navegacion SPA si luego se necesita dividir vistas sin recargar
- CSS Modules, SCSS modular o styled system consistente por componentes

### Backend MVP

- API REST ligera
- Node.js con Express o framework equivalente
- Base de datos relacional simple

### Integraciones

- WhatsApp mediante enlace `wa.me`

### Nota tecnica

Aunque el proyecto se centra en React + TypeScript, se utilizara Vite como herramienta de desarrollo y construccion por su velocidad, simplicidad y buena experiencia para un MVP moderno.

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

Reglas de diseno:

- el buscador debe ser pequeno y compacto
- no debe ocupar demasiado espacio horizontal
- `Inicio` y `Categorias` deben vivir dentro del navbar
- el navbar debe permanecer visible al hacer scroll
- el navbar debe tener fondo que resalte la navegacion

#### Comportamiento en escritorio

- logo a la izquierda
- buscador compacto en la zona central o cercana al logo
- accesos `Inicio` y `Categorias` visibles
- icono de carrito visible
- carrito accesible desde el propio navbar

#### Comportamiento en celular

La navbar debe comportarse como una app movil.

Debe mostrar primero:

- logo
- buscador compacto
- menu hamburguesa

Al abrir el menu hamburguesa deben aparecer:

- `Inicio`
- `Categorias`
- y otras opciones futuras del menu

Objetivo:

- ahorrar espacio
- mantener limpieza visual
- facilitar uso tactil
- sentirse mas como app movil que como web tradicional

Comportamiento recomendado del menu movil:

- abrir desde el lado izquierdo
- ocupar media pantalla de ancho
- cubrir toda la altura
- dejar el fondo exterior borroso o atenuado

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

La pantalla inicial debe abrir directamente con `Productos destacados`, sin un bloque introductorio adicional antes del catalogo.

Los destacados deben mostrarse en un carrusel paginado:

- en web se muestran 3 productos por vista
- en movil se muestra 1 producto por vista
- las flechas deben ir centradas verticalmente a cada lado del carrusel
- debajo deben existir paginas numeradas
- cuando la ultima vista tenga 1 o 2 productos, las tarjetas deben conservar el mismo tamano visual y quedar centradas de forma simetrica dentro del contenedor

Cada producto debe destacar:

- imagen
- nombre
- precio
- llamada a la accion clara
- acceso a `Ver producto`
- acceso a `Agregar al carrito`

Al hacer clic en un producto:

- no debe abrir otra pagina
- debe mantenerse dentro de la SPA
- debe actualizar el estado del producto seleccionado para futuros flujos contextuales si se requiere

### 5.4 Vista de producto en la misma pagina

Esta vista sigue contemplada en la arquitectura, pero no debe quedar renderizada permanentemente debajo del catalogo en la version publica actual del home.

La informacion dinamica del producto debe mostrar:

- imagen principal grande
- miniaturas o selector de imagenes si el producto tiene varias fotos
- nombre
- categoria
- precio
- cantidad disponible
- boton para agregar al carrito
- acceso visible a WhatsApp
- formulario opcional de captura en el momento correcto

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

#### Regla clave de captura de datos

El formulario de captura no debe aparecer antes de que el usuario entre a ver un producto.

Debe activarse solo cuando el usuario este viendo el detalle de un producto.

Objetivo:

- no interrumpir la exploracion inicial
- pedir datos en un momento con mas intencion de compra
- mantener bajo el nivel de friccion

### 5.5 Categorias

Las categorias deben existir como parte del catalogo, pero en la experiencia actual del home su acceso visible queda centralizado en el navbar.

Reglas actuales:

- no debe existir un bloque adicional de categorias dentro del cuerpo principal del home
- `Categorias` debe vivir en el navbar de escritorio y en el menu hamburguesa de movil
- al seleccionar una categoria:

- se filtran productos en la misma pantalla
- no se recarga la pagina
- puede convivir con el buscador

Nota de implementacion:

- durante el MVP se pueden mantener categorias quemadas en frontend
- a futuro se administraran desde el panel admin

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

Presentacion recomendada:

- no debe enviar al usuario al final de la pagina
- debe abrirse dentro de la misma vista
- en web debe verse como panel lateral
- en movil debe verse como panel lateral desde la izquierda
- el fondo debe quedar borroso para resaltar la informacion

### 5.8 Salida directa por WhatsApp

No existira un checkout tradicional con boton `Pagar`.

La salida a compra se hara directamente por WhatsApp.

Reglas:

- no se usa pasarela de pago
- no se usa boton de checkout separado
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

Regla obligatoria:

- WhatsApp debe estar siempre visible
- en movil tambien debe permanecer siempre visible
- debe permanecer fuera del navbar principal

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
- no debe bloquear la salida a WhatsApp
- el cliente puede ir directo a WhatsApp sin completarlo
- si no deja sus datos, el vendedor los solicita manualmente en la conversacion
- solo debe aparecer cuando el usuario entre a ver un producto

#### Ubicacion del formulario y WhatsApp

##### En web

Cuando el usuario entra a ver un producto:

- el formulario opcional debe mostrarse al lado del detalle del producto
- el acceso a WhatsApp debe estar visible en esa zona
- debajo deben aparecer los productos relacionados

Orden recomendado en web:

1. detalle del producto
2. formulario al lado
3. WhatsApp visible
4. productos relacionados debajo

##### En movil

Cuando el usuario entra a ver un producto:

- primero se muestra el detalle del producto
- al lado o muy cercano visualmente debe mantenerse WhatsApp visible
- despues bajan los productos relacionados
- y al final aparece el formulario opcional

Orden recomendado en movil:

1. detalle del producto
2. WhatsApp visible
3. productos relacionados
4. formulario opcional

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
- `product/`: cards, carruseles, galeria, detalle, relacionados
- `cart/`: panel y resumen
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

Debe seguir este criterio:

- buscador pequeno
- enlaces `Inicio` y `Categorias` dentro del navbar
- icono de WhatsApp
- version mobile con hamburguesa

### `SearchBar`

Maneja texto de busqueda y emite filtros al estado global o al contenedor principal.

### `FeaturedProducts`

Renderiza la vitrina principal del home y reutiliza un patron de carrusel para explorar mas productos sin obligar a bajar la pagina.

### `ProductCarousel`

Componente reutilizable para mostrar productos paginados dentro de la misma vista.

Responsabilidades:

- mostrar 3 tarjetas por vista en web
- mostrar 1 tarjeta por vista en movil
- mantener flechas laterales centradas sobre el carrusel
- mantener paginacion numerada
- centrar visualmente la ultima pagina cuando solo queden 1 o 2 tarjetas sin agrandarlas

### `ProductCard`

Tarjeta reutilizable para listas, destacados y relacionados.

### `ProductDetail`

Vista del producto seleccionado dentro de la misma SPA.

Debe incluir una galeria visual fuerte con:

- imagen principal grande
- miniaturas secundarias
- posibilidad de cambiar imagen activa
- layout adaptable a mobile
- acceso a WhatsApp siempre visible
- integracion con formulario opcional segun dispositivo

### `ProductGallery`

Subcomponente especializado para mostrar el producto de forma contemplativa.

Responsabilidades:

- renderizar imagen principal
- renderizar miniaturas
- cambiar la imagen visible
- preparar una futura ampliacion o zoom

### `CategoryFilter`

Su responsabilidad conceptual sigue vigente, pero en la UX actual del home el filtro visible de categorias queda resuelto desde el navbar y no como bloque separado dentro del contenido principal.

### `RelatedProducts`

Sugiere mas productos relevantes y actualmente reutiliza el mismo patron de carrusel paginado para mantener consistencia visual.

### `Cart`

Muestra productos agregados, cantidades y total.

### `CheckoutButton`

No se utilizara como boton principal en la experiencia final.

La logica de salida a WhatsApp debe vivir en el acceso principal de WhatsApp.

Este nombre puede refactorizarse luego a algo mas alineado con el flujo final, por ejemplo:

- `WhatsAppAction`
- `WhatsAppLauncher`
- `WhatsAppTrigger`

### `FloatingWhatsApp`

Boton fijo para contacto permanente.

### `LeadForm`

Captura los datos del cliente y los envia al backend.

No debe bloquear la salida principal por WhatsApp.

Su ubicacion definitiva se resolvera en el flujo contextual de producto cuando se reactive ese bloque de detalle en la experiencia publica.

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

## 13. Flujo de salida por WhatsApp

### Paso a paso

1. El usuario agrega productos al carrito.
2. El usuario puede completar el formulario si desea dejar sus datos.
3. El sistema calcula el total.
4. Al usar el acceso de WhatsApp, se genera un mensaje.
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

Esta API no hace parte de la salida obligatoria a WhatsApp. Solo se usa cuando el cliente decide dejar sus datos voluntariamente.

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
- abrir la home directamente en una vitrina de productos
- reducir friccion antes del contacto
- mantener el carrito siempre accesible
- hacer visible el boton de WhatsApp
- usar llamadas a la accion directas
- evitar pasos innecesarios
- garantizar legibilidad, toque comodo y orden visual en todas las pantallas
- no bloquear la compra solicitando datos obligatorios
- mostrar el formulario solo en contexto de producto para no estorbar antes de tiempo

Sugerencias concretas:

- boton `Agregar al carrito` muy visible
- icono o acceso de WhatsApp siempre visible y facil de usar
- carruseles laterales para explorar mas variedad sin seguir bajando
- mensajes de confianza simples
- indicador de stock disponible
- formulario corto
- feedback inmediato al agregar productos
- galeria visual grande en detalle de producto
- imagen principal limpia, enfocada y sin ruido visual
- botones con tamanos adecuados para interaccion tactil
- grids y espaciados que se adapten de mobile a desktop
- navbar mobile tipo app con menu hamburguesa
- buscador compacto para no competir con las acciones principales
- en web, formulario al lado del producto cuando el usuario entra al detalle
- en movil, formulario al final despues de relacionados
- WhatsApp siempre visible durante todo el flujo

## 20. Flujo recomendado del usuario

1. El usuario entra a la home.
2. Ve inmediatamente productos destacados.
3. Navega con flechas laterales o paginacion.
4. Usa buscador o categorias desde el navbar.
5. Agrega productos al carrito o entra a ver un producto.
6. Revisa productos relacionados.
7. Opcionalmente deja sus datos si luego se activa ese flujo.
8. Usa el acceso de WhatsApp.
9. Se abre WhatsApp con el pedido listo.

## 21. Alcance del MVP

### Incluido

- SPA responsiva
- productos destacados
- carruseles paginados de productos
- filtro por categorias
- buscador interno
- carrito funcional
- salida directa por WhatsApp
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
7. salida a WhatsApp
8. API de clientes

Este orden reduce retrabajo y permite validar el flujo principal de negocio muy pronto.

## 25. Conclusion

Esta documentacion define una base clara para construir un e-commerce MVP moderno, simple y orientado a ventas por WhatsApp. La prioridad no es complejidad tecnica, sino velocidad de implementacion, facilidad de uso y conversion real.

La arquitectura propuesta permite empezar rapido con un proyecto en React + TypeScript, manteniendo buenas practicas de escalabilidad, seguridad y optimizacion desde el inicio, sin romper la simplicidad del MVP.

## 26. Panel admin

### Objetivo del panel admin

El panel admin sera la herramienta interna para operar el negocio sin afectar el rendimiento de la tienda publica.

Tambien sera la fuente oficial para administrar el catalogo cuando dejemos de depender de datos quemados en frontend.

Debe permitir:

- gestionar productos
- revisar ventas
- consultar metricas por periodos
- exportar reportes
- tomar decisiones con apoyo de analitica

### Stack recomendado para el admin

- React + TypeScript
- Vite
- React Router
- backend en Node.js + TypeScript + Express
- enfoque mobile-first
- PWA para experiencia tipo aplicacion movil

### Decision oficial para el panel admin

El panel admin se desarrollara como:

- aplicacion web responsive
- optimizada primero para celular
- instalable como PWA
- compatible tambien con escritorio

Esta es la opcion mas sencilla y mas conveniente para el proyecto en esta etapa.

### Motivo de esta decision

Se elige esta arquitectura porque permite:

- una sola base de codigo
- menor costo de desarrollo
- menor complejidad de mantenimiento
- experiencia cercana a una app de celular
- uso rapido desde navegador o acceso instalado

No se recomienda en esta fase construir una app nativa separada.

### Modulos principales del admin

#### 1. Dashboard

Debe mostrar un resumen claro y rapido de:

- ventas del dia
- ventas de la semana
- ventas del mes
- ventas del ano
- cantidad de pedidos
- productos mas vendidos
- categorias con mejor rendimiento
- ticket promedio

Este dashboard debe priorizar una lectura rapida en pantalla movil:

- cards resumidas
- bloques verticales
- filtros simples
- graficos ligeros

#### 2. Gestion de productos

El admin debe poder:

- crear productos
- cambiar fotos
- cambiar nombre
- cambiar precio
- cambiar stock
- cambiar categoria
- crear categorias
- renombrar categorias
- activar, ocultar o eliminar categorias segun las reglas del negocio
- editar descripcion
- activar o desactivar productos
- eliminar productos

En movil debe resolverse con:

- formularios simples
- carga de imagen intuitiva
- acciones claras y grandes para tocar

#### 3. Gestion de ventas

Debe permitir consultar ventas por:

- dia
- semana
- mes
- ano
- rango personalizado

Cada venta deberia poder mostrar:

- fecha
- productos vendidos
- cantidades
- total
- cliente si existe
- canal de cierre

#### 4. Reportes

El sistema debe permitir:

- imprimir PDF del dia que se quiera consultar
- exportar ventas por rango de fechas
- imprimir resumen de productos vendidos
- imprimir resumen total facturado

### Recomendacion para analitica sin volver lento el admin

No conviene calcular toda la analitica pesada directamente en cada carga del panel. Mi recomendacion es separar la operacion del admin de la analitica.

#### Opcion recomendada

Usar una arquitectura con:

- tablas operativas para productos, pedidos y clientes
- tablas resumen o vistas agregadas para metricas
- endpoints especificos para dashboard

#### Estrategia recomendada

1. Guardar cada venta de forma normal en la base principal.
2. Crear procesos que generen resumenes por dia, semana, mes y ano.
3. Hacer que el dashboard consulte esos resumenes en lugar de recalcular todo.

Esto evita:

- consultas pesadas repetidas
- lentitud del panel
- sobrecarga cuando aumenten las ventas

### Estructura sugerida para analitica

#### Tablas operativas

- `productos`
- `clientes`
- `pedidos`
- `pedido_items`

#### Tablas resumen

- `ventas_resumen_diario`
- `ventas_resumen_semanal`
- `ventas_resumen_mensual`
- `ventas_resumen_anual`

#### Beneficios

- dashboard mas rapido
- filtros mas ligeros
- reportes PDF mas eficientes
- mejor escalabilidad

### Analitica de datos documentada

La analitica del sistema debe diseñarse para apoyar decisiones comerciales sin afectar el rendimiento del panel admin ni de la tienda publica.

El objetivo de esta capa es responder preguntas como:

- cuanto se vendio hoy
- cuanto se vendio esta semana
- cuanto se vendio este mes
- cuanto se vendio este ano
- que productos venden mas
- que categorias tienen mejor rotacion
- cual es el ticket promedio
- cuantos pedidos se cerraron en cada periodo

### Enfoque recomendado para analitica

No se debe usar el dashboard como lugar donde se calculan todas las metricas desde cero en cada consulta.

Se recomienda trabajar con dos niveles de datos:

#### 1. Datos operativos

Son los datos reales del negocio y registran la operacion diaria.

Ejemplos:

- productos
- clientes
- pedidos
- detalle de pedidos

#### 2. Datos agregados

Son tablas resumen o vistas preparadas para responder rapido al dashboard.

Ejemplos:

- ventas por dia
- ventas por semana
- ventas por mes
- ventas por ano
- productos mas vendidos por periodo
- categorias mas vendidas por periodo

### Flujo recomendado de analitica

1. El sistema guarda pedidos y productos vendidos en tablas operativas.
2. Un proceso programado o tarea de backend calcula resumenes.
3. El dashboard consulta esos resumenes ya preparados.
4. Los reportes PDF usan esos datos agregados o una consulta optimizada por rango.

### Motor de base de datos recomendado

Para este proyecto recomiendo preferiblemente:

- PostgreSQL

Alternativa valida:

- MySQL

Motivos:

- buen rendimiento en consultas relacionales
- soporte para indices y agregaciones
- escalabilidad razonable para este tipo de sistema
- facilidad para reportes y analitica basica

### Tablas recomendadas para el sistema

#### Tabla `productos`

Sirve para administrar el catalogo desde el panel.

Campos sugeridos:

| Campo | Tipo | Regla |
|---|---|---|
| `id` | integer | autoincremental |
| `nombre` | string | requerido |
| `slug` | string | unico |
| `descripcion` | text | opcional |
| `precio` | decimal | requerido |
| `stock` | integer | requerido |
| `categoria_id` | integer | requerido |
| `activo` | boolean | por defecto true |
| `created_at` | timestamp | automatico |
| `updated_at` | timestamp | automatico |

#### Tabla `categorias`

Sirve para organizar productos y facilitar filtros.

Campos sugeridos:

| Campo | Tipo | Regla |
|---|---|---|
| `id` | integer | autoincremental |
| `nombre` | string | unico |
| `slug` | string | unico |
| `created_at` | timestamp | automatico |

#### Tabla `producto_imagenes`

Sirve para que el admin pueda cambiar varias fotos por producto.

Campos sugeridos:

| Campo | Tipo | Regla |
|---|---|---|
| `id` | integer | autoincremental |
| `producto_id` | integer | relacion con productos |
| `url` | string | requerida |
| `orden` | integer | para ordenar galeria |
| `created_at` | timestamp | automatico |

#### Tabla `clientes`

Esta tabla ya hace parte del MVP para captura de leads.

Campos sugeridos:

| Campo | Tipo | Regla |
|---|---|---|
| `id` | integer | autoincremental |
| `nombre` | string | opcional para lead |
| `correo` | string | unico cuando exista |
| `numero` | string | unico cuando exista |
| `created_at` | timestamp | automatico |

#### Tabla `pedidos`

Sirve para registrar una venta cerrada, incluso si vino por WhatsApp.

Campos sugeridos:

| Campo | Tipo | Regla |
|---|---|---|
| `id` | integer | autoincremental |
| `cliente_id` | integer | opcional |
| `total` | decimal | requerido |
| `estado` | string | requerido |
| `canal` | string | ejemplo: whatsapp |
| `fecha_venta` | timestamp | requerido |
| `created_at` | timestamp | automatico |
| `updated_at` | timestamp | automatico |

#### Tabla `pedido_items`

Guarda el detalle de cada producto vendido dentro de un pedido.

Campos sugeridos:

| Campo | Tipo | Regla |
|---|---|---|
| `id` | integer | autoincremental |
| `pedido_id` | integer | relacion con pedidos |
| `producto_id` | integer | relacion con productos |
| `nombre_producto` | string | snapshot del nombre al vender |
| `precio_unitario` | decimal | requerido |
| `cantidad` | integer | requerido |
| `subtotal` | decimal | requerido |

### Tablas recomendadas para analitica

#### Tabla `ventas_resumen_diario`

Campos sugeridos:

| Campo | Tipo | Regla |
|---|---|---|
| `id` | integer | autoincremental |
| `fecha` | date | unica por dia |
| `total_ventas` | decimal | requerido |
| `cantidad_pedidos` | integer | requerido |
| `ticket_promedio` | decimal | requerido |
| `created_at` | timestamp | automatico |
| `updated_at` | timestamp | automatico |

#### Tabla `ventas_resumen_semanal`

Campos sugeridos:

| Campo | Tipo | Regla |
|---|---|---|
| `id` | integer | autoincremental |
| `anio` | integer | requerido |
| `semana` | integer | requerido |
| `total_ventas` | decimal | requerido |
| `cantidad_pedidos` | integer | requerido |
| `ticket_promedio` | decimal | requerido |
| `created_at` | timestamp | automatico |
| `updated_at` | timestamp | automatico |

#### Tabla `ventas_resumen_mensual`

Campos sugeridos:

| Campo | Tipo | Regla |
|---|---|---|
| `id` | integer | autoincremental |
| `anio` | integer | requerido |
| `mes` | integer | requerido |
| `total_ventas` | decimal | requerido |
| `cantidad_pedidos` | integer | requerido |
| `ticket_promedio` | decimal | requerido |
| `created_at` | timestamp | automatico |
| `updated_at` | timestamp | automatico |

#### Tabla `ventas_resumen_anual`

Campos sugeridos:

| Campo | Tipo | Regla |
|---|---|---|
| `id` | integer | autoincremental |
| `anio` | integer | unico |
| `total_ventas` | decimal | requerido |
| `cantidad_pedidos` | integer | requerido |
| `ticket_promedio` | decimal | requerido |
| `created_at` | timestamp | automatico |
| `updated_at` | timestamp | automatico |

#### Tabla `productos_top_periodo`

Sirve para responder rapido que productos se venden mas.

Campos sugeridos:

| Campo | Tipo | Regla |
|---|---|---|
| `id` | integer | autoincremental |
| `tipo_periodo` | string | diario, semanal, mensual, anual |
| `referencia_periodo` | string | ejemplo: 2026-04 o 2026-W17 |
| `producto_id` | integer | relacion con productos |
| `cantidad_vendida` | integer | requerido |
| `total_vendido` | decimal | requerido |
| `created_at` | timestamp | automatico |

#### Tabla `categorias_top_periodo`

Sirve para responder rapido que categorias venden mejor.

Campos sugeridos:

| Campo | Tipo | Regla |
|---|---|---|
| `id` | integer | autoincremental |
| `tipo_periodo` | string | diario, semanal, mensual, anual |
| `referencia_periodo` | string | identificador del periodo |
| `categoria_id` | integer | relacion con categorias |
| `cantidad_vendida` | integer | requerido |
| `total_vendido` | decimal | requerido |
| `created_at` | timestamp | automatico |

### Relaciones principales sugeridas

- `productos.categoria_id -> categorias.id`
- `producto_imagenes.producto_id -> productos.id`
- `pedidos.cliente_id -> clientes.id`
- `pedido_items.pedido_id -> pedidos.id`
- `pedido_items.producto_id -> productos.id`
- `productos_top_periodo.producto_id -> productos.id`
- `categorias_top_periodo.categoria_id -> categorias.id`

### Indices recomendados

Para mejorar rendimiento, se recomienda crear indices sobre:

- `productos.slug`
- `productos.categoria_id`
- `productos.activo`
- `clientes.correo`
- `clientes.numero`
- `pedidos.fecha_venta`
- `pedidos.estado`
- `pedidos.canal`
- `pedido_items.pedido_id`
- `pedido_items.producto_id`
- `ventas_resumen_diario.fecha`
- `ventas_resumen_semanal.anio, semana`
- `ventas_resumen_mensual.anio, mes`
- `ventas_resumen_anual.anio`

### Como alimentar la analitica

Opciones recomendadas:

#### Opcion 1. Cron job

Un proceso programado recalcula o actualiza resumenes cada cierto tiempo.

Ventajas:

- simple de mantener
- bueno para MVP y crecimiento inicial

#### Opcion 2. Eventos al cerrar pedido

Cada vez que una venta se confirma, se actualizan algunas tablas resumen.

Ventajas:

- datos mas frescos
- menos reproceso nocturno

#### Recomendacion practica

Para este proyecto:

- comenzar con cron job o tarea programada
- luego, si el volumen crece, pasar a eventos o colas

### Recomendacion para PDF y reportes

Los PDF no deben generarse desde consultas gigantescas sin optimizacion.

Se recomienda:

- filtrar primero por periodo
- consultar tabla resumen para encabezados
- consultar detalle solo del rango solicitado
- generar el PDF desde backend

### Recomendacion final para analitica

La mejor estrategia para incluir analitica de datos sin volver lento el admin es:

- usar tablas operativas para la venta real
- usar tablas agregadas para dashboard
- separar reportes de operacion diaria
- indexar bien campos de fecha, estado y relaciones
- generar PDF y reportes desde backend

Con esta base, el panel admin podra crecer de forma ordenada, responder rapido y soportar mas volumen sin rehacer la arquitectura.

### Recomendacion tecnica concreta

Para este proyecto te recomiendo:

- backend operativo con PostgreSQL o MySQL
- consultas optimizadas con indices
- tabla de pedidos y detalle de pedidos
- resumenes precalculados por cron job o tarea programada
- cache ligera para metricas frecuentes si luego hace falta

### Generacion de PDF

Para PDF, conviene generar reportes desde backend y no desde el navegador cuando el sistema crezca.

Motivo:

- mas control del formato
- mejor rendimiento
- mayor estabilidad
- reportes consistentes

### Flujo recomendado del admin

1. El admin entra al dashboard.
2. Ve resumen rapido de ventas.
3. Filtra por dia, semana, mes o ano.
4. Consulta detalle de ventas.
5. Exporta o imprime PDF si lo necesita.
6. Gestiona productos desde el modulo correspondiente.

### Cuenta admin inicial

El panel admin debe tener una cuenta creada desde el inicio para permitir acceso controlado.

#### Tabla recomendada `admins`

| Campo | Tipo | Regla |
|---|---|---|
| `id` | integer | autoincremental |
| `nombre` | string | requerido |
| `correo` | string | unico |
| `password_hash` | string | requerido |
| `activo` | boolean | por defecto true |
| `created_at` | timestamp | automatico |
| `updated_at` | timestamp | automatico |

#### Reglas importantes

- nunca guardar contrasenas en texto plano
- siempre guardar `password_hash`
- proteger rutas del admin con autenticacion
- permitir desactivar cuentas admin sin borrarlas

### Flujo de login recomendado

1. El admin entra al panel.
2. Ingresa correo y contrasena.
3. El backend valida credenciales.
4. Si son correctas, entrega sesion o token seguro.
5. El frontend habilita rutas protegidas.

### Recomendacion de autenticacion

Para este proyecto conviene:

- login por correo y contrasena
- contrasena hasheada con algoritmo seguro
- token o sesion segura
- expiracion controlada
- cierre de sesion manual

### PWA para el panel admin

El panel admin debe prepararse como PWA para que pueda sentirse como app de celular.

Beneficios:

- acceso desde icono en pantalla de inicio
- experiencia mas cercana a una app
- mejor uso desde celular
- misma aplicacion disponible en escritorio

Elementos que debe tener:

- `manifest`
- iconos
- nombre corto de la app
- colores de marca
- modo standalone
- service worker cuando se implemente la version PWA final

### Recomendacion de UX para admin movil

El panel admin debe diseñarse pensando primero en celular.

Esto implica:

- navegacion inferior o menu compacto
- botones grandes
- cards legibles
- formularios de una columna
- tablas convertidas a bloques o vistas resumidas en movil
- acciones clave visibles sin muchos pasos

### Recomendacion final

Si quieres un admin rapido, escalable y limpio:

- no mezcles analitica pesada con cada vista
- separa datos operativos de datos agregados
- calcula resumenes por periodos
- usa el dashboard como lector de metricas ya preparadas
- construyelo mobile-first como PWA
- usa una cuenta admin inicial protegida

Esa es la mejor base para que el admin siga respondiendo bien incluso cuando el negocio crezca.

## 27. MySQL: orden y sintaxis de tablas

### Motor definido

La base de datos del proyecto se trabajara con:

- MySQL

### Orden recomendado para crear tablas

Conviene crear las tablas en este orden para respetar relaciones y llaves foraneas:

1. `categorias`
2. `productos`
3. `producto_imagenes`
4. `clientes`
5. `pedidos`
6. `pedido_items`
7. `ventas_resumen_diario`
8. `ventas_resumen_semanal`
9. `ventas_resumen_mensual`
10. `ventas_resumen_anual`
11. `productos_top_periodo`
12. `categorias_top_periodo`

### Sintaxis base recomendada en MySQL

#### Tabla `categorias`

```sql
CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL UNIQUE,
  slug VARCHAR(150) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
```

#### Tabla `productos`

```sql
CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(160) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  descripcion TEXT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  categoria_id INT NOT NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_productos_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
) ENGINE=InnoDB;
```

#### Tabla `producto_imagenes`

```sql
CREATE TABLE producto_imagenes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  producto_id INT NOT NULL,
  url VARCHAR(500) NOT NULL,
  orden INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_producto_imagenes_producto
    FOREIGN KEY (producto_id) REFERENCES productos(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;
```

#### Tabla `clientes`

```sql
CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NULL,
  correo VARCHAR(180) NULL UNIQUE,
  numero VARCHAR(30) NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
```

#### Tabla `pedidos`

```sql
CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NULL,
  total DECIMAL(10, 2) NOT NULL,
  estado VARCHAR(50) NOT NULL,
  canal VARCHAR(50) NOT NULL DEFAULT 'whatsapp',
  fecha_venta DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_pedidos_cliente
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    ON DELETE SET NULL
) ENGINE=InnoDB;
```

#### Tabla `pedido_items`

```sql
CREATE TABLE pedido_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  producto_id INT NOT NULL,
  nombre_producto VARCHAR(160) NOT NULL,
  precio_unitario DECIMAL(10, 2) NOT NULL,
  cantidad INT NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  CONSTRAINT fk_pedido_items_pedido
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_pedido_items_producto
    FOREIGN KEY (producto_id) REFERENCES productos(id)
) ENGINE=InnoDB;
```

#### Tabla `ventas_resumen_diario`

```sql
CREATE TABLE ventas_resumen_diario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATE NOT NULL UNIQUE,
  total_ventas DECIMAL(12, 2) NOT NULL DEFAULT 0,
  cantidad_pedidos INT NOT NULL DEFAULT 0,
  ticket_promedio DECIMAL(12, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
```

#### Tabla `ventas_resumen_semanal`

```sql
CREATE TABLE ventas_resumen_semanal (
  id INT AUTO_INCREMENT PRIMARY KEY,
  anio INT NOT NULL,
  semana INT NOT NULL,
  total_ventas DECIMAL(12, 2) NOT NULL DEFAULT 0,
  cantidad_pedidos INT NOT NULL DEFAULT 0,
  ticket_promedio DECIMAL(12, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_ventas_resumen_semanal (anio, semana)
) ENGINE=InnoDB;
```

#### Tabla `ventas_resumen_mensual`

```sql
CREATE TABLE ventas_resumen_mensual (
  id INT AUTO_INCREMENT PRIMARY KEY,
  anio INT NOT NULL,
  mes INT NOT NULL,
  total_ventas DECIMAL(12, 2) NOT NULL DEFAULT 0,
  cantidad_pedidos INT NOT NULL DEFAULT 0,
  ticket_promedio DECIMAL(12, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_ventas_resumen_mensual (anio, mes)
) ENGINE=InnoDB;
```

#### Tabla `ventas_resumen_anual`

```sql
CREATE TABLE ventas_resumen_anual (
  id INT AUTO_INCREMENT PRIMARY KEY,
  anio INT NOT NULL UNIQUE,
  total_ventas DECIMAL(12, 2) NOT NULL DEFAULT 0,
  cantidad_pedidos INT NOT NULL DEFAULT 0,
  ticket_promedio DECIMAL(12, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
```

#### Tabla `productos_top_periodo`

```sql
CREATE TABLE productos_top_periodo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo_periodo VARCHAR(20) NOT NULL,
  referencia_periodo VARCHAR(30) NOT NULL,
  producto_id INT NOT NULL,
  cantidad_vendida INT NOT NULL DEFAULT 0,
  total_vendido DECIMAL(12, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_productos_top_periodo_producto
    FOREIGN KEY (producto_id) REFERENCES productos(id)
) ENGINE=InnoDB;
```

#### Tabla `categorias_top_periodo`

```sql
CREATE TABLE categorias_top_periodo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo_periodo VARCHAR(20) NOT NULL,
  referencia_periodo VARCHAR(30) NOT NULL,
  categoria_id INT NOT NULL,
  cantidad_vendida INT NOT NULL DEFAULT 0,
  total_vendido DECIMAL(12, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_categorias_top_periodo_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
) ENGINE=InnoDB;
```

### Indices recomendados en MySQL

```sql
CREATE INDEX idx_productos_categoria_id ON productos(categoria_id);
CREATE INDEX idx_productos_activo ON productos(activo);
CREATE INDEX idx_clientes_correo ON clientes(correo);
CREATE INDEX idx_clientes_numero ON clientes(numero);
CREATE INDEX idx_pedidos_fecha_venta ON pedidos(fecha_venta);
CREATE INDEX idx_pedidos_estado ON pedidos(estado);
CREATE INDEX idx_pedidos_canal ON pedidos(canal);
CREATE INDEX idx_pedido_items_pedido_id ON pedido_items(pedido_id);
CREATE INDEX idx_pedido_items_producto_id ON pedido_items(producto_id);
CREATE INDEX idx_ventas_resumen_diario_fecha ON ventas_resumen_diario(fecha);
CREATE INDEX idx_ventas_resumen_semanal_periodo ON ventas_resumen_semanal(anio, semana);
CREATE INDEX idx_ventas_resumen_mensual_periodo ON ventas_resumen_mensual(anio, mes);
CREATE INDEX idx_ventas_resumen_anual_anio ON ventas_resumen_anual(anio);
```

### Nota practica

Estas tablas y sintaxis son una base recomendada para arrancar bien en MySQL. Cuando implementemos el backend, podremos convertir esta misma estructura a:

- SQL puro
- migraciones manuales
- Prisma
- Sequelize

Pero el orden de creacion y las relaciones ya quedan definidos desde aqui.
