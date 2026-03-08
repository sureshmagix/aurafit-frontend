import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit = async (values) => {
    await login(values)
    navigate(location.state?.from || '/')
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 480 }}>
        <div className="card" style={{ padding: '2rem' }}>
          <h1 className="section-title">Welcome back</h1>
          <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input className="input" placeholder="Email" {...register('email', { required: 'Email is required' })} />
              {errors.email ? <p className="error-text">{errors.email.message}</p> : null}
            </div>
            <div>
              <input className="input" type="password" placeholder="Password" {...register('password', { required: 'Password is required' })} />
              {errors.password ? <p className="error-text">{errors.password.message}</p> : null}
            </div>
            <button className="btn btn-primary" disabled={loading} type="submit">{loading ? 'Please wait...' : 'Login'}</button>
          </form>
          <p className="helper-text">New user? <Link to="/register" style={{ fontWeight: 700 }}>Create an account</Link></p>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
