import api from './api'

export const authService = {
  register(payload) {
    return api.post('/auth/register', payload)
  },
  login(payload) {
    return api.post('/auth/login', payload)
  },
  getProfile() {
    return api.get('/users/profile')
  },
  updateProfile(payload) {
    return api.put('/users/profile', payload)
  },
}
