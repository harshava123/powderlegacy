import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

// Contacts
export async function saveContactMessage(message) {
  // message: { name, email, phone, subject, message }
  return await addDoc(collection(db, 'contact_messages'), {
    ...message,
    createdAt: serverTimestamp(),
  })
}

// Orders
export async function saveOrder(order) {
  // order: { orderId, paymentId, items, totals, deliveryInfo, shippingAddress, user }
  
  // Sanitize the order data to ensure Firestore compatibility
  const sanitizedOrder = {
    orderId: String(order.orderId || ''),
    paymentId: String(order.paymentId || ''),
    paymentMethod: String(order.paymentMethod || ''),
    items: (order.items || []).map(item => ({
      id: String(item.id || ''),
      name: String(item.name || ''),
      size: String(item.size || ''),
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 0),
      image: String(item.image || ''),
    })),
    totals: {
      subtotal: Number(order.totals?.subtotal || 0),
      savings: Number(order.totals?.savings || 0),
      delivery: Number(order.totals?.delivery || 0),
      total: Number(order.totals?.total || 0),
    },
    deliveryInfo: order.deliveryInfo ? {
      method: String(order.deliveryInfo.method || ''),
      deliveryPrice: Number(order.deliveryInfo.deliveryPrice || 0),
      estimatedDays: Number(order.deliveryInfo.estimatedDays || 0),
    } : null,
    shippingAddress: order.shippingAddress ? {
      firstName: String(order.shippingAddress.firstName || ''),
      lastName: String(order.shippingAddress.lastName || ''),
      email: String(order.shippingAddress.email || ''),
      phone: String(order.shippingAddress.phone || ''),
      address: String(order.shippingAddress.address || ''),
      city: String(order.shippingAddress.city || ''),
      state: String(order.shippingAddress.state || ''),
      pincode: String(order.shippingAddress.pincode || ''),
      country: String(order.shippingAddress.country || ''),
    } : null,
  }
  
  const id = sanitizedOrder.orderId || undefined
  if (id) {
    const ref = doc(db, 'orders', String(id))
    await setDoc(ref, { ...sanitizedOrder, createdAt: serverTimestamp() }, { merge: true })
    return ref
  }
  return await addDoc(collection(db, 'orders'), {
    ...sanitizedOrder,
    createdAt: serverTimestamp(),
  })
}

// Carts (optional snapshot per user)
export async function saveCartSnapshot(userId, items) {
  if (!userId) return null
  return await addDoc(collection(db, 'users', String(userId), 'carts'), {
    items,
    createdAt: serverTimestamp(),
  })
}

// Favorites (toggle/save)
export async function saveFavorite(userId, productId) {
  if (!userId) return null
  const ref = doc(collection(db, 'users', String(userId), 'favorites'))
  await setDoc(ref, { productId, createdAt: serverTimestamp() })
  return ref
}
