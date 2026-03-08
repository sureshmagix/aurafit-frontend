import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <section className="section">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '2rem', alignItems: 'center' }}>
        <div>
          <span className="badge">New season • Aura Fit</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', marginTop: '1rem' }}>
            Wear confidence.
            <br />
            Move in comfort.
          </h1>
          <p className="section-subtitle">
            A premium apparel experience inspired by clean modern layouts like Zudio, but built for your Aura Fit brand and backend flow.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link className="btn btn-primary" to="/shop">
              Shop now <ArrowRight size={18} />
            </Link>
            <Link className="btn btn-secondary" to="/register">
              Create account
            </Link>
          </div>
        </div>
        <div className="card" style={{ overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
            alt="Aura Fit hero"
            style={{ width: '100%', height: '100%', minHeight: 520, objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
