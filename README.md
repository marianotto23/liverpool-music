# Liverpool Music

Liverpool Music es un ecommerce ficticio de instrumentos musicales desarrollado como proyecto fullstack con React, TypeScript, Node.js y Express.

El proyecto simula una tienda online completa con catálogo de productos, detalle individual, carrito de compras, checkout, creación de órdenes, persistencia local de última orden, panel administrativo y backend propio.

## Links

- Demo online: https://liverpool-music-frontend.vercel.app/
- API online: https://name-liverpool-music-api.onrender.com
- Repositorio: https://github.com/marianotto23/liverpool-music


## Tecnologías utilizadas

### Frontend

- React
- TypeScript
- React Router DOM
- Context API
- LocalStorage
- CSS
- Vite

### Backend

- Node.js
- Express
- TypeScript
- CORS
- Dotenv
- ts-node-dev

## Funcionalidades principales

### Frontend

- Catálogo de productos
- Filtro por categoría
- Buscador de productos
- Ordenamiento por precio y nombre
- Página de detalle dinámico por ID
- Carrito global con Context API
- Sumar, restar, eliminar y vaciar productos del carrito
- Control visual de stock
- Persistencia del carrito en localStorage
- Checkout conectado al backend
- Guardado de última orden en localStorage
- Página de última orden
- Página de contacto
- Página sobre nosotros
- Página 404
- Navbar responsive
- Footer
- Panel admin de productos
- Panel admin de órdenes
- Detalle de orden por ID

### Backend

- API REST con Express
- Endpoint de estado `/health`
- Endpoint para listar productos
- Endpoint para obtener producto por ID
- Endpoint para crear órdenes
- Endpoint para listar órdenes
- Endpoint para obtener orden por ID
- Validación de datos del comprador
- Validación de items
- Cálculo del total desde el backend
- Validación de stock
- Descuento de stock al crear una orden
- Almacenamiento en memoria para productos y órdenes

## Endpoints principales

### Health check

GET /health

### Productos

GET /products

GET /products/:id

### Órdenes

GET /orders

GET /orders/:id

POST /orders

## Estructura del proyecto

```txt
liverpool-music/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CheckoutForm.tsx
│   │   │   ├── CheckoutSummary.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductFilters.tsx
│   │   │
│   │   ├── context/
│   │   │   └── CartContext.tsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useProductFilter.ts
│   │   │
│   │   ├── pages/
│   │   │   ├── About.tsx
│   │   │   ├── Admin.tsx
│   │   │   ├── AdminOrderDetail.tsx
│   │   │   ├── AdminOrders.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── Checkout.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── LastOrder.tsx
│   │   │   ├── NotFound.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   └── Products.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── types/
│   │   │   ├── CartItem.ts
│   │   │   ├── Order.ts
│   │   │   └── Product.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── formatPrice.ts
│   │   │   └── orderStorage.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.ts
│
└── backend/
    ├── src/
    │   ├── controllers/
    │   │   ├── ordersController.ts
    │   │   └── productsController.ts
    │   │
    │   ├── data/
    │   │   ├── orders.ts
    │   │   └── products.ts
    │   │
    │   ├── routes/
    │   │   ├── index.ts
    │   │   ├── ordersRoutes.ts
    │   │   └── productsRoutes.ts
    │   │
    │   ├── types/
    │   │   ├── Order.ts
    │   │   └── Product.ts
    │   │
    │   ├── app.ts
    │   └── server.ts
    │
    ├── package.json
    └── tsconfig.json
```

## Instalación

Clonar el repositorio:

git clone <url-del-repositorio>

Entrar al proyecto:

cd liverpool-music

Instalar dependencias del frontend:

cd frontend
npm install

Instalar dependencias del backend:

cd ../backend
npm install

## Ejecutar el proyecto en desarrollo

Se necesitan dos terminales abiertas.

### Terminal 1: backend

Desde la carpeta `backend`:

npm run dev

El backend corre en:

http://localhost:4000

### Terminal 2: frontend

Desde la carpeta `frontend`:

npm run dev

El frontend corre en:

http://localhost:5173

## Build

### Frontend

cd frontend
npm run build

### Backend

cd backend
npm run build

## Objetivo del proyecto

Este proyecto fue desarrollado como práctica fullstack para portfolio, aplicando conceptos reales de frontend y backend en una aplicación ecommerce.

El objetivo principal fue construir una aplicación más cercana a un proyecto profesional, trabajando interfaz, lógica de negocio, consumo de API, manejo de estado, rutas, formularios, persistencia local, validaciones y separación de responsabilidades.

## Conceptos aplicados

- Componentización
- Separación de responsabilidades
- Tipado con TypeScript
- Estado global con Context API
- Hooks personalizados
- Rutas dinámicas con React Router
- Formularios controlados
- Renderizado condicional
- Consumo de API con fetch
- Persistencia con localStorage
- API REST con Express
- Validación backend
- Manejo de stock
- Creación de órdenes
- Organización por capas: routes, controllers, data, types
- Diseño responsive

## Estado del proyecto

Proyecto fullstack funcional en desarrollo.

Próximas mejoras posibles:

- Agregar base de datos real
- Persistir productos y órdenes en MongoDB o PostgreSQL
- Crear autenticación de usuarios
- Crear login para panel admin
- Crear CRUD real de productos
- Mejorar diseño visual final
- Agregar imágenes reales de productos
- Preparar deploy frontend/backend
- Documentar variables de entorno
- Agregar tests

## Autor

Mariano Ottolini