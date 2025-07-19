import type { UserModel } from '@/domain/models/account'
import type { ProductModel } from '@/domain/models/product'

export interface AlertModel {
  id: string
  user: Omit<UserModel, 'password' | 'userUID'>
  product: ProductModel
  type: 'sales' | 'production'
  message: string
  read: boolean
  createdAt: Date
  updatedAt: Date
}
