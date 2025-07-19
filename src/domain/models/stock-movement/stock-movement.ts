import type { ProductModel } from '@/domain/models/product'
import type { UserModel } from '../account'

export interface StockMovementModel {
  id: string
  product: ProductModel
  user: Omit<UserModel, 'password' | 'userUID'>
  type: 'input' | 'output'
  quantity: number
  date: Date
  reason?: string
  createdAt: Date
  updatedAt: Date
}
