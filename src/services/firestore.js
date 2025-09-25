import { db } from "./firebase";
import {
  collection, doc, getDoc, getDocs, query, where, addDoc, serverTimestamp, writeBatch, increment
} from "firebase/firestore";

const PRODUCTS_COL = "products";
const ORDERS_COL = "orders";

export async function fsGetProducts(categoryId) {
  if (!db) throw new Error("Firebase no configurado. Completa el .env");
  const colRef = collection(db, PRODUCTS_COL);
  const q = categoryId ? query(colRef, where("categoryId", "==", categoryId)) : colRef;
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function fsGetProductById(id) {
  if (!db) throw new Error("Firebase no configurado. Completa el .env");
  const ref = doc(db, PRODUCTS_COL, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Producto no encontrado");
  return { id: snap.id, ...snap.data() };
}

export async function fsGetCategories() {
  if (!db) throw new Error("Firebase no configurado. Completa el .env");
  const colRef = collection(db, PRODUCTS_COL);
  const snap = await getDocs(colRef);
  const set = new Map();
  snap.forEach(d => {
    const { categoryId, categoryName } = d.data();
    if (categoryId && !set.has(categoryId)) set.set(categoryId, { id: categoryId, name: categoryName || categoryId });
  });
  return Array.from(set.values());
}

export async function fsCreateOrder({ buyer, items, total }) {
  if (!db) throw new Error("Firebase no configurado. Completa el .env");
  // Create order first
  const orderDoc = await addDoc(collection(db, ORDERS_COL), {
    buyer, items, total, createdAt: serverTimestamp()
  });
  return orderDoc.id;
}

export async function fsDecrementStock(cartItems) {
  if (!db) throw new Error("Firebase no configurado. Completa el .env");
  const batch = writeBatch(db);
  for (const it of cartItems) {
    const ref = doc(db, PRODUCTS_COL, it.id);
    batch.update(ref, { stock: increment(-it.qty) });
  }
  await batch.commit();
}
