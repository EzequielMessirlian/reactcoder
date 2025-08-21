
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../data/api.js";
import ItemCount from "../components/ItemCount.jsx";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    getProductById(id)
      .then((p) => active && setItem(p))
      .catch((e) => active && setError(e.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  const handleAdd = (qty) => {
    setAdded(qty);
    // acá luego podrás integrar el contexto de carrito
  };

  if (loading) return <main className="container"><p>Cargando...</p></main>;
  if (error) return <main className="container"><p>Error: {error}</p></main>;
  if (!item) return <main className="container"><p>No encontrado</p></main>;

  return (
    <main className="container">
      <div className="detail">
        <img src={item.image} alt={item.title} style={{ width: "100%", borderRadius: 16, border: "1px solid #eee" }} />
        <div>
          <h1 style={{ marginTop: 0 }}>{item.title}</h1>
          <p className="price">{new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(item.price)}</p>
          <p style={{ opacity: 0.8 }}>{item.description}</p>
          {added === 0 ? (
            <ItemCount stock={item.stock} initial={1} onAdd={handleAdd} />
          ) : (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span>Agregaste {added} unidad(es).</span>
              <Link to="/" className="badge">Seguir comprando</Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
