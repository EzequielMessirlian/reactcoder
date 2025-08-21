
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="container">
      <h2>404 — Página no encontrada</h2>
      <p>Revisá la URL o volvé al catálogo.</p>
      <Link to="/" className="badge">Volver al inicio</Link>
    </main>
  );
}
