import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase, Product } from '../lib/supabase'
import { Spotlight } from '../components/ui/Spotlight'
import { HoverCard } from '../components/ui/HoverCard'
import './HomePage.css'

function HomePage() {
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
        .limit(3)
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
    <div className="home-page">
      <section className="hero relative overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#3b82f6" />
        <div className="hero-content relative z-10">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform Your Space
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover premium bedsheets and home decor that bring comfort and style to every room
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/products" className="cta-button">
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="products-grid">
              {products.map((product, index) => (
                <HoverCard key={product.id}>
                  <motion.div
                    className="product-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="product-image-wrapper">
                      <img src={product.image_url} alt={product.name} className="product-image" />
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      <p className="product-price">${product.price}</p>
                    </div>
                  </motion.div>
                </HoverCard>
              ))}
            </div>
          )}
          <div className="view-all-wrapper">
            <Link to="/products" className="view-all-link">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <div className="info-grid">
            {[
              {
                title: "Premium Quality",
                text: "Carefully crafted with the finest materials for lasting comfort and durability"
              },
              {
                title: "Modern Designs",
                text: "Contemporary patterns and colors to match any interior style"
              },
              {
                title: "Customer Satisfaction",
                text: "Dedicated to providing exceptional service and quality products"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="info-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h3 className="info-title">{item.title}</h3>
                <p className="info-text">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
