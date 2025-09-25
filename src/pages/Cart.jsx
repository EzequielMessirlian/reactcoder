import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import CartItem from "../components/CartItem.jsx";

export default function Cart() {
  const { items, total, clearCart, removeItem } = useCart();
  if (items.length === 0) {
    return (
      <main className="container">
        <h2>Carrito</h2>
        <p>Tu carrito está vacío.</p>
        <Link to="/" className="badge">Ir al catálogo</Link>
      </main>
    );
  }
  return (
    <main className="container" style={{ display: "grid", gap: 16 }}>
      <h2>Carrito</h2>
      {items.map(it => <CartItem key={it.id} item={it} onRemove={removeItem} />)}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={clearCart}>Vaciar carrito</button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <strong>Total: {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(total)}</strong>
          <Link to="/checkout" className="badge">Finalizar compra</Link>
        </div>
      </div>
    </main>
  );
}
