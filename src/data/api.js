const PRODUCTS = [
  { 
    id: "p1", 
    title: "Taladro Percutor 750W", 
    price: 149999, 
    stock: 12, 
    categoryId: "herramientas", 
    categoryName: "Herramientas", 
    image: "/img/taladro.jpg",
    description: "Taladro percutor con velocidad variable y reversa." 
  },
  { 
    id: "p2", 
    title: "Atornillador Drywall 550W", 
    price: 119999, 
    stock: 8, 
    categoryId: "herramientas", 
    categoryName: "Herramientas", 
    image: "/img/atornillador.jpg",
    description: "Atornillador para placas de yeso con embrague automático." 
  },
  { 
    id: "p3", 
    title: "Placa OSB 11mm", 
    price: 34999, 
    stock: 35, 
    categoryId: "maderas", 
    categoryName: "Maderas", 
    image: "/img/osb.jpg",
    description: "Placa OSB 11mm para entrepisos y rigidización." 
  },
  { 
    id: "p4", 
    title: "Perfil C 70 x 0.9mm", 
    price: 8999, 
    stock: 120, 
    categoryId: "steelframe", 
    categoryName: "Steel Frame", 
    image: "/img/perfilc.jpg",
    description: "Perfil galvanizado para estructura de steel frame." 
  },
  { 
    id: "p5", 
    title: "Lana de vidrio 50mm", 
    price: 25999, 
    stock: 42, 
    categoryId: "aislaciones", 
    categoryName: "Aislaciones", 
    image: "/img/lanavidrio.jpg",
    description: "Rollo de lana de vidrio con foil aluminizado." 
  },
  { 
    id: "p6", 
    title: "Fenólico 18mm", 
    price: 69999, 
    stock: 20, 
    categoryId: "maderas", 
    categoryName: "Maderas", 
    image: "/img/fenolico.jpg",
    description: "Fenólico 18mm calidad construcción." 
  },
];

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getProducts() {
  await wait(500);
  return PRODUCTS.map((p) => ({ ...p }));
}

export async function getProductsByCategory(categoryId) {
  await wait(500);
  return PRODUCTS.filter((p) => p.categoryId === categoryId).map((p) => ({ ...p }));
}

export async function getProductById(id) {
  await wait(500);
  const found = PRODUCTS.find((p) => p.id === id);
  if (!found) throw new Error("Producto no encontrado");
  return { ...found };
}

export async function getCategories() {
  await wait(300);
  const set = new Set(PRODUCTS.map((p) => JSON.stringify({ id: p.categoryId, name: p.categoryName })));
  return Array.from(set).map((s) => JSON.parse(s));
}
