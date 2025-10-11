import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Leaf, Shield, Heart, ShoppingCart, User } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { fetchProducts } from '../../services/products'
import { productsData } from '../../data/products'

function Home() {
  const { addToCart } = useCart()
  const [selectedSizes, setSelectedSizes] = useState({})
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favorites') || '[]') } catch { return [] }
  })
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)
  
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    let cancelled = false
    async function load() {
      console.log('🏠 Home: Loading featured products...')
      const list = await fetchProducts({})
      console.log('🏠 Home: Received products:', list.length)
      console.log('🏠 Home: Anti Hairfall in list:', list.find(p => p.name === 'Anti Hairfall'))
      // simple pick: top 4 by rating
      const top = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4)
      console.log('🏠 Home: Top 4 products:', top.map(p => ({ name: p.name, sizes: p.sizes })))
      if (!cancelled) setFeaturedProducts(top)
    }
    load()
    return () => { cancelled = true }
  }, [])

  const handleAddToCart = (product) => {
    const selectedSize = selectedSizes[product.id] || product.sizes[0].size
    const sizeObj = product.sizes.find(size => size.size === selectedSize)
    addToCart(product, sizeObj, 1)
  }

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }))
  }

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const exists = prev.includes(productId)
      const next = exists ? prev.filter(id => id !== productId) : [...prev, productId]
      localStorage.setItem('favorites', JSON.stringify(next))
      return next
    })
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true)
      setNewsletterEmail('')
      setTimeout(() => setNewsletterSuccess(false), 3000)
    }
  }

  const testimonials = [
    { name: "Priya Sharma", location: "Mumbai", rating: 5, comment: "Amazing natural products! My skin has never felt better. The Sassy Sunnipindi is my go-to for glowing skin." },
    { name: "Rajesh Kumar", location: "Delhi", rating: 5, comment: "The Anti Hairfall powder worked wonders for my hair. Natural, effective, and affordable - exactly what I was looking for." },
    { name: "Sunita Reddy", location: "Bangalore", rating: 5, comment: "Love the authenticity and quality. The products are gentle on skin and deliver amazing results. Highly recommended!" }
  ]

  const features = [
    { icon: <Leaf className="w-8 h-8" />, title: "100% Natural", description: "Pure, chemical-free ingredients sourced from nature" },
    { icon: <Shield className="w-8 h-8" />, title: "Family Safe", description: "Safe for all ages, gentle on sensitive skin" },
    { icon: <Heart className="w-8 h-8" />, title: "Traditional Wisdom", description: "Age-old recipes passed down through generations" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-50 to-white">
      {/* Hero Banner */}
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Constrain hero height; image covers to keep composition */}
        <div className="relative h-56 sm:h-72 md:h-80 lg:h-126">
          <img
            src="/top.jpg"
            alt="Natural green powder background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Left-aligned text within the same height */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
              <div className="text-left max-w-2xl text-slate-900">
                <h1 className="text-4xl md:text-6xl font-extrabold  text-green-800 mb-4 md:mb-6 tracking-tight">
              The Powder Legacy
            </h1>
                <p className="text-lg md:text-2xl mb-6 md:mb-8">
              Timeless Wisdom of Traditional Self-Care, Reimagined
            </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link 
                to="/shop" 
                    className="btn-primary px-6 md:px-8 py-3 inline-flex items-center justify-center"
              >
                Shop Now <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link 
                to="/about" 
                    className="btn-outline px-6 md:px-8 py-3 inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Categories under Hero */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Skin Care */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link to="/shop/skin-care" className="group flex flex-col items-center text-center">
                <div className="mx-auto h-32 w-32 md:h-36 md:w-36 rounded-full border-4 border-emerald-600 mb-4">
                  <div className="h-full w-full rounded-full overflow-hidden">
                    <img src="/4849388.jpg" alt="Skin care" className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800">Skin Care</h3>
                <p className="text-slate-700 text-sm mt-1 mb-2">Traditional bath powders and skincare solutions.</p>
                <span className="text-emerald-800 font-semibold inline-flex items-center justify-center">Explore now →</span>
              </Link>
            </motion.div>

            {/* Hair Care */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link to="/shop/hair-care" className="group flex flex-col items-center text-center">
                <div className="mx-auto h-32 w-32 md:h-36 md:w-36 rounded-full border-4 border-emerald-600 mb-4">
                  <div className="h-full w-full rounded-full overflow-hidden">
                    <img src="/18965903.jpg" alt="Hair care" className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800">Hair Care</h3>
                <p className="text-slate-700 text-sm mt-1 mb-2">Natural powders to strengthen and nourish hair.</p>
                <span className="text-emerald-800 font-semibold inline-flex items-center justify-center">Explore now →</span>
              </Link>
            </motion.div>

            {/* Oral Care */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/shop/oral-care" className="group flex flex-col items-center text-center">
                <div className="mx-auto h-32 w-32 md:h-36 md:w-36 rounded-full border-4 border-emerald-600 mb-4">
                  <div className="h-full w-full rounded-full overflow-hidden">
                    <img src="/hair.jpg" alt="Oral care" className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800">Oral Care</h3>
                <p className="text-slate-700 text-sm mt-1 mb-2">Traditional tooth powders for oral hygiene.</p>
                <span className="text-emerald-800 font-semibold inline-flex items-center justify-center">Explore now →</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              About The Powder Legacy
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-slate-700 mb-6">
                At <strong>The Powder Legacy</strong>, we carry forward the timeless wisdom of traditional self-care, reimagined for today's world. Our products are crafted with natural, chemical-free ingredients, offering safe and effective alternatives to everyday personal care and wellness needs.
              </p>
              <p className="text-slate-700 mb-6">
                From bath powders and hair care to nutritional supplements and tooth powders, each product is rooted in heritage and refined with care to suit modern lifestyles. We are committed to purity, sustainability, and trust – ensuring that every product is thoughtfully sourced, affordable, and family-friendly.
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center text-emerald-800 font-semibold hover:text-emerald-600 transition-colors"
              >
                Read More About Us <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 rounded-xl bg-white shadow-md ring-1 ring-emerald-100">
                  <div className="text-emerald-800 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        className="py-16 bg-orange-50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Products</h2>
            <p className="text-lg text-slate-600">Discover our bestsellers crafted with traditional wisdom</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const selectedSize = selectedSizes[product.id] || product.sizes[0].size
              const sizeObj = product.sizes.find(size => size.size === selectedSize)

              return (
                <div key={product.id} className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200">
                  {/* Image - Clickable */}
                  <Link to={`/shop/product/${product.id}`} className="block relative overflow-hidden bg-gradient-to-br from-emerald-50 to-gray-50 aspect-square">
                    {product.images && product.images.length > 0 ? (
                      <>
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                        {/* Favorite Button */}
                        <button 
                          onClick={(e) => { e.preventDefault(); toggleFavorite(product.id) }}
                          className={`absolute top-3 left-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 ${favorites.includes(product.id) ? 'text-red-500' : 'text-gray-600'}`}
                        >
                          <Heart size={18} className={`${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="text-center">
                          <div className="text-sm font-medium">{product.name}</div>
                        </div>
                      </div>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    {/* Title and Rating */}
                    <div>
                      <Link to={`/shop/product/${product.id}`}>
                        <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-emerald-700 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">({product.reviews})</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-emerald-700">
                        ₹{sizeObj.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Size Selector - Simplified */}
                    <div>
                      <div className="flex gap-2 flex-wrap">
                        {product.sizes.map((size, index) => (
                          <button 
                            key={index} 
                            onClick={() => handleSizeSelect(product.id, size.size)} 
                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                              selectedSize === size.size 
                                ? 'bg-emerald-700 text-white shadow-md' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {size.size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <button 
                        onClick={() => handleAddToCart(product)} 
                        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-95"
                      >
                        <ShoppingCart size={18} />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop" className="btn-primary px-8 py-3 inline-flex items-center">
              View All Products <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <section className="py-16 bg-emerald-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-slate-600">Organic care with honesty, purity, and tradition</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="relative p-6 rounded-2xl bg-white/80 ring-1 ring-emerald-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center ring-2 ring-emerald-300">
                <motion.div whileHover={{ rotate: 180 }} transition={{ type: 'spring', stiffness: 250, damping: 15 }}>
                  <Leaf className="text-emerald-700" size={22} />
                </motion.div>
          </div>
              <h3 className="mt-6 font-semibold text-slate-900">100% Natural Ingredients</h3>
              <p className="mt-2 text-sm text-slate-600">Plant-based powders crafted without harsh chemicals or synthetics.</p>
            </motion.div>

            <motion.div 
              className="relative p-6 rounded-2xl bg-white/80 ring-1 ring-emerald-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center ring-2 ring-emerald-300">
                <motion.div whileHover={{ rotate: 180 }} transition={{ type: 'spring', stiffness: 250, damping: 15 }}>
                  <Shield className="text-emerald-700" size={22} />
                </motion.div>
              </div>
              <h3 className="mt-6 font-semibold text-slate-900">Safe For Family</h3>
              <p className="mt-2 text-sm text-slate-600">Gentle on skin and hair, suitable for all ages.</p>
            </motion.div>

            <motion.div 
              className="relative p-6 rounded-2xl bg-white/80 ring-1 ring-emerald-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center ring-2 ring-emerald-300">
                <motion.div whileHover={{ rotate: 180 }} transition={{ type: 'spring', stiffness: 250, damping: 15 }}>
                  <Heart className="text-emerald-700" size={22} />
                </motion.div>
              </div>
              <h3 className="mt-6 font-semibold text-slate-900">Rooted In Tradition</h3>
              <p className="mt-2 text-sm text-slate-600">Time-tested recipes inspired by authentic regional practices.</p>
            </motion.div>

            <motion.div 
              className="relative p-6 rounded-2xl bg-white/80 ring-1 ring-emerald-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center ring-2 ring-emerald-300">
                <motion.div whileHover={{ rotate: 180 }} transition={{ type: 'spring', stiffness: 250, damping: 15 }}>
                  <Star className="text-emerald-700" size={22} />
                </motion.div>
              </div>
              <h3 className="mt-6 font-semibold text-slate-900">Loved By Customers</h3>
              <p className="mt-2 text-sm text-slate-600">Consistent 5-star feedback for quality and value.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-slate-600">Real experiences from our happy community</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-emerald-50 ring-1 ring-emerald-100 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
              >
                {/* Decorative quotes */}
                <div className="absolute -top-4 -left-3 text-emerald-300 select-none" aria-hidden="true">“</div>
                <div className="absolute -bottom-6 -right-2 text-emerald-300 select-none rotate-180" aria-hidden="true">”</div>

                {/* Avatar */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center ring-2 ring-emerald-200">
                    <User className="h-6 w-6 text-emerald-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 leading-tight">{t.name}</div>
                    <div className="text-xs text-slate-600">{t.location}</div>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-slate-700 mb-4 italic leading-relaxed">“{t.comment}”</p>

                {/* Stars */}
                <div className="flex items-center">
                  {[...Array(5)].map((_, si) => (
                    <motion.span key={si} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.05 * si + 0.1 * i, type: 'spring', stiffness: 300, damping: 15 }}>
                      <Star size={16} className={si < t.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'} />
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-br from-emerald-800 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Stay Connected with Nature</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to discover new natural products, 
              exclusive offers, and wellness tips from our traditional wisdom collection.
            </p>
          </motion.div>

          <motion.div
            className="relative max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleNewsletterSubmit} className="relative">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 pr-24 rounded-full border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none bg-white/80 backdrop-blur-sm text-slate-900 placeholder-slate-500 shadow-lg"
                  required
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold transition-colors shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send
                </motion.button>
              </div>
            </form>

            {/* Success Animation */}
            <AnimatePresence>
              {newsletterSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Leaf size={20} />
                    </motion.div>
                    <span className="font-semibold">Successfully subscribed!</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.p
            className="text-sm text-slate-500 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join over 10,000 nature lovers who trust our traditional wisdom
          </motion.p>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        className="py-16 bg-orange-50 text-slate-900"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-emerald-900">Experience Natural Care Today</h2>
          <p className="text-xl mb-8 text-emerald-800/80">Join thousands of satisfied customers who have embraced natural living</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="btn-primary px-8 py-3">Start Shopping</Link>
            <Link to="/contact" className="btn-outline px-8 py-3">Get in Touch</Link>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home
