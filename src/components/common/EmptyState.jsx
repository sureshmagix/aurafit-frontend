function EmptyState({ title, description, action }) {
  return (
    <div className="card empty-state">
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  )
}

export default EmptyState
