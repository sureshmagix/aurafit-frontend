import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { authService } from '../services/authService'
import { storage } from '../utils/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storage.get('aurafit_user'))
  const [token, setToken] = useState(storage.get('aurafit_token'))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) storage.set('aurafit_user', user)
    else storage.remove('aurafit_user')

    if (token) storage.set('aurafit_token', token)
    else storage.remove('aurafit_token')
  }, [user, token])

  const login = async (payload) => {
    setLoading(true)
    try {
      const { data } = await authService.login(payload)
      const resolvedUser = data.user || data.data?.user || data.data || null
      const resolvedToken = data.token || data.data?.token || null
      setUser(resolvedUser)
      setToken(resolvedToken)
      toast.success('Logged in successfully')
      return resolvedUser
    } catch (error) {
      toast.error(error.message || 'Login failed')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (payload) => {
    setLoading(true)
    try {
      const { data } = await authService.register(payload)
      const resolvedUser = data.user || data.data?.user || null
      const resolvedToken = data.token || data.data?.token || null
      if (resolvedUser) setUser(resolvedUser)
      if (resolvedToken) setToken(resolvedToken)
      toast.success('Account created successfully')
      return data
    } catch (error) {
      toast.error(error.message || 'Registration failed')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    toast.info('Logged out')
  }

  const refreshProfile = async () => {
    try {
      const { data } = await authService.getProfile()
      setUser(data.user || data.data || data)
    } catch {
      logout()
    }
  }

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
      refreshProfile,
      setUser,
    }),
    [user, token, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
