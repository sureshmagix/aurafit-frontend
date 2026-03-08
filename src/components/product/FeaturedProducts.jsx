import Loader from '../common/Loader'
import ProductCard from './ProductCard'
import { useProducts } from '../../hooks/useProducts'

function FeaturedProducts() {
  const { products, loading, error } = useProducts({ featured: true, limit: 8 })

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Featured drops</h2>
        <p className="section-subtitle">Connect this to your products API and featured flag once the backend fields are finalized.</p>
        {error ? <p className="helper-text">{error}</p> : null}
        {loading ? (
          <Loader text="Loading featured products" />
        ) : (
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedProducts
