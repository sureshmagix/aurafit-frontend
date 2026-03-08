export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))

export const calculateDiscountedPrice = (price, discountPercentage = 0) => {
  const amount = Number(price || 0)
  const discount = Number(discountPercentage || 0)
  return amount - amount * (discount / 100)
}
