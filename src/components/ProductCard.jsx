import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  return (
    <article className="card">
      <img src={item.image} alt={item.title} />
      <div className="card-body">
        <h3 style={{ margin: 0, fontSize: 18 }}>{item.title}</h3>
        <p className="price">
          {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(item.price)}
        </p>
        <Link to={`/item/${item.id}`} className="badge">Ver detalle</Link>
      </div>
    </article>
  );
}
