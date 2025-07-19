import type { AddSale } from '@/domain/usecases/sale'

export const mockAddSaleParams = (): AddSale.Params => ({
  productId: 'any_product_id',
  customerId: 'any_customer_id',
  userId: 'any_user_id',
  quantity: 2,
  saleDate: new Date('2023-10-01'),
  totalPrice: 100,
  unitPrice: 50,
  discount: 0,
  paymentMethod: 'Credit Card',
  status: 'pending',
  unit: 'kg',
  observations: 'First sale of the month',
})
