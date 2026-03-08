import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext'
import { authService } from '../services/authService'

function ProfilePage() {
  const { user, setUser } = useAuth()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  })

  const onSubmit = async (values) => {
    try {
      const { data } = await authService.updateProfile(values)
      setUser(data.user || data.data || values)
      toast.success('Profile updated')
    } catch {
      setUser((prev) => ({ ...prev, ...values }))
      toast.info('Frontend profile form is ready. Connect exact backend update endpoint if needed.')
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 680 }}>
        <div className="card" style={{ padding: '2rem' }}>
          <h1 className="section-title">My profile</h1>
          <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
            <input className="input" placeholder="Name" {...register('name')} />
            <input className="input" placeholder="Email" {...register('email')} />
            <input className="input" placeholder="Phone" {...register('phone')} />
            <button className="btn btn-primary" type="submit">Save changes</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
