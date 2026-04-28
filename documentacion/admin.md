# Admin del proyecto

## 1. Objetivo

Este documento define la base del panel admin para que se conecte al proyecto actual sin romper la arquitectura ni la base de datos ya creada.

El admin debe apoyarse en:

- la base de datos `oasis`
- las tablas ya definidas en la documentacion general
- el backend actual de leads
- la logica de productos, categorias, ventas y reportes que luego creceran por modulos

## 2. Principio de integracion

El panel admin no debe construirse como algo aislado. Debe ser una extension controlada del mismo sistema.

Reglas clave:

- usar la misma base `oasis`
- respetar los nombres actuales de tablas y campos
- no duplicar logica que ya viva en backend
- crecer por modulos
- centralizar autenticacion y seguridad en backend
- separar frontend publico del frontend admin

## 3. Relacion con el proyecto publico

El proyecto publico actual ya cubre:

- home responsive
- busqueda
- categorias
- detalle de producto
- carrito
- salida por WhatsApp
- captura de leads
- endpoint `POST /api/clientes`

El admin debe complementar eso con:

- gestion de categorias
- gestion de productos
- gestion de imagenes
- gestion de ventas
- dashboard
- reportes
- control de acceso

## 4. Arquitectura recomendada

### Frontend admin

Se recomienda un frontend separado:

```text
admin/
  src/
    app/
      providers/
      routes/
    components/
      auth/
      dashboard/
      categories/
      products/
      sales/
      reports/
      ui/
    pages/
      LoginPage.tsx
      DashboardPage.tsx
      CategoriesPage.tsx
      ProductsPage.tsx
      SalesPage.tsx
      ReportsPage.tsx
    hooks/
    services/
    styles/
    types/
    main.tsx
```

### Backend compartido

El backend actual debe crecer asi:

```text
backend/
  src/
    app.ts
    server.ts
    config/
    controllers/
    db/
    middlewares/
    routes/
    services/
    types/
    utils/
    modules/
      clientes/
      auth/
      categorias/
      productos/
      ventas/
      reportes/
      analytics/
```

## 5. Tablas con las que debe conectarse

El admin debe usar estas tablas:

- `admins`
- `categorias`
- `productos`
- `producto_imagenes`
- `clientes`
- `pedidos`
- `pedido_items`
- `ventas_resumen_diario`
- `ventas_resumen_semanal`
- `ventas_resumen_mensual`
- `ventas_resumen_anual`
- `productos_top_periodo`
- `categorias_top_periodo`

## 6. Modulos del admin

### 6.1 Auth

Responsabilidad:

- login de administradores
- proteccion de rutas
- cierre de sesion
- validacion de identidad

Tabla principal:

- `admins`

Endpoints recomendados:

- `POST /api/admin/auth/login`
- `POST /api/admin/auth/logout`
- `GET /api/admin/auth/me`

### 6.2 Dashboard

Debe mostrar:

- ventas del dia
- ventas de la semana
- ventas del mes
- ventas del ano
- ticket promedio
- cantidad de pedidos
- productos mas vendidos
- categorias mas vendidas

Fuente de datos recomendada:

- tablas resumen
- consultas optimizadas de analytics

### 6.3 Categorias

Debe permitir:

- crear categoria
- editar categoria
- listar categorias
- activar o desactivar si luego se agrega el campo
- eliminar segun politica del negocio

Tabla principal:

- `categorias`

### 6.4 Productos

Debe permitir:

- crear producto
- editar nombre
- editar descripcion
- editar precio
- editar stock
- asignar categoria
- activar o desactivar producto
- administrar galeria de imagenes

Tablas principales:

- `productos`
- `producto_imagenes`
- `categorias`

### 6.5 Ventas

Debe permitir:

- listar pedidos
- ver detalle de pedido
- filtrar por fecha
- revisar items
- revisar total, estado y canal

Tablas principales:

- `pedidos`
- `pedido_items`
- `clientes`

### 6.6 Reportes

Debe permitir:

- exportar ventas por dia
- exportar ventas por semana
- exportar ventas por mes
- exportar ventas por ano
- exportar por rango personalizado

Fuente recomendada:

- tablas resumen
- detalle de pedidos solo cuando haga falta

## 7. Seguridad requerida para admin

El admin no debe montarse sin estas piezas:

- contrasenas hasheadas
- autenticacion segura
- expiracion de sesion o token
- middleware de rutas protegidas
- validacion estricta de payloads
- CORS controlado si vive en otro dominio o puerto
- auditoria minima de errores
- proteccion de endpoints sensibles

## 8. Orden recomendado de implementacion

Para conectarlo sin problemas a este proyecto, conviene hacerlo asi:

1. crear tabla `admins`
2. implementar auth backend
3. crear login frontend admin
4. proteger rutas admin
5. crear modulo categorias
6. crear modulo productos
7. crear modulo ventas
8. crear dashboard
9. crear reportes

## 9. Contrato de integracion con el sistema actual

El admin debe respetar:

- la base `oasis`
- los nombres actuales de tablas
- los indices ya creados
- los campos `nombre`, `correo`, `numero` en `clientes`
- el backend modular como punto unico de acceso
- consultas parametrizadas
- configuracion sensible por `.env`

## 10. Recomendacion final

La mejor forma de crear el admin sin romper este proyecto es:

- separar frontend admin del frontend publico
- compartir el mismo backend y la misma base
- proteger primero auth antes de CRUDs
- leer dashboard desde tablas resumen
- usar esta documentacion como contrato tecnico de integracion
