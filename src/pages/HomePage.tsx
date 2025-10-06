import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, Product } from '../lib/supabase'
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
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Transform Your Space</h1>
          <p className="hero-subtitle">
            Discover premium bedsheets and home decor that bring comfort and style to every room
          </p>
          <Link to="/products" className="cta-button">
            Explore Collection
          </Link>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-wrapper">
                    <img src={product.image_url} alt={product.name} className="product-image" />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">${product.price}</p>
                  </div>
                </div>
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
            <div className="info-card">
              <h3 className="info-title">Premium Quality</h3>
              <p className="info-text">
                Carefully crafted with the finest materials for lasting comfort and durability
              </p>
            </div>
            <div className="info-card">
              <h3 className="info-title">Modern Designs</h3>
              <p className="info-text">
                Contemporary patterns and colors to match any interior style
              </p>
            </div>
            <div className="info-card">
              <h3 className="info-title">Customer Satisfaction</h3>
              <p className="info-text">
                Dedicated to providing exceptional service and quality products
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
