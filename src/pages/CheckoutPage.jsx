import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { orderService } from '../services/orderService'
import { formatCurrency } from '../utils/format'

function CheckoutPage() {
  const { user } = useAuth()
  const { cartItems, summary, clearCart } = useCart()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      paymentMethod: 'COD',
    },
  })
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const payload = {
      shippingAddress: values,
      paymentMethod: values.paymentMethod,
      orderItems: cartItems.map((item) => ({
        product: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.selectedSize,
      })),
      totalPrice: summary.total,
    }

    try {
      await orderService.createOrder(payload)
      toast.success('Order placed successfully')
    } catch {
      toast.info('Backend order endpoint not fully connected yet, but checkout UI is ready.')
    }

    await clearCart()
    navigate('/orders')
  }

  return (
    <section className="section">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h1 className="section-title">Checkout</h1>
          <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
            <input className="input" placeholder="Full name" {...register('name')} />
            <input className="input" placeholder="Email" {...register('email')} />
            <input className="input" placeholder="Phone" {...register('phone')} />
            <input className="input" placeholder="Address line 1" {...register('addressLine1')} />
            <input className="input" placeholder="Address line 2" {...register('addressLine2')} />
            <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
              <input className="input" placeholder="City" {...register('city')} />
              <input className="input" placeholder="State" {...register('state')} />
              <input className="input" placeholder="Pincode" {...register('pincode')} />
            </div>
            <select className="select" {...register('paymentMethod')}>
              <option value="COD">Cash on Delivery</option>
              <option value="ONLINE">Online Payment</option>
            </select>
            <button className="btn btn-primary" type="submit">Place order</button>
          </form>
        </div>
        <aside className="card" style={{ padding: '1.5rem', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0 }}>Payable amount</h3>
          <p style={{ fontSize: '2rem', fontWeight: 800 }}>{formatCurrency(summary.total)}</p>
          <p className="helper-text">Shipping is free above ₹1,999. You can later connect Razorpay or any gateway here.</p>
        </aside>
      </div>
    </section>
  )
}

export default CheckoutPage
