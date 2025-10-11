import React from 'react'
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'

function Cart() {
  const { items: cartItems, updateQuantity, removeFromCart, getCartTotal, getCartSavings } = useCart()

  const handleUpdateQuantity = (id, size, newQuantity) => {
    updateQuantity(id, size, newQuantity)
  }

  const handleRemoveItem = (id, size) => {
    removeFromCart(id, size)
  }

  // Safety check
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-lg text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/shop"
              className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link
              to="/shop"
              className="flex items-center text-gray-600 hover:text-green-800 transition-colors mr-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <div className="text-sm text-gray-600">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Cart Items</h2>
                
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
                      {/* Top Row: Image + Details */}
                      <div className="flex items-start gap-3 flex-1">
                        {/* Product Image */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-gray-400 text-xs text-center px-1">
                              <div className="font-medium text-[10px] sm:text-xs">{item.name}</div>
                              <div className="text-[9px] sm:text-xs">{item.category}</div>
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-lg font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600">{item.category} • {item.size}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-base sm:text-lg font-bold text-green-800">₹{item.price}</span>
                          </div>
                        </div>

                        {/* Remove Button - Desktop */}
                        <button
                          onClick={() => handleRemoveItem(item.id, item.size)}
                          className="hidden sm:block text-red-500 hover:text-red-700 transition-colors p-2"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Bottom Row: Quantity + Total */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity - 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 sm:w-10 text-center font-medium text-sm sm:text-base">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity + 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right min-w-[80px] sm:min-w-[100px]">
                          <div className="text-base sm:text-lg font-bold text-gray-900">
                            ₹{item.price * item.quantity}
                          </div>
                        </div>

                        {/* Remove Button - Mobile */}
                        <button
                          onClick={() => handleRemoveItem(item.id, item.size)}
                          className="sm:hidden text-red-500 hover:text-red-700 transition-colors p-2"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md sticky top-4">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">₹{getCartTotal()}</span>
                  </div>
                  
                  <div className="flex justify-between text-green-600">
                    <span>You Save:</span>
                    <span className="font-medium">₹{getCartSavings()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>₹{getCartTotal()}</span>
                    </div>
                  </div>
                </div>

                <Link 
                  to="/checkout/address"
                  className="w-full bg-green-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-6 flex items-center justify-center"
                >
                  Proceed to Checkout
                </Link>

                <div className="mt-4 text-center">
                  <Link
                    to="/shop"
                    className="text-green-800 hover:text-green-600 transition-colors text-sm"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm font-medium">Secure Checkout</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Your payment information is safe and encrypted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products removed */}
      </div>
    </div>
  )
}

export default Cart
