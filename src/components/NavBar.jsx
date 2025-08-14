import CartWidget from './CartWidget.jsx'

export default function NavBar() {
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px 16px", borderBottom: "1px solid #eee" }}>
      <div style={{ fontWeight: 800, fontSize: 18 }}>MiTiendita</div>
      <a href="#" style={{ textDecoration: "none" }}>Inicio</a>
      <a href="#" style={{ textDecoration: "none" }}>Productos</a>
      <a href="#" style={{ textDecoration: "none" }}>Contacto</a>
      <div style={{ marginLeft: "auto" }}>
        <CartWidget />
      </div>
    </nav>
  )
}