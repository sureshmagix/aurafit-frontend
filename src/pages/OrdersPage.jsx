import { useEffect, useState } from 'react'
import EmptyState from '../components/common/EmptyState'
import Loader from '../components/common/Loader'
import { orderService } from '../services/orderService'
import { formatCurrency } from '../utils/format'

function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const fetchOrders = async () => {
      try {
        const { data } = await orderService.getMyOrders()
        if (active) setOrders(data.orders || data.data || [])
      } catch {
        if (active) setOrders([])
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchOrders()
    return () => { active = false }
  }, [])

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">My orders</h1>
        {loading ? (
          <Loader text="Loading orders" />
        ) : orders.length ? (
          <div className="grid">
            {orders.map((order) => (
              <article key={order._id} className="card" style={{ padding: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ margin: 0 }}>Order #{order._id?.slice(-6)}</h3>
                    <p className="helper-text">Status: {order.status || order.orderStatus || 'Placed'}</p>
                  </div>
                  <strong>{formatCurrency(order.totalPrice || order.total || 0)}</strong>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No orders yet" description="Orders placed from checkout will appear here." />
        )}
      </div>
    </section>
  )
}

export default OrdersPage
