import { Link } from 'react-router-dom'
import { calculateDiscountedPrice, formatCurrency } from '../../utils/format'

function ProductCard({ product }) {
  const sellingPrice = calculateDiscountedPrice(product.price, product.discountPercentage)

  return (
    <article className="card" style={{ overflow: 'hidden' }}>
      <Link to={`/products/${product._id}`}>
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/600x700?text=Aura+Fit'}
          alt={product.name}
          style={{ height: 340, width: '100%', objectFit: 'cover' }}
        />
      </Link>
      <div style={{ padding: '1rem' }}>
        <p className="helper-text" style={{ margin: '0 0 0.35rem' }}>{product.category?.name || (typeof product.category === 'string' ? product.category : 'Fashion')}</p>
        <h3 style={{ margin: '0 0 0.45rem', fontSize: '1.05rem' }}>{product.name}</h3>
        <p className="helper-text" style={{ margin: '0 0 1rem' }}>{product.shortDescription || 'Premium Aura Fit apparel.'}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <strong>{formatCurrency(sellingPrice)}</strong>
          {product.discountPercentage ? (
            <>
              <span style={{ textDecoration: 'line-through', color: 'var(--muted)' }}>{formatCurrency(product.price)}</span>
              <span className="badge">{product.discountPercentage}% OFF</span>
            </>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default ProductCard
