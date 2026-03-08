import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
