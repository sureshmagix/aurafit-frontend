import { createContext, useContext, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { cartService } from '../services/cartService'
import { storage } from '../utils/storage'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(storage.get('aurafit_cart', []))
  const [loading, setLoading] = useState(false)

  const persist = (items) => {
    setCartItems(items)
    storage.set('aurafit_cart', items)
  }

  const addItem = async (product, quantity = 1, selectedSize = '') => {
    const existing = cartItems.find((item) => item.productId === product._id && item.selectedSize === selectedSize)
    const updated = existing
      ? cartItems.map((item) =>
          item.productId === product._id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      : [
          ...cartItems,
          {
            id: `${product._id}-${selectedSize || 'default'}`,
            productId: product._id,
            name: product.name,
            image: product.images?.[0],
            price: product.price,
            discountPercentage: product.discountPercentage || 0,
            quantity,
            selectedSize,
          },
        ]

    persist(updated)
    toast.success('Added to cart')

    try {
      await cartService.addToCart({ productId: product._id, quantity, size: selectedSize })
    } catch {
      // local cart remains available even if backend cart is not ready
    }
  }

  const updateQuantity = async (itemId, quantity) => {
    const safeQuantity = Math.max(1, quantity)
    const updated = cartItems.map((item) => (item.id === itemId ? { ...item, quantity: safeQuantity } : item))
    persist(updated)

    try {
      await cartService.updateCartItem(itemId, { quantity: safeQuantity })
    } catch {
      // ignore backend mismatch for local-first flow
    }
  }

  const removeItem = async (itemId) => {
    const updated = cartItems.filter((item) => item.id !== itemId)
    persist(updated)
    try {
      await cartService.removeCartItem(itemId)
    } catch {
      // ignore
    }
  }

  const clearCart = async () => {
    persist([])
    try {
      await cartService.clearCart()
    } catch {
      // ignore
    }
  }

  const summary = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    return { subtotal, itemsCount, shipping: subtotal > 1999 ? 0 : 99, total: subtotal + (subtotal > 1999 ? 0 : 99) }
  }, [cartItems])

  const value = useMemo(
    () => ({ cartItems, loading, addItem, updateQuantity, removeItem, clearCart, summary }),
    [cartItems, loading, summary],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
