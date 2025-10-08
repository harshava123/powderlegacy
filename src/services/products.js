import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { productsData } from '../data/products'

const PRODUCTS_COL = 'products'

export async function fetchProducts(filters = {}) {
  // filters: { category, size, search, limitCount }
  try {
    const colRef = collection(db, PRODUCTS_COL)
    const parts = []
    if (filters.category && filters.category !== 'all') {
      parts.push(where('category', '==', filters.category))
    }
    // simple ordering by name; adjust as needed
    parts.push(orderBy('name'))
    if (filters.limitCount) parts.push(limit(filters.limitCount))
    const q = query(colRef, ...parts)
    const snap = await getDocs(q)
    let products = snap.docs.map(d => ({ id: d.id, ...d.data() }))

    // If no products in Firestore, use local data
    if (products.length === 0) {
      products = [...productsData]
    }

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      products = products.filter(p => p.category === filters.category)
    }

    // Apply limit
    if (filters.limitCount) {
      products = products.slice(0, filters.limitCount)
    }

    // client search filter
    if (filters.search) {
      const key = String(filters.search).toLowerCase()
      products = products.filter(p =>
        p.name?.toLowerCase().includes(key) ||
        p.description?.toLowerCase().includes(key) ||
        p.ingredients?.toLowerCase().includes(key) ||
        p.category?.toLowerCase().includes(key)
      )
    }
    return products
  } catch (error) {
    console.warn('Firestore fetch failed, using local data:', error)
    // Fallback to local data
    let products = [...productsData]

    // Apply filters
    if (filters.category && filters.category !== 'all') {
      products = products.filter(p => p.category === filters.category)
    }

    if (filters.limitCount) {
      products = products.slice(0, filters.limitCount)
    }

    if (filters.search) {
      const key = String(filters.search).toLowerCase()
      products = products.filter(p =>
        p.name?.toLowerCase().includes(key) ||
        p.description?.toLowerCase().includes(key) ||
        p.ingredients?.toLowerCase().includes(key) ||
        p.category?.toLowerCase().includes(key)
      )
    }

    return products
  }
}

export async function fetchProductById(id) {
  try {
    const ref = doc(db, PRODUCTS_COL, String(id))
    const snap = await getDoc(ref)
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() }
    }
    // Fallback to local data
    return productsData.find(p => p.id === parseInt(id) || p.id === String(id)) || null
  } catch (error) {
    console.warn('Firestore fetch by ID failed, using local data:', error)
    return productsData.find(p => p.id === parseInt(id) || p.id === String(id)) || null
  }
}

export async function fetchRelated(product, count = 4) {
  if (!product) return []
  const items = await fetchProducts({ category: product.category, limitCount: count + 1 })
  return items.filter(p => p.id !== product.id).slice(0, count)
}


