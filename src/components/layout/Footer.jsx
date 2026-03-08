function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: '4rem', padding: '3rem 0', background: '#fff' }}>
      <div className="container grid" style={{ gridTemplateColumns: '2fr 1fr 1fr', gap: '2rem' }}>
        <div>
          <div style={{ fontWeight: 900, letterSpacing: '0.08em', marginBottom: '1rem' }}>AURA FIT</div>
          <p className="helper-text">
            Minimal fashion storefront built in React + Vite and ready to connect to your Node.js + MongoDB backend.
          </p>
        </div>
        <div>
          <h4>Shop</h4>
          <p className="helper-text">New arrivals</p>
          <p className="helper-text">Men</p>
          <p className="helper-text">Women</p>
        </div>
        <div>
          <h4>Support</h4>
          <p className="helper-text">Track orders</p>
          <p className="helper-text">Returns</p>
          <p className="helper-text">Contact us</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
