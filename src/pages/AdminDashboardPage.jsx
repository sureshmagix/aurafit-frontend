function AdminDashboardPage() {
  const metrics = [
    { label: 'Total sales', value: '₹1,24,500' },
    { label: 'Orders', value: '186' },
    { label: 'Products', value: '48' },
    { label: 'Customers', value: '932' },
  ]

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Admin dashboard</h1>
        <p className="section-subtitle">This is a starter admin view for later product, order, and user management screens.</p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {metrics.map((item) => (
            <article key={item.label} className="card" style={{ padding: '1.5rem' }}>
              <p className="helper-text">{item.label}</p>
              <h2 style={{ margin: 0 }}>{item.value}</h2>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdminDashboardPage
