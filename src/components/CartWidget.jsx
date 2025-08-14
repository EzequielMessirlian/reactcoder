export default function CartWidget() {
  return (
    <button aria-label="Carrito" style={{ border: "none", background: "transparent", cursor: "pointer" }}>
      🛒 <span style={{ fontWeight: 600 }}>0</span>
    </button>
  )
}