import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../data/api.js";
import ItemCount from "../components/ItemCount.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setAdded(0);
    getProductById(id)
      .then((data) => { if (active) setItem(data); })
      .catch((err) => active && setError(err.message || "Error"))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  const handleAdd = (qty) => {
    if (item && qty > 0) {
      addItem(item, qty);
      setAdded(qty);
    }
  };

  if (loading) return <main className="container"><p>Cargando...</p></main>;
  if (error) return <main className="container"><p style={{ color: "crimson" }}>{error}</p></main>;
  if (!item) return <main className="container"><p>Producto no encontrado.</p></main>;

  return (
    <main className="container">
      <div className="detail">
        <img src={item.image} alt={item.title} />
        <div>
          <h2 style={{ marginTop: 0 }}>{item.title}</h2>
          <p className="price">{formatCurrency(item.price)}</p>
          <p style={{ opacity: 0.8 }}>{item.description}</p>
          {item.stock === 0 && (
            <p style={{ color: "crimson", fontWeight: 600 }}>Producto sin stock</p>
          )}

          {added === 0 ? (
            <ItemCount stock={item.stock} initial={1} onAdd={handleAdd} />
          ) : (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span>Agregaste {added} unidad(es).</span>
              <Link to="/" className="badge">Seguir comprando</Link>
              <Link to="/cart" className="badge">Ir al carrito</Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function formatCurrency(n) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(n);
}
