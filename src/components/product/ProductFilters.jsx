import { SORT_OPTIONS } from '../../utils/constants'

function ProductFilters({ filters, onChange, categories = [] }) {
  return (
    <div className="card" style={{ padding: '1rem', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
      <input
        className="input"
        placeholder="Search product"
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
      />
      <select className="select" value={filters.category} onChange={(e) => onChange({ ...filters, category: e.target.value })}>
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <select className="select" value={filters.sort} onChange={(e) => onChange({ ...filters, sort: e.target.value })}>
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default ProductFilters
