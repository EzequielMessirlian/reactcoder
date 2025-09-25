import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function CartWidget() {
  const { units } = useCart();
  return (
    <Link to="/cart" className="badge" aria-label="Carrito">
      🛒 <span style={{ marginLeft: 6 }}>{units}</span>
    </Link>
  );
}
