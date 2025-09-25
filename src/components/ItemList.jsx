import ProductCard from "./ProductCard.jsx";

export default function ItemList({ items = [] }) {
  return (
    <section className="grid">
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </section>
  );
}
