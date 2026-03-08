import { Trash2 } from 'lucide-react'
import { calculateDiscountedPrice, formatCurrency } from '../../utils/format'

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const unitPrice = calculateDiscountedPrice(item.price, item.discountPercentage)

  return (
    <div className="card" style={{ padding: '1rem', display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: '1rem', alignItems: 'center' }}>
      <img src={item.image} alt={item.name} style={{ width: 100, height: 120, objectFit: 'cover', borderRadius: 18 }} />
      <div>
        <h3 style={{ margin: '0 0 0.4rem' }}>{item.name}</h3>
        <p className="helper-text" style={{ margin: '0 0 0.4rem' }}>Size: {item.selectedSize || 'Standard'}</p>
        <strong>{formatCurrency(unitPrice)}</strong>
      </div>
      <div style={{ display: 'grid', gap: '0.6rem', justifyItems: 'end' }}>
        <input
          className="input"
          type="number"
          min="1"
          style={{ width: 90 }}
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
        />
        <button className="btn btn-secondary" onClick={() => onRemove(item.id)}>
          <Trash2 size={18} /> Remove
        </button>
      </div>
    </div>
  )
}

export default CartItem
