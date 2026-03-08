import api from './api'

export const cartService = {
  getCart() {
    return api.get('/cart')
  },
  addToCart(payload) {
    return api.post('/cart', payload)
  },
  updateCartItem(itemId, payload) {
    return api.put(`/cart/${itemId}`, payload)
  },
  removeCartItem(itemId) {
    return api.delete(`/cart/${itemId}`)
  },
  clearCart() {
    return api.delete('/cart')
  },
}
