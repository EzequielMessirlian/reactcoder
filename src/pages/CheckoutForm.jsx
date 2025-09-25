import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { fsCreateOrder, fsDecrementStock } from "../services/firestore";

export default function CheckoutForm() {
  const { items, total, clearCart } = useCart();
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const orderItems = items.map(it => ({ id: it.id, title: it.title, price: it.price, qty: it.qty }));
      const id = await fsCreateOrder({ buyer, items: orderItems, total });
      // Opcional: decrementar stock
      await fsDecrementStock(items);
      setOrderId(id);
      clearCart();
    } catch (err) {
      setError(err.message || "No se pudo generar la orden");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !orderId) {
    return (
      <main className="container">
        <h2>Checkout</h2>
        <p>No hay productos en el carrito.</p>
      </main>
    );
  }

  return (
    <main className="container" style={{ maxWidth: 720 }}>
      <h2>Checkout</h2>
      {orderId ? (
        <div className="card" style={{ padding: 16 }}>
          <p>¡Gracias por tu compra! Tu ID de orden es:</p>
          <code style={{ fontSize: 18 }}>{orderId}</code>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card" style={{ padding: 16, display: "grid", gap: 12 }}>
          <label>Nombre
            <input required value={buyer.name} onChange={e => setBuyer({ ...buyer, name: e.target.value })} />
          </label>
          <label>Email
            <input required type="email" value={buyer.email} onChange={e => setBuyer({ ...buyer, email: e.target.value })} />
          </label>
          <label>Teléfono
            <input required value={buyer.phone} onChange={e => setBuyer({ ...buyer, phone: e.target.value })} />
          </label>
          <button type="submit" disabled={loading}>{loading ? "Procesando..." : "Confirmar compra"}</button>
        </form>
      )}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </main>
  );
}
