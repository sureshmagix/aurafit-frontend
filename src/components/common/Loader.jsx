function Loader({ text = 'Loading...' }) {
  return (
    <div className="empty-state card" style={{ padding: '3rem' }}>
      <div style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Aura Fit</div>
      <div>{text}</div>
    </div>
  )
}

export default Loader
