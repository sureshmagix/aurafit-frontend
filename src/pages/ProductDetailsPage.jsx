import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/common/Loader'
import { featuredProducts } from '../data/fallbackData'
import { useCart } from '../contexts/CartContext'
import { productService } from '../services/productService'
import { calculateDiscountedPrice, formatCurrency } from '../utils/format'

function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')

  useEffect(() => {
    let active = true

    const fetchProduct = async () => {
      setLoading(true)
      try {
        const { data } = await productService.getProductById(id)
        const resolved = data.product || data.data || data
        if (active) {
          setProduct(resolved)
          setSelectedSize(resolved.sizes?.[0] || '')
        }
      } catch {
        const fallback = featuredProducts.find((item) => item._id === id) || featuredProducts[0]
        if (active) {
          setProduct(fallback)
          setSelectedSize(fallback.sizes?.[0] || '')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchProduct()
    return () => {
      active = false
    }
  }, [id])

  if (loading) return <section className="section"><div className="container"><Loader text="Loading product" /></div></section>
  if (!product) return null

  const sellingPrice = calculateDiscountedPrice(product.price, product.discountPercentage)

  return (
    <section className="section">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card" style={{ overflow: 'hidden' }}>
          <img src={product.images?.[0]} alt={product.name} style={{ width: '100%', height: 620, objectFit: 'cover' }} />
        </div>
        <div>
          <span className="badge">{product.category || 'Fashion'}</span>
          <h1 className="section-title" style={{ marginTop: '1rem' }}>{product.name}</h1>
          <p className="section-subtitle">{product.description || product.shortDescription}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.4rem' }}>
            <strong style={{ fontSize: '1.5rem' }}>{formatCurrency(sellingPrice)}</strong>
            {product.discountPercentage ? <span style={{ textDecoration: 'line-through', color: 'var(--muted)' }}>{formatCurrency(product.price)}</span> : null}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: 700 }}>Select size</p>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              {(product.sizes || ['S', 'M', 'L']).map((size) => (
                <button
                  key={size}
                  className={`btn ${selectedSize === size ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => addItem(product, 1, selectedSize)}>
              Add to cart
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/cart')}>
              View cart
            </button>
          </div>
          <div className="card" style={{ padding: '1rem', marginTop: '1.5rem' }}>
            <p><strong>Brand:</strong> {product.brand || 'Aura Fit'}</p>
            <p><strong>Stock:</strong> {product.stock || 0} available</p>
            <p><strong>Rating:</strong> {product.rating || 4.5} / 5</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailsPage
