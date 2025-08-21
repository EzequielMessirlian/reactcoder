import { useState } from "react";

export default function ItemCount({ stock = 0, initial = 1, onAdd }) {
  const [qty, setQty] = useState(initial);
  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(stock, q + 1));

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <button onClick={dec} disabled={qty <= 1}>-</button>
      <span style={{ minWidth: 24, textAlign: "center" }}>{qty}</span>
      <button onClick={inc} disabled={qty >= stock}>+</button>
      <button onClick={() => onAdd?.(qty)} disabled={stock === 0} style={{ marginLeft: 8 }}>
        Agregar al carrito
      </button>
    </div>
  );
}
