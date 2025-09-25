// Capa de datos: usa Firebase si está configurado, sino usa mock local para desarrollo.
import { fsGetProducts, fsGetProductById, fsGetCategories } from "../services/firestore";

const USE_FIREBASE = !!import.meta.env.VITE_FIREBASE_PROJECT_ID;

// --- Mock data de respaldo ---
const PRODUCTS = [
  { id: "p1", title: "Taladro Percutor 750W", price: 149999, stock: 12, categoryId: "herramientas", categoryName: "Herramientas", image: "https://via.placeholder.com/600x400?text=Taladro", description: "Taladro percutor con velocidad variable y reversa." },
  { id: "p2", title: "Atornillador Drywall 550W", price: 119999, stock: 8, categoryId: "herramientas", categoryName: "Herramientas", image: "https://via.placeholder.com/600x400?text=Atornillador", description: "Atornillador ideal para durlock, liviano y preciso." },
  { id: "p3", title: "Sierra Caladora 650W", price: 135000, stock: 5, categoryId: "corte", categoryName: "Corte", image: "https://via.placeholder.com/600x400?text=Caladora", description: "Cortes curvos y rectos en madera, plástico y metal." },
  { id: "p4", title: "Amoladora Angular 850W", price: 110000, stock: 9, categoryId: "corte", categoryName: "Corte", image: "https://via.placeholder.com/600x400?text=Amoladora", description: "Amoladora angular compacta con gatillo de seguridad." }
];
const wait = (ms) => new Promise(res => setTimeout(res, ms));

// --- API pública usada por los contenedores ---
export async function getProducts() {
  if (USE_FIREBASE) return fsGetProducts();
  await wait(300);
  return PRODUCTS.map(p => ({ ...p }));
}

export async function getProductsByCategory(catId) {
  if (USE_FIREBASE) return fsGetProducts(catId);
  await wait(300);
  return PRODUCTS.filter(p => p.categoryId === catId).map(p => ({ ...p }));
}

export async function getProductById(id) {
  if (USE_FIREBASE) return fsGetProductById(id);
  await wait(200);
  const found = PRODUCTS.find(p => p.id === id);
  if (!found) throw new Error("Producto no encontrado");
  return { ...found };
}

export async function getCategories() {
  if (USE_FIREBASE) return fsGetCategories();
  await wait(150);
  const set = new Set(PRODUCTS.map(p => JSON.stringify({ id: p.categoryId, name: p.categoryName })));
  return Array.from(set).map(s => JSON.parse(s));
}
