import { useState } from 'react'
import './ContactPage.css'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDownloadCatalog = () => {
    const catalogUrl = 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg'
    const link = document.createElement('a')
    link.href = catalogUrl
    link.download = 'HomeDecor-Catalog-2025.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="contact-page">
      <section className="contact-header">
        <div className="header-content">
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-subtitle">
            Have questions or want to learn more? We'd love to hear from you
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="info-heading">Contact Information</h2>
              <div className="info-items">
                <div className="info-item">
                  <h3 className="info-label">Email</h3>
                  <p className="info-value">hello@homedecor.com</p>
                </div>
                <div className="info-item">
                  <h3 className="info-label">Phone</h3>
                  <p className="info-value">+1 (555) 123-4567</p>
                </div>
                <div className="info-item">
                  <h3 className="info-label">Address</h3>
                  <p className="info-value">123 Design Street<br />New York, NY 10001</p>
                </div>
              </div>

              <div className="catalog-section">
                <h3 className="catalog-heading">Download Our Catalog</h3>
                <p className="catalog-text">
                  Get the complete collection of our products in a downloadable catalog
                </p>
                <button onClick={handleDownloadCatalog} className="download-button">
                  Download Catalog
                </button>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h2 className="form-heading">Send Us a Message</h2>
              {submitted && (
                <div className="success-message">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="form-textarea"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
