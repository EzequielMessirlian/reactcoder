export default function CartItem({ item, onRemove }) {
  return (
    <div className="card" style={{ display: "grid", gridTemplateColumns: "64px 1fr auto", gap: 12, padding: 12, alignItems: "center" }}>
      <img src={item.image} alt={item.title} style={{ width: 64, height: 64, objectFit: "cover" }} />
      <div>
        <div style={{ fontWeight: 600 }}>{item.title}</div>
        <div style={{ fontSize: 14, opacity: 0.8 }}>
          x{item.qty} × {formatCurrency(item.price)} = <strong>{formatCurrency(item.price * item.qty)}</strong>
        </div>
      </div>
      <button onClick={() => onRemove?.(item.id)}>Eliminar</button>
    </div>
  );
}

function formatCurrency(n) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(n);
}
