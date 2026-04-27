# Estructura de trabajo del proyecto

## 1. Objetivo de este documento

Este archivo define la estructura que se usara para desarrollar el proyecto y las tareas necesarias para completarlo de manera ordenada, escalable y exitosa.

La idea es que este documento funcione como guia operativa del proyecto, dejando claro:

- que se va a construir
- en que orden se va a construir
- que dependencias tiene cada etapa
- que debe estar terminado antes de pasar a lo siguiente
- que el modulo admin queda para la fase final

## 2. Meta general del proyecto

Construir una SPA e-commerce en React + TypeScript enfocada en:

- mostrar productos de forma atractiva
- permitir navegacion fluida sin recargas
- facilitar ventas rapidas por WhatsApp
- capturar clientes en base de datos
- dejar una base limpia para crecimiento futuro
- funcionar correctamente en todas las pantallas

## 3. Regla principal de construccion

El proyecto se desarrollara por fases.

Primero se construye el flujo comercial principal:

- visualizacion de productos
- detalle de producto
- carrito
- checkout por WhatsApp

La captura de cliente queda como una funcionalidad adicional y opcional, sin bloquear la salida a WhatsApp.

Despues se refuerzan:

- backend
- seguridad
- optimizacion
- pruebas

El panel de administracion se deja de ultimo.

## 4. Estructura general del proyecto

```text
project-root/
  frontend/
    public/
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
        feedback/
      context/
        CartContext.tsx
        ProductContext.tsx
      hooks/
        useCart.ts
        useProducts.ts
        useProductGallery.ts
        useLeadForm.ts
      pages/
        HomePage.tsx
      services/
        httpClient.ts
        clientService.ts
        productService.ts
      utils/
        buildWhatsAppMessage.ts
        filterProducts.ts
        formatCurrency.ts
        validators.ts
      types/
        product.ts
        cart.ts
        client.ts
        api.ts
      constants/
        categories.ts
        config.ts
      data/
        products.ts
      styles/
        globals.css
        tokens.css
      App.tsx
      main.tsx
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
  docs/
    documentacion.md
    estructura.md
```

## 5. Orden oficial de desarrollo

El orden de construccion sera este:

1. base del frontend
2. estructura visual principal
3. sistema de productos
4. detalle de producto con galeria grande
5. carrito de compras
6. checkout por WhatsApp
7. captura opcional de cliente
8. backend de leads
9. seguridad y validaciones
10. optimizacion y pulido UX
11. pruebas finales
12. panel admin

## 6. Fase 1: base del frontend

### Objetivo

Dejar la aplicacion lista para crecer sin desorden.

### Tareas

- crear estructura de carpetas base
- definir arquitectura por dominios
- configurar estilos globales
- definir tokens visuales de marca
- crear tipos base de TypeScript
- preparar datos mock de productos
- definir constantes iniciales

### Entregables

- estructura `src/` creada
- tipos principales definidos
- tema visual inicial
- datos mock reutilizables

## 7. Fase 2: estructura visual principal

### Objetivo

Construir el esqueleto principal de la SPA.

### Tareas

- crear `Navbar`
- crear hero o zona inicial si aplica
- crear seccion de productos destacados
- crear bloque de categorias
- crear footer
- crear boton flotante de WhatsApp
- asegurar responsive real en mobile, tablet y desktop

### Entregables

- home visual funcional
- layout principal navegable
- base visual coherente en desktop y mobile

## 8. Fase 3: sistema de productos

### Objetivo

Permitir listar y explorar productos sin salir de la SPA.

### Tareas

- crear `ProductCard`
- renderizar listado de productos
- conectar productos destacados con estado de producto seleccionado
- implementar filtro por categorias
- implementar buscador por nombre y categoria
- agregar keywords de apoyo para busqueda interna

### Entregables

- listado funcional
- filtros funcionando
- busqueda interna operativa

## 9. Fase 4: detalle de producto con galeria grande

### Objetivo

Dar al usuario una visualizacion clara e inmersiva del producto.

### Tareas

- crear `ProductDetail`
- crear `ProductGallery`
- mostrar imagen principal grande
- mostrar miniaturas
- permitir cambio de imagen activa
- mostrar nombre, categoria, precio y stock
- agregar CTA de compra visible
- mostrar descripcion corta si aplica
- agregar productos relacionados debajo

### Entregables

- detalle dinamico en la misma pagina
- experiencia contemplativa del producto
- relacionados visibles y funcionales

## 10. Fase 5: carrito de compras

### Objetivo

Permitir construir un pedido sin friccion.

### Tareas

- crear `CartContext` o estado central del carrito
- crear hook `useCart`
- agregar productos al carrito
- aumentar cantidad
- disminuir cantidad
- eliminar producto
- mostrar subtotal
- mostrar total en tiempo real
- impedir superar stock disponible

### Entregables

- carrito funcional
- total calculado correctamente
- interacciones claras y rapidas

## 11. Fase 6: checkout por WhatsApp

### Objetivo

Cerrar la intencion de compra con el menor numero de pasos posible.

### Tareas

- crear utilidad `buildWhatsAppMessage`
- convertir carrito a mensaje estructurado
- calcular total final
- codificar mensaje en URL
- abrir `wa.me` del vendedor
- crear boton `Pagar por WhatsApp`
- permitir salida a WhatsApp sin exigir datos del cliente

### Entregables

- flujo de checkout funcional
- mensaje claro y util para vendedor y cliente
- compra sin friccion ni formularios obligatorios

## 12. Fase 7: captura opcional de cliente

### Objetivo

Recolectar informacion del lead solo si el cliente desea compartirla.

### Tareas

- crear `LeadForm`
- agregar validaciones de nombre, correo y numero
- mostrar mensajes de error claros
- permitir uso totalmente opcional
- evitar que el formulario bloquee el checkout
- definir puntos no invasivos para captar leads

### Entregables

- formulario funcional opcional
- validacion visual correcta
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
- no se debe cerrar checkout sin tener carrito funcional
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

- estructura de carpetas creada
- estilos globales definidos
- tipos base creados
- mocks de productos listos

### Home y navegacion

- navbar creada
- destacados creados
- categorias creadas
- footer creado
- boton flotante de WhatsApp creado

### Productos

- cards creadas
- filtros funcionando
- buscador funcionando
- producto seleccionado funcionando
- relacionados funcionando

### Vista de producto

- galeria creada
- imagen principal grande visible
- miniaturas funcionando
- CTA visible

### Carrito

- agregar producto
- aumentar cantidad
- disminuir cantidad
- eliminar producto
- total en tiempo real

### Cliente y checkout

- mensaje de WhatsApp generado
- boton pagar funcionando
- checkout sin friccion funcionando
- formulario opcional creado
- validaciones creadas

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
