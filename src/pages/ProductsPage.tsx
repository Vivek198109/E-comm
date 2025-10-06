import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase, Product } from '../lib/supabase'
import { HoverCard } from '../components/ui/HoverCard'
import { BackgroundGradient } from '../components/ui/BackgroundGradient'
import './ProductsPage.css'

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="products-page">
      <section className="products-header">
        <div className="header-content">
          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Collection
          </motion.h1>
          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Browse our premium selection of bedsheets and home decor
          </motion.p>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="empty-state">No products available at the moment.</div>
          ) : (
            <div className="products-grid">
              {products.map((product, index) => (
                <HoverCard key={product.id}>
                  <BackgroundGradient className="rounded-3xl p-0 bg-white dark:bg-zinc-900">
                    <motion.div
                      className="product-card"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <div className="product-image-wrapper">
                        <img src={product.image_url} alt={product.name} className="product-image" />
                        <div className="product-overlay">
                          <span className="category-badge">{product.category}</span>
                        </div>
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-description">{product.description}</p>
                        <div className="product-footer">
                          <p className="product-price">${product.price}</p>
                        </div>
                      </div>
                    </motion.div>
                  </BackgroundGradient>
                </HoverCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ProductsPage
