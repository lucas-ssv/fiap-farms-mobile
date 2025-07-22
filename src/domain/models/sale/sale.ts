import type { ProductModel } from '@/domain/models/product'
import type { CustomerModel } from '@/domain/models/customer'
import type { UserModel } from '@/domain/models/account'

export interface SaleModel {
  id: string
  product: ProductModel
  customer?: CustomerModel
  user: Omit<UserModel, 'password'>
  quantity: number
  saleDate: Date
  totalPrice: number
  unitPrice: number
  unit: string
  discount?: number
  status: 'pending' | 'completed' | 'cancelled'
  paymentMethod: string
  observations?: string
  createdAt: Date
  updatedAt: Date
}
