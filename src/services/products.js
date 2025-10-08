import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { productsData } from '../data/products'

const PRODUCTS_COL = 'products'

export async function fetchProducts(filters = {}) {
  // filters: { category, size, search, limitCount }
  // FORCE USING LOCAL DATA ONLY - Skip Firestore
  console.log('🔄 Using local product data only (Firestore disabled)')
  console.log('📦 Total products in local data:', productsData.length)
  console.log('🔍 Anti Hairfall product:', productsData.find(p => p.name === 'Anti Hairfall'))
  let products = [...productsData]

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
}

export async function fetchProductById(id) {
  // FORCE USING LOCAL DATA ONLY - Skip Firestore
  console.log('🔄 Using local product data for ID:', id)
  const product = productsData.find(p => p.id === parseInt(id) || p.id === String(id)) || null
  console.log('🔍 Found product:', product)
  return product
}

export async function fetchRelated(product, count = 4) {
  if (!product) return []
  const items = await fetchProducts({ category: product.category, limitCount: count + 1 })
  return items.filter(p => p.id !== product.id).slice(0, count)
}
