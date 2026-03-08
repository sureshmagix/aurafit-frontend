import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../components/cart/CartItem'
import EmptyState from '../components/common/EmptyState'
import { useCart } from '../contexts/CartContext'
import { formatCurrency } from '../utils/format'

function CartPage() {
  const { cartItems, updateQuantity, removeItem, clearCart, summary } = useCart()
  const navigate = useNavigate()

  if (!cartItems.length) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            title="Your cart is empty"
            description="Add products from the shop and they will appear here."
            action={<Link className="btn btn-primary" to="/shop">Continue shopping</Link>}
          />
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '2rem' }}>
        <div className="grid">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
          ))}
        </div>

        <aside className="card" style={{ padding: '1.5rem', height: 'fit-content' }}>
          <h2 style={{ marginTop: 0 }}>Order summary</h2>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Items</span><span>{summary.itemsCount}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span>{formatCurrency(summary.subtotal)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Shipping</span><span>{summary.shipping ? formatCurrency(summary.shipping) : 'Free'}</span></div>
            <hr style={{ border: 0, borderTop: '1px solid var(--border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}><span>Total</span><span>{formatCurrency(summary.total)}</span></div>
          </div>
          <div style={{ display: 'grid', gap: '0.8rem', marginTop: '1.2rem' }}>
            <button className="btn btn-primary" onClick={() => navigate('/checkout')}>Proceed to checkout</button>
            <button className="btn btn-secondary" onClick={clearCart}>Clear cart</button>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default CartPage
