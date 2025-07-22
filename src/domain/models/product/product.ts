import type { CategoryModel } from '@/domain/models/category'

export interface ProductModel {
  id: string
  name: string
  price: number
  cost: number
  category: CategoryModel
  stock: number
  minStock?: number
  maxStock?: number
  unit: string
  description?: string
  image?: string
  createdAt: Date
  updatedAt: Date
}
