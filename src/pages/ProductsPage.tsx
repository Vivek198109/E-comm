import { useEffect, useState } from 'react'
import { supabase, Product } from '../lib/supabase'
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
          <h1 className="page-title">Our Collection</h1>
          <p className="page-subtitle">
            Browse our premium selection of bedsheets and home decor
          </p>
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
              {products.map((product) => (
                <div key={product.id} className="product-card">
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
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ProductsPage
