
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts, getProductsByCategory } from "../data/api.js";
import ProductCard from "../components/ProductCard.jsx";

export default function ItemListContainer({ greeting }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const loader = categoryId ? getProductsByCategory(categoryId) : getProducts();
    loader
      .then((list) => mounted && setItems(list))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [categoryId]);

  return (
    <main className="container">
      <h2 style={{ marginBottom: 12 }}>{greeting} {categoryId ? `» ${categoryId}` : "» Todos"}</h2>
      {loading && <p>Cargando...</p>}
      {!loading && items.length === 0 && <p>No hay productos en esta categoría.</p>}
      <section className="grid">
        {items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </section>
    </main>
  );
}
