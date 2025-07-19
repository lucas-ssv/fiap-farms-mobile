import type { RemoveStockMovementRepository } from '@/data/contracts/stock-movement'

export class RemoveStockMovementRepositoryMock
  implements RemoveStockMovementRepository
{
  async removeByProductId(productId: string): Promise<void> {}
}
