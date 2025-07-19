import type { ProductModel } from '@/domain/models/product'
import type { UserModel } from '@/domain/models/account'

export interface GoalModel {
  id: string
  product: ProductModel
  user: Omit<UserModel, 'password' | 'userUID'>
  description?: string
  type: 'sales' | 'production'
  status: 'in_progress' | 'done' | 'active' | 'inactive'
  targetValue: number
  currentValue: number
  startDate: Date
  deadline: Date
  createdAt: Date
  updatedAt: Date
}
