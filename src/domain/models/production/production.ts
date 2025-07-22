import type { ProductModel } from '@/domain/models/product'

export interface ProductionModel {
  id: string
  product: ProductModel
  status: 'in_production' | 'waiting' | 'harvested'
  quantity: number
  quantityProduced: number
  unit: string
  startDate: Date
  harvestDate: Date
  createdAt: Date
  updatedAt: Date
}
