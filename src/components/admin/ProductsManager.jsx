import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon } from 'lucide-react'
import { productsData } from '../../data/products'
import ImageManager from './ImageManager'
import { saveProductsToSupabase, loadProductsFromSupabase } from '../../services/supabase-cms'

function ProductsManager() {
  const [products, setProducts] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    // Load products from Supabase
    async function loadProducts() {
      const supabaseProducts = await loadProductsFromSupabase()
      if (supabaseProducts && supabaseProducts.length > 0) {
        setProducts(supabaseProducts)
      } else {
        // Use default data if nothing in Supabase
        setProducts([...productsData])
      }
    }
    loadProducts()
  }, [])

  const saveProducts = async (updatedProducts) => {
    setProducts(updatedProducts)
    
    // Save to Supabase
    const result = await saveProductsToSupabase(updatedProducts)
    
    if (result.success) {
      console.log('✅ Products saved to database')
    } else {
      console.error('❌ Failed to save products:', result.error)
      alert('Warning: Failed to save to database. Changes are cached locally.')
    }
  }

  const handleAddNew = () => {
    setEditingProduct({
      id: Date.now(),
      name: '',
      category: 'skin-care',
      description: '',
      fullDescription: '',
      benefits: '',
      ingredients: '',
      keyBenefits: '',
      sizes: [{ size: '200g', weight: '0.20 kg', price: 400, stock: 50 }],
      rating: 4.5,
      reviews: 0,
      images: []
    })
    setIsEditing(true)
    setShowForm(true)
  }

  const handleEdit = (product) => {
    setEditingProduct({ ...product })
    setIsEditing(true)
    setShowForm(true)
  }

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== productId)
      saveProducts(updatedProducts)
    }
  }

  const handleSave = () => {
    if (!editingProduct.name || !editingProduct.description) {
      alert('Please fill in required fields (Name and Description)')
      return
    }

    const updatedProducts = products.some(p => p.id === editingProduct.id)
      ? products.map(p => p.id === editingProduct.id ? editingProduct : p)
      : [...products, editingProduct]

    saveProducts(updatedProducts)
    setShowForm(false)
    setIsEditing(false)
    setEditingProduct(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setIsEditing(false)
    setEditingProduct(null)
  }

  const addSize = () => {
    setEditingProduct({
      ...editingProduct,
      sizes: [...editingProduct.sizes, { size: '', weight: '', price: 0, stock: 0 }]
    })
  }

  const updateSize = (index, field, value) => {
    const newSizes = [...editingProduct.sizes]
    newSizes[index] = { ...newSizes[index], [field]: value }
    setEditingProduct({ ...editingProduct, sizes: newSizes })
  }

  const removeSize = (index) => {
    const newSizes = editingProduct.sizes.filter((_, i) => i !== index)
    setEditingProduct({ ...editingProduct, sizes: newSizes })
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h3 className="text-lg lg:text-xl font-bold text-gray-900">Products Management</h3>
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 bg-emerald-800 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm sm:text-base"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add New Product</span>
          <span className="sm:hidden">Add Product</span>
        </button>
      </div>

      {/* Product Form */}
      {showForm && editingProduct && (
        <div className="bg-white rounded-lg shadow-md p-4 lg:p-6 border-2 border-emerald-200">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-bold text-gray-900">
              {isEditing && products.some(p => p.id === editingProduct.id) ? 'Edit Product' : 'Add New Product'}
            </h4>
            <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., Sassy Sunnipindi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="skin-care">Skin Care</option>
                  <option value="hair-care">Hair Care</option>
                  <option value="oral-care">Oral Care</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description *
              </label>
              <textarea
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                rows="2"
                placeholder="Brief product description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Description
              </label>
              <textarea
                value={editingProduct.fullDescription || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, fullDescription: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                rows="4"
                placeholder="Detailed product description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Benefits
                </label>
                <textarea
                  value={editingProduct.benefits || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, benefits: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  rows="3"
                  placeholder="Product benefits"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Benefits
                </label>
                <textarea
                  value={editingProduct.keyBenefits || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, keyBenefits: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  rows="3"
                  placeholder="Key benefits summary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ingredients
              </label>
              <textarea
                value={editingProduct.ingredients || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, ingredients: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                rows="2"
                placeholder="List of ingredients"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={editingProduct.rating}
                  onChange={(e) => setEditingProduct({ ...editingProduct, rating: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Reviews
                </label>
                <input
                  type="number"
                  value={editingProduct.reviews}
                  onChange={(e) => setEditingProduct({ ...editingProduct, reviews: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Product Sizes & Pricing
                </label>
                <button
                  onClick={addSize}
                  className="text-emerald-800 hover:text-emerald-600 text-sm flex items-center gap-1"
                >
                  <Plus size={16} /> Add Size
                </button>
              </div>
              <div className="space-y-2">
                {editingProduct.sizes.map((size, index) => (
                  <div key={index} className="flex gap-2 items-center bg-gray-50 p-3 rounded-lg">
                    <input
                      type="text"
                      placeholder="Size (e.g., 200g)"
                      value={size.size}
                      onChange={(e) => updateSize(index, 'size', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Weight"
                      value={size.weight}
                      onChange={(e) => updateSize(index, 'weight', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={size.price}
                      onChange={(e) => updateSize(index, 'price', parseFloat(e.target.value))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={size.stock}
                      onChange={(e) => updateSize(index, 'stock', parseInt(e.target.value))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    {editingProduct.sizes.length > 1 && (
                      <button
                        onClick={() => removeSize(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Image Manager */}
            <div>
              <ImageManager
                images={editingProduct.images || []}
                onChange={(newImages) => setEditingProduct({ ...editingProduct, images: newImages })}
                title="Product Images"
                folder={`products/${editingProduct.name || 'unnamed'}`}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-800 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Save size={20} />
              Save Product
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sizes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {product.images && product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                            <ImageIcon size={20} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.sizes?.length || 0} sizes
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ⭐ {product.rating} ({product.reviews})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-emerald-600 hover:text-emerald-900"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductsManager

