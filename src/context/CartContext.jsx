import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{id,title,price,qty,image}]

  const addItem = (item, qty=1) => {
    setItems(prev => {
      const i = prev.findIndex(p => p.id === item.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: Math.min((next[i].qty || 0) + qty, item.stock ?? Infinity) };
        return next;
      }
      return [...prev, { id: item.id, title: item.title, price: item.price, image: item.image, qty }];
    });
  };
  const removeItem = (id) => setItems(prev => prev.filter(p => p.id !== id));
  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const units = items.reduce((acc, it) => acc + (it.qty || 0), 0);
    const total = items.reduce((acc, it) => acc + (it.price * (it.qty || 0)), 0);
    return { units, total };
  }, [items]);

  const value = useMemo(() => ({
    items, addItem, removeItem, clearCart, ...totals
  }), [items, totals.units, totals.total]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
