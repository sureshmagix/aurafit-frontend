import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function RegisterPage() {
  const { register: field, handleSubmit, watch, formState: { errors } } = useForm()
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    await register(values)
    navigate('/')
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 560 }}>
        <div className="card" style={{ padding: '2rem' }}>
          <h1 className="section-title">Create Aura Fit account</h1>
          <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input className="input" placeholder="Full name" {...field('name', { required: 'Name is required' })} />
              {errors.name ? <p className="error-text">{errors.name.message}</p> : null}
            </div>
            <div>
              <input className="input" placeholder="Email" {...field('email', { required: 'Email is required' })} />
              {errors.email ? <p className="error-text">{errors.email.message}</p> : null}
            </div>
            <div>
              <input className="input" placeholder="Mobile" {...field('phone')} />
            </div>
            <div>
              <input className="input" type="password" placeholder="Password" {...field('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })} />
              {errors.password ? <p className="error-text">{errors.password.message}</p> : null}
            </div>
            <div>
              <input className="input" type="password" placeholder="Confirm password" {...field('confirmPassword', { validate: (value) => value === watch('password') || 'Passwords do not match' })} />
              {errors.confirmPassword ? <p className="error-text">{errors.confirmPassword.message}</p> : null}
            </div>
            <button className="btn btn-primary" disabled={loading} type="submit">{loading ? 'Please wait...' : 'Register'}</button>
          </form>
          <p className="helper-text">Already have an account? <Link to="/login" style={{ fontWeight: 700 }}>Login</Link></p>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage
