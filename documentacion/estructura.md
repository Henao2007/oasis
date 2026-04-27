# Estructura de trabajo del proyecto

## 1. Objetivo de este documento

Este archivo define la estructura que se usara para desarrollar el proyecto y las tareas necesarias para completarlo de manera ordenada, escalable y exitosa.

La idea es que este documento funcione como guia operativa del proyecto, dejando claro:

- que se va a construir
- en que orden se va a construir
- que dependencias tiene cada etapa
- que debe estar terminado antes de pasar a lo siguiente
- que el modulo admin queda para la fase final

## Estado actual

### Completado

- :white_check_mark: estructura base del frontend creada
- :white_check_mark: arquitectura por dominios aplicada en `src/`
- :white_check_mark: estilos globales y tokens iniciales creados
- :white_check_mark: datos mock de productos creados
- :white_check_mark: navbar, destacados, categorias y footer base creados
- :white_check_mark: galeria y detalle inicial de producto creados
- :white_check_mark: carrito base y salida por WhatsApp creados
- :white_check_mark: formulario opcional inicial creado
- :white_check_mark: navbar sticky con fondo destacado implementado
- :white_check_mark: menu lateral mobile implementado
- :white_check_mark: carrito lateral con fondo borroso implementado

### En progreso

- estructura visual principal refinada
- sistema de productos conectado y pulido
- detalle de producto y carrito afinando experiencia real
- validaciones visuales y mensajes de interfaz
- ajuste de ubicacion contextual del formulario opcional

### Pendiente

- backend de leads
- seguridad completa de frontend y backend
- optimizacion final
- pruebas finales
- panel admin

## 2. Meta general del proyecto

Construir una SPA e-commerce en React + TypeScript enfocada en:

- mostrar productos de forma atractiva
- permitir navegacion fluida sin recargas
- facilitar ventas rapidas por WhatsApp
- capturar clientes en base de datos
- dejar una base limpia para crecimiento futuro
- funcionar correctamente en todas las pantallas

La aplicacion utilizara Vite como herramienta de desarrollo y build del frontend.

## 3. Regla principal de construccion

El proyecto se desarrollara por fases.

Primero se construye el flujo comercial principal:

- visualizacion de productos
- detalle de producto
- carrito
- salida directa a WhatsApp

La captura de cliente queda como una funcionalidad adicional y opcional, sin bloquear la salida a WhatsApp.

Despues se refuerzan:

- backend
- seguridad
- optimizacion
- pruebas

El panel de administracion se deja de ultimo.

## 4. Estructura general del proyecto

### 4.1 Estructura actual del repositorio

```text
project-root/
  documentacion/
    documentacion.md
    estructura.md
  public/
  src/
    app/
      providers/
        AppProviders.tsx
      routes/
        AppRouter.tsx
      store/
        index.ts
    assets/
      vite.svg
    components/
      cart/
        CartSummary.tsx
        CheckoutButton.tsx
      feedback/
        SectionMessage.tsx
      forms/
        LeadForm.tsx
      layout/
        FloatingWhatsApp.tsx
        Footer.tsx
        Navbar.tsx
      product/
        CategoryFilter.tsx
        FeaturedProducts.tsx
        ProductCard.tsx
        ProductDetail.tsx
        ProductGallery.tsx
        RelatedProducts.tsx
        SearchBar.tsx
      ui/
        Button.tsx
        Input.tsx
    constants/
      categories.ts
      config.ts
    context/
      CartContext.tsx
      ProductContext.tsx
    data/
      products.ts
    hooks/
      useCart.tsx
      useLeadForm.tsx
      useProductGallery.tsx
      useProducts.tsx
    pages/
      HomePage.tsx
    services/
      clientService.ts
      httpClient.ts
      productService.ts
    styles/
      globals.css
      tokens.css
    types/
      api.ts
      cart.ts
      client.ts
      product.ts
    utils/
      buildWhatsAppMessage.ts
      filterProducts.ts
      formatCurrency.ts
      validators.ts
    App.tsx
    index.css
    main.tsx
  index.html
  package.json
  tsconfig.app.json
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
```

### 4.2 Estructura planificada para backend

```text
  backend/
    src/
      config/
      controllers/
      routes/
      services/
      repositories/
      middlewares/
      schemas/
      db/
      types/
      utils/
      app.ts
      server.ts
```

## 5. Orden oficial de desarrollo

El orden de construccion sera este:

1. :white_check_mark: ~~base del frontend~~
2. :white_check_mark: ~~estructura visual principal~~
3. sistema de productos
4. detalle de producto con galeria grande
5. carrito de compras
6. salida directa a WhatsApp
7. captura opcional de cliente
8. backend de leads
9. seguridad y validaciones
10. optimizacion y pulido UX
11. pruebas finales
12. panel admin

## 6. Fase 1: base del frontend

### Objetivo

:white_check_mark: ~~Dejar la aplicacion lista para crecer sin desorden.~~

### Tareas

- :white_check_mark: ~~crear estructura de carpetas base~~
- :white_check_mark: ~~definir arquitectura por dominios~~
- :white_check_mark: ~~configurar estilos globales~~
- :white_check_mark: ~~definir tokens visuales de marca~~
- :white_check_mark: ~~crear tipos base de TypeScript~~
- :white_check_mark: ~~preparar datos mock de productos~~
- :white_check_mark: ~~definir constantes iniciales~~

### Entregables

- :white_check_mark: ~~estructura `src/` creada~~
- :white_check_mark: ~~tipos principales definidos~~
- :white_check_mark: ~~tema visual inicial~~
- :white_check_mark: ~~datos mock reutilizables~~

## 7. Fase 2: estructura visual principal

### Objetivo

:white_check_mark: ~~Construir el esqueleto principal de la SPA.~~

### Tareas

- :white_check_mark: ~~crear `Navbar`~~
- crear hero o zona inicial si aplica
- :white_check_mark: ~~crear seccion de productos destacados~~
- :white_check_mark: ~~crear bloque de categorias~~
- :white_check_mark: ~~crear footer~~
- :white_check_mark: ~~crear boton flotante de WhatsApp~~
- :white_check_mark: ~~asegurar responsive real en mobile, tablet y desktop~~
- :white_check_mark: ~~ajustar navbar con buscador compacto~~
- :white_check_mark: ~~crear experiencia mobile con logo, buscador y menu hamburguesa~~
- :white_check_mark: ~~hacer navbar fijo con fondo destacado~~
- :white_check_mark: ~~convertir menu mobile en panel lateral~~
- quitar WhatsApp del navbar y dejarlo solo flotante

### Entregables

- :white_check_mark: ~~home visual funcional~~
- :white_check_mark: ~~layout principal navegable~~
- :white_check_mark: ~~base visual coherente en desktop y mobile~~

## 8. Fase 3: sistema de productos

### Objetivo

Permitir listar y explorar productos sin salir de la SPA.

### Tareas

- :white_check_mark: ~~crear `ProductCard`~~
- :white_check_mark: ~~renderizar listado de productos~~
- :white_check_mark: ~~conectar productos destacados con estado de producto seleccionado~~
- :white_check_mark: ~~implementar filtro por categorias~~
- :white_check_mark: ~~implementar buscador por nombre y categoria~~
- :white_check_mark: ~~agregar keywords de apoyo para busqueda interna~~

### Entregables

- :white_check_mark: ~~listado funcional~~
- :white_check_mark: ~~filtros funcionando~~
- :white_check_mark: ~~busqueda interna operativa~~

## 9. Fase 4: detalle de producto con galeria grande

### Objetivo

Dar al usuario una visualizacion clara e inmersiva del producto.

### Tareas

- :white_check_mark: ~~crear `ProductDetail`~~
- :white_check_mark: ~~crear `ProductGallery`~~
- :white_check_mark: ~~mostrar imagen principal grande~~
- :white_check_mark: ~~mostrar miniaturas~~
- :white_check_mark: ~~permitir cambio de imagen activa~~
- :white_check_mark: ~~mostrar nombre, categoria, precio y stock~~
- :white_check_mark: ~~agregar CTA de compra visible~~
- :white_check_mark: ~~mostrar descripcion corta si aplica~~
- :white_check_mark: ~~agregar productos relacionados debajo~~
- mostrar formulario opcional solo al entrar al detalle
- en web, ubicar formulario al lado del producto
- en movil, ubicar formulario despues de relacionados
- mantener WhatsApp siempre visible en detalle

### Entregables

- :white_check_mark: ~~detalle dinamico en la misma pagina~~
- :white_check_mark: ~~experiencia contemplativa del producto~~
- :white_check_mark: ~~relacionados visibles y funcionales~~

## 10. Fase 5: carrito de compras

### Objetivo

Permitir construir un pedido sin friccion.

### Tareas

- :white_check_mark: ~~crear `CartContext` o estado central del carrito~~
- :white_check_mark: ~~crear hook `useCart`~~
- :white_check_mark: ~~agregar productos al carrito~~
- :white_check_mark: ~~aumentar cantidad~~
- :white_check_mark: ~~disminuir cantidad~~
- :white_check_mark: ~~eliminar producto~~
- subtotal
- :white_check_mark: ~~mostrar total en tiempo real~~
- :white_check_mark: ~~impedir superar stock disponible~~
- :white_check_mark: ~~mostrar carrito como panel lateral dentro de la misma pantalla~~
- :white_check_mark: ~~aplicar fondo borroso al abrir carrito~~

### Entregables

- :white_check_mark: ~~carrito funcional~~
- :white_check_mark: ~~carrito lateral sin sacar al usuario del flujo~~
- :white_check_mark: ~~total calculado correctamente~~
- :white_check_mark: ~~interacciones claras y rapidas~~

## 11. Fase 6: salida directa a WhatsApp

### Objetivo

Cerrar la intencion de compra con el menor numero de pasos posible usando WhatsApp como accion principal.

### Tareas

- :white_check_mark: ~~crear utilidad `buildWhatsAppMessage`~~
- :white_check_mark: ~~convertir carrito a mensaje estructurado~~
- :white_check_mark: ~~calcular total final~~
- :white_check_mark: ~~codificar mensaje en URL~~
- :white_check_mark: ~~abrir `wa.me` del vendedor~~
- conectar la salida a WhatsApp con el icono o acceso principal
- :white_check_mark: ~~permitir salida a WhatsApp sin exigir datos del cliente~~

### Entregables

- :white_check_mark: ~~flujo de salida a WhatsApp funcional~~
- :white_check_mark: ~~mensaje claro y util para vendedor y cliente~~
- :white_check_mark: ~~compra sin friccion ni formularios obligatorios~~

## 12. Fase 7: captura opcional de cliente

### Objetivo

Recolectar informacion del lead solo si el cliente desea compartirla.

### Tareas

- :white_check_mark: ~~crear `LeadForm`~~
- :white_check_mark: ~~agregar validaciones de nombre, correo y numero~~
- mostrar mensajes de error claros
- :white_check_mark: ~~permitir uso totalmente opcional~~
- :white_check_mark: ~~evitar que el formulario bloquee la salida a WhatsApp~~
- definir puntos no invasivos para captar leads
- mover el formulario para que solo aparezca dentro del detalle del producto

### Entregables

- :white_check_mark: ~~formulario funcional opcional~~
- :white_check_mark: ~~validacion visual correcta~~
- leads listos para envio al backend si el cliente decide compartirlos

## 13. Fase 8: backend de leads

### Objetivo

Guardar clientes potenciales en la base de datos.

### Tareas

- crear backend base
- configurar servidor
- conectar base de datos
- crear tabla `clientes`
- crear endpoint `POST /api/clientes`
- validar payload
- controlar duplicados por correo y numero
- responder con errores consistentes

### Entregables

- API funcional
- insercion segura de clientes
- manejo basico de errores

## 14. Fase 9: seguridad y validaciones

### Objetivo

Blindar el MVP sin sobrecomplicarlo.

### Tareas

- validar frontend y backend
- sanitizar entradas
- usar consultas parametrizadas
- centralizar manejo de errores
- controlar CORS
- limitar respuestas con informacion sensible
- prevenir XSS
- prevenir SQL Injection

### Entregables

- formularios mas seguros
- API mas estable
- riesgos basicos cubiertos

## 15. Fase 10: optimizacion y pulido UX

### Objetivo

Mejorar percepcion de calidad, rendimiento y conversion.

### Tareas

- optimizar imagenes de producto
- aplicar carga diferida en imagenes secundarias
- mejorar feedback visual del carrito
- mejorar estados vacios
- mejorar mensajes de accion exitosa
- revisar responsive fino
- mejorar contraste, espaciado y jerarquia visual
- reforzar CTA principales
- validar interaccion tactil y legibilidad en pantallas pequenas
- pulir menu hamburguesa y navegacion compacta en celular

### Entregables

- UX mas clara
- mejor rendimiento percibido
- mejor experiencia mobile

## 16. Fase 11: pruebas finales

### Objetivo

Validar que el flujo principal de negocio quede estable.

### Tareas

- probar buscador
- probar filtros por categoria
- probar seleccion de producto
- probar galeria de imagenes
- probar carrito
- probar validaciones de formulario
- probar envio al backend
- probar apertura de WhatsApp
- probar responsive
- probar mobile pequeno, mobile grande, tablet, laptop y desktop
- revisar errores de consola

### Entregables

- flujo principal validado
- errores criticos corregidos

## 17. Fase 12: panel admin

### Regla de esta fase

El admin solo se desarrolla cuando el flujo comercial principal ya este completo y estable.

### Objetivo

Agregar gestion interna sin comprometer el MVP principal.

### Alcance sugerido del admin

- login basico seguro
- dashboard simple
- gestion de productos
- gestion de stock
- visualizacion de leads capturados
- estado de pedidos llegados por WhatsApp si luego se modela

### Tareas futuras del admin

- definir roles si realmente son necesarios
- crear vistas protegidas
- crear CRUD de productos
- crear listado de clientes
- crear acciones de actualizacion de stock
- agregar metricas basicas

### Entregables del admin

- panel funcional
- acceso restringido
- gestion operativa minima

## 18. Dependencias entre fases

- no se debe cerrar carrito sin tener productos funcionales
- no se debe cerrar salida a WhatsApp sin tener carrito funcional
- no se debe cerrar backend sin definir payload del formulario opcional
- no se debe empezar admin antes de validar el flujo de ventas

## 19. Criterios de exito del proyecto

El proyecto se considera exitosamente culminado cuando:

- el usuario puede buscar productos
- el usuario puede filtrar por categorias
- el usuario puede abrir un producto en la misma SPA
- el usuario puede ver imagen grande del producto y sus vistas secundarias
- el usuario puede agregar productos al carrito
- el usuario puede enviar el pedido por WhatsApp
- el usuario puede enviar el pedido por WhatsApp sin dejar datos obligatoriamente
- el usuario puede dejar sus datos solo si quiere
- el sistema puede guardar sus datos en base de datos
- la experiencia funciona bien en mobile y desktop
- la experiencia funciona bien en celulares pequenos, celulares grandes, tablets, laptops y escritorio

## 20. Checklist maestro

### Frontend base

- :white_check_mark: ~~estructura de carpetas creada~~
- :white_check_mark: ~~estilos globales definidos~~
- :white_check_mark: ~~tipos base creados~~
- :white_check_mark: ~~mocks de productos listos~~

### Home y navegacion

- :white_check_mark: ~~navbar creada~~
- :white_check_mark: ~~destacados creados~~
- :white_check_mark: ~~categorias creadas~~
- :white_check_mark: ~~footer creado~~
- :white_check_mark: ~~boton flotante de WhatsApp creado~~
- :white_check_mark: ~~navbar sticky implementado~~
- :white_check_mark: ~~menu hamburguesa lateral implementado~~
- :white_check_mark: ~~categorias desplegables implementadas~~

### Productos

- :white_check_mark: ~~cards creadas~~
- :white_check_mark: ~~filtros funcionando~~
- :white_check_mark: ~~buscador funcionando~~
- :white_check_mark: ~~producto seleccionado funcionando~~
- :white_check_mark: ~~relacionados funcionando~~

### Vista de producto

- :white_check_mark: ~~galeria creada~~
- :white_check_mark: ~~imagen principal grande visible~~
- :white_check_mark: ~~miniaturas funcionando~~
- :white_check_mark: ~~CTA visible~~

### Carrito

- :white_check_mark: ~~agregar producto~~
- :white_check_mark: ~~aumentar cantidad~~
- :white_check_mark: ~~disminuir cantidad~~
- :white_check_mark: ~~eliminar producto~~
- :white_check_mark: ~~total en tiempo real~~
- :white_check_mark: ~~carrito como panel lateral implementado~~
- :white_check_mark: ~~fondo borroso del carrito implementado~~

### Cliente y WhatsApp

- :white_check_mark: ~~mensaje de WhatsApp generado~~
- :white_check_mark: ~~salida principal por WhatsApp funcionando~~
- :white_check_mark: ~~compra sin friccion por WhatsApp funcionando~~
- :white_check_mark: ~~formulario opcional creado~~
- :white_check_mark: ~~validaciones creadas~~

### Backend

- servidor creado
- base de datos conectada
- tabla `clientes` creada
- endpoint de clientes funcionando

### Calidad

- validaciones completas
- seguridad basica aplicada
- responsive revisado
- responsive validado en todas las pantallas objetivo
- optimizacion de imagenes aplicada
- pruebas finales hechas

### Admin

- se deja para la fase final

## 21. Recomendacion operativa

Cada fase debe cerrarse con:

- implementacion
- revision visual
- prueba funcional
- correccion de errores encontrados

No conviene avanzar por cantidad de componentes creados, sino por flujo de negocio realmente funcional.

## 22. Conclusion

Este documento define la ruta de trabajo completa del proyecto. Si se sigue este orden, el desarrollo se mantiene claro, escalable y centrado en conversion.

La prioridad es terminar primero toda la experiencia de compra y captura de cliente. El modulo admin queda como ultima fase para no frenar ni complicar la entrega del MVP principal.

## 23. Panel admin

### Objetivo

El panel admin sera la ultima gran fase del proyecto y tendra como objetivo centralizar la operacion interna del negocio.

### Alcance funcional del panel

Debe permitir:

- cambiar fotos de productos
- cambiar nombres de productos
- cambiar precios
- cambiar stock
- cambiar categoria
- editar descripcion
- eliminar productos
- activar o desactivar productos
- ver ventas del dia
- ver ventas de la semana
- ver ventas del mes
- ver ventas del ano
- ver ventas por rango de fechas
- imprimir PDF del periodo que se quiera consultar
- visualizar dashboard de metricas

### Modulos del admin

#### 1. Dashboard

Mostrar:

- ventas del dia
- ventas de la semana
- ventas del mes
- ventas del ano
- pedidos realizados
- ticket promedio
- productos mas vendidos
- categorias con mas ventas

Debe estar pensado primero para celular:

- tarjetas verticales
- metricas resumidas
- filtros tactiles

#### 2. Productos

Permitir:

- crear producto
- editar producto
- cambiar imagenes
- cambiar precio
- cambiar stock
- cambiar categoria
- eliminar producto

Este modulo debe ser comodo de usar desde movil.

#### 3. Ventas

Permitir:

- listar ventas
- filtrar por fecha
- ver detalle de venta
- revisar productos vendidos
- revisar totales por periodo

#### 4. Reportes

Permitir:

- exportar o imprimir PDF del dia
- exportar o imprimir PDF de la semana
- exportar o imprimir PDF del mes
- exportar o imprimir PDF del ano
- exportar o imprimir PDF por rango personalizado

### Recomendacion para analitica de datos

Para que el admin no se ponga lento, no recomiendo calcular toda la analitica en tiempo real cada vez que alguien abra el dashboard.

#### Recomendacion principal

Separar:

- datos operativos
- datos agregados para dashboard

#### Implementacion sugerida

- guardar ventas normales en tablas operativas
- crear resumenes diarios, semanales, mensuales y anuales
- consultar esos resumenes desde el dashboard
- usar indices y filtros optimizados
- si el volumen crece, agregar cache o tareas programadas

### Estructura sugerida para backend del admin

```text
backend/
  src/
    modules/
      products/
      sales/
      reports/
      analytics/
      auth/
```

### Estructura sugerida para frontend del admin

```text
admin/
  src/
    app/
      providers/
      routes/
    components/
      dashboard/
      products/
      reports/
      auth/
      ui/
    pages/
      LoginPage.tsx
      DashboardPage.tsx
      ProductsPage.tsx
      ReportsPage.tsx
    hooks/
    services/
    types/
    styles/
    pwa/
```

### Decision de implementacion del admin

El panel admin se construira como:

- React + TypeScript + Vite
- PWA
- mobile-first
- compatible con escritorio
- con una cuenta admin creada desde el inicio

### Tareas futuras del panel admin

- preparar base PWA del admin
- crear login admin
- crear tabla `admins`
- crear autenticacion segura
- crear rutas protegidas
- crear CRUD de productos
- crear modulo de ventas
- crear modulo de reportes PDF
- crear modulo de analitica
- crear dashboard con metricas resumidas
- optimizar consultas para periodos largos

### Regla de implementacion del admin

El admin se construira solo despues de cerrar:

- flujo principal de compra
- backend de leads
- validaciones y seguridad base
- optimizacion inicial del frontend publico

### Recomendacion final para este sistema

La mejor opcion para incluir analitica sin volver lento el admin es:

- mantener React + TypeScript + Vite en frontend admin
- preparar el admin como PWA mobile-first
- usar Node.js + TypeScript + Express en backend
- almacenar ventas en tablas normales
- generar tablas resumen para metricas
- generar PDF desde backend
- crear una cuenta admin inicial protegida

Con esta base el admin puede crecer sin comprometer el rendimiento de la operacion diaria.
