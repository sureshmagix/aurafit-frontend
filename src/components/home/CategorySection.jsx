const categories = [
  { title: 'Men', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80' },
  { title: 'Women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80' },
  { title: 'Athleisure', image: 'https://images.unsplash.com/photo-1506629905607-d9e11b0f3b6c?auto=format&fit=crop&w=900&q=80' },
]

function CategorySection() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Shop by category</h2>
        <p className="section-subtitle">Build your catalog sections here and later map them to live backend categories.</p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {categories.map((item) => (
            <article key={item.title} className="card" style={{ overflow: 'hidden' }}>
              <img src={item.image} alt={item.title} style={{ height: 300, width: '100%', objectFit: 'cover' }} />
              <div style={{ padding: '1.2rem' }}>
                <h3 style={{ margin: 0 }}>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
