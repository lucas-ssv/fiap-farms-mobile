import type { AddStockMovement } from '@/domain/usecases/stock-movement'

export const mockAddStockMovementParams = (): AddStockMovement.Params => ({
  productId: 'any_product_id',
  userId: 'any_user_id',
  quantity: 10,
  type: 'input',
  date: new Date(),
  reason: 'any_reason',
})
