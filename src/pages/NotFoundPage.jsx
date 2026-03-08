import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 560 }}>
        <div className="card empty-state">
          <h1 className="section-title">Page not found</h1>
          <p className="section-subtitle">The page you are looking for does not exist.</p>
          <Link className="btn btn-primary" to="/">Go home</Link>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
