import type { AddProduction } from '@/domain/usecases/production'

export const mockAddProductionParams = (): AddProduction.Params => ({
  productId: 'any_product_id',
  userId: 'any_user_id',
  quantity: 100,
  quantityProduced: 100,
  status: 'in_production',
  unit: 'kg',
  harvestDate: new Date('2023-01-01'),
  startDate: new Date('2023-01-01'),
})
