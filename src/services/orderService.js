import api from './api'

export const orderService = {
  createOrder(payload) {
    return api.post('/orders', payload)
  },
  getMyOrders() {
    return api.get('/orders/my-orders')
  },
  getOrderById(id) {
    return api.get(`/orders/${id}`)
  },
}
