import api from './api'

export const productService = {
  getProducts(params) {
    return api.get('/products', { params })
  },
  getProductById(id) {
    return api.get(`/products/${id}`)
  },
  getCategories() {
    return api.get('/categories')
  },
}
