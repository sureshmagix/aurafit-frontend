import { useMemo, useState } from 'react'
import EmptyState from '../components/common/EmptyState'
import Loader from '../components/common/Loader'
import ProductCard from '../components/product/ProductCard'
import ProductFilters from '../components/product/ProductFilters'
import { useProducts } from '../hooks/useProducts'

function ShopPage() {
  const [filters, setFilters] = useState({ search: '', category: '', sort: 'latest' })
  const { products, loading, error } = useProducts()

  const categories = useMemo(() => [...new Set(products.map((item) => item.category).filter(Boolean))], [products])

  const filteredProducts = useMemo(() => {
    let output = [...products]

    if (filters.search) {
      output = output.filter((item) => item.name.toLowerCase().includes(filters.search.toLowerCase()))
    }

    if (filters.category) {
      output = output.filter((item) => item.category === filters.category)
    }

    if (filters.sort === 'price_asc') output.sort((a, b) => a.price - b.price)
    if (filters.sort === 'price_desc') output.sort((a, b) => b.price - a.price)
    if (filters.sort === 'name_asc') output.sort((a, b) => a.name.localeCompare(b.name))

    return output
  }, [products, filters])

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Shop Aura Fit</h1>
        <p className="section-subtitle">This page is ready for live products, category filters, and search.</p>
        {error ? <p className="helper-text">{error}</p> : null}
        <ProductFilters filters={filters} onChange={setFilters} categories={categories} />
        <div style={{ height: '1.5rem' }} />
        {loading ? (
          <Loader text="Loading products" />
        ) : filteredProducts.length ? (
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState title="No products found" description="Try changing search or category filters." />
        )}
      </div>
    </section>
  )
}

export default ShopPage
