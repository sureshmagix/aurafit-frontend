import axios from 'axios'
import { storage } from '../utils/storage'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = storage.get('aurafit_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data || error),
)

export default api
