# E-commerce React — Entrega Final (Coderhouse)

SPA de e‑commerce hecha con React + Vite, React Router, Context API para el carrito y Firebase Firestore para productos y órdenes.

## Requisitos del curso implementados
- **SPA con React Router**: catálogo, categorías, detalle, carrito y checkout (sin recargas).
- **Rutas dinámicas**: `/category/:categoryId`, `/item/:id` con `useParams` y `useEffect`.
- **Contenedores vs presentacionales**: `ItemListContainer` / `ItemDetailContainer` (fetch y estado) + `ItemList`/`Item`/`ProductCard` (presentación).
- **CartContext**: estado global con totales, agregar/quitar/limpiar.
- **CartWidget**: muestra cantidad total de unidades.
- **ItemCount**: selector de cantidad con validaciones y **se oculta** tras agregar.
- **Firestore**: colección `products` para listar/filtrar y `orders` para persistir compras (con ID de confirmación).
- **UX**: loaders/mensajes condicionales (vacíos, errores) y feedback de orden.
- **Buenas prácticas**: sin `console.log` ni código muerto. README + `.env.example`.

## Cómo correr
```bash
npm i
cp .env.example .env   # completar credenciales de Firebase
npm run dev
```

> Si no cargás el `.env`, la app usa **mock data** local para que puedas probar sin Firebase.

## Estructura
```
src/
  components/
    CartItem.jsx
    CartWidget.jsx
    ItemCount.jsx
    NavBar.jsx
    ProductCard.jsx
  context/
    CartContext.jsx
  data/
    api.js              # capa de datos: Firebase o mock
  pages/
    Cart.jsx
    CheckoutForm.jsx
    ItemListContainer.jsx
    ItemDetailContainer.jsx
    NotFound.jsx
  services/
    firebase.js         # init Firestore (usa .env)
    firestore.js        # queries a Firestore
  styles.css
  App.jsx
  main.jsx
.env.example
```

## Firestore
- Colección **`products`**: cada doc debe tener `{ title, price, stock, categoryId, categoryName, image, description }`.
- Colección **`orders`**: se crea un doc `{ buyer, items, total, createdAt }` al confirmar el checkout.

## Deploy
Podés publicar en Vercel/Netlify. Recordá configurar variables `VITE_FIREBASE_*` en el panel del deploy.
