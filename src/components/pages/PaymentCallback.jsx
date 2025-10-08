import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveOrder } from '../../services/db'
import { useCart } from '../../contexts/CartContext'

function PaymentCallback() {
  const navigate = useNavigate()
  const { items: cartItems, getCartTotal, getCartSavings, clearCart } = useCart()
  const [status, setStatus] = useState('Processing payment...')

  useEffect(() => {
    async function finalize() {
      try {
        const params = new URLSearchParams(window.location.search)
        const paymentId = params.get('razorpay_payment_id') || params.get('payment_id') || null
        const orderId = params.get('razorpay_order_id') || params.get('order_id') || `order_${Date.now()}`
        const deliveryInfo = JSON.parse(localStorage.getItem('deliveryInfo') || 'null')
        const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress') || 'null')
        const deliv = deliveryInfo?.deliveryPrice || 0

        try {
          await saveOrder({
            orderId,
            paymentId,
            items: cartItems,
            totals: {
              subtotal: getCartTotal(),
              savings: getCartSavings(),
              delivery: deliv,
              total: getCartTotal() + deliv,
            },
            deliveryInfo: deliveryInfo || null,
            shippingAddress: shippingAddress || null,
            paymentMethod: 'payment_link',
          })
        } catch (error) {
          console.error('Failed to save order to Firestore:', error)
          // Continue with email and invoice even if Firestore fails
        }
        // Build invoice HTML and trigger download
        try {
          const rows = cartItems.map(it => `<tr><td>${it.name} (${it.size})</td><td>${it.quantity}</td><td>₹${it.price}</td><td>₹${it.price * it.quantity}</td></tr>`).join('')
          const invoiceHtml = `<!doctype html><html><head><meta charset=\"utf-8\"><title>Invoice ${orderId}</title>
            <style>body{font-family:Arial,sans-serif;padding:24px;color:#111}h1{font-size:20px;margin:0 0 8px}
            table{width:100%;border-collapse:collapse;margin-top:12px}th,td{border:1px solid #ddd;padding:8px;font-size:12px;text-align:left}
            .totals{margin-top:12px;font-size:14px}</style></head><body>
            <h1>The Powder Legacy - Invoice</h1>
            <div>Order ID: <strong>${orderId}</strong></div>
            <div>Payment ID: <strong>${paymentId || '-'}</strong></div>
            <table><thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead><tbody>${rows}</tbody></table>
            <div class=\"totals\"> 
              <div>Subtotal: ₹${getCartTotal()}</div>
              <div>Savings: ₹${getCartSavings()}</div>
              <div>Delivery: ₹${deliv}</div>
              <div><strong>Grand Total: ₹${getCartTotal() + deliv}</strong></div>
            </div>
          </body></html>`
          const blob = new Blob([invoiceHtml], { type: 'text/html' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `invoice_${orderId}.html`
          document.body.appendChild(a)
          a.click()
          a.remove()
          URL.revokeObjectURL(url)

          // Email customer and admin with attachment
          const orderItems = cartItems.map(it => ({ title: `${it.name} (${it.size})`, quantity: it.quantity, price: it.price }))
          const address = shippingAddress ? [
            `${shippingAddress.firstName || ''} ${shippingAddress.lastName || ''}`.trim(),
            shippingAddress.address,
            `${shippingAddress.city || ''}, ${shippingAddress.state || ''} ${shippingAddress.pincode || ''}`.trim(),
            shippingAddress.country || 'India',
            `Phone: ${shippingAddress.phone || ''}`
          ].filter(Boolean).join('\n') : ''
          const r = await fetch('/api/send-order-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId,
              paymentId,
              customerName: `${shippingAddress?.firstName || ''} ${shippingAddress?.lastName || ''}`.trim() || 'Customer',
              customerEmail: shippingAddress?.email,
              orderItems,
              orderTotal: getCartTotal() + deliv,
              paymentMethod: 'Razorpay',
              customerAddress: address,
              invoiceHtml,
            })
          })
          if (!r.ok) {
            console.warn('Email send failed (callback):', await r.text())
          }
        } catch {}

        clearCart()
        localStorage.removeItem('shippingAddress')
        localStorage.removeItem('deliveryInfo')
        setStatus('Payment confirmed. Redirecting...')
        const itemsForSuccess = cartItems.map(it => ({ name: it.name, size: it.size, price: it.price, quantity: it.quantity, image: it.image || null }))
        setTimeout(() => navigate('/order-success', { state: { paymentId, orderId, items: itemsForSuccess } }), 800)
      } catch (e) {
        setStatus('Failed to record payment. You can contact support if funds were captured.')
      }
    }
    finalize()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{status}</h1>
        <p className="text-gray-600">Please wait...</p>
      </div>
    </div>
  )
}

export default PaymentCallback


