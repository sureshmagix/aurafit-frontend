import { useEffect, useState } from 'react'
import { featuredProducts } from '../data/fallbackData'
import { productService } from '../services/productService'

export function useProducts(params = {}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const fetchProducts = async () => {
      setLoading(true)
      try {
        const { data } = await productService.getProducts(params)
        const resolved = data.products || data.data?.products || data.data || []
        if (active) {
          setProducts(Array.isArray(resolved) && resolved.length ? resolved : featuredProducts)
          setError('')
        }
      } catch {
        if (active) {
          setProducts(featuredProducts)
          setError('Showing fallback products until backend list is connected.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchProducts()
    return () => {
      active = false
    }
  }, [JSON.stringify(params)])

  return { products, loading, error }
}
