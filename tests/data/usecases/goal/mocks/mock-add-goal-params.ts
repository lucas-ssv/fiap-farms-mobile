import type { AddGoal } from '@/domain/usecases/goal'

export const mockAddGoalParams = (): AddGoal.Params => ({
  productId: 'any_product_id',
  userId: 'any_user_id',
  description: 'any_description',
  targetValue: 200,
  currentValue: 100,
  startDate: new Date('2023-01-01'),
  deadline: new Date('2023-12-31'),
  status: 'in_progress',
  type: 'sales',
})
