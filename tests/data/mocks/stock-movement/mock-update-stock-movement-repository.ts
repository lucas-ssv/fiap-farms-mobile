import type { UpdateStockMovementRepository } from '@/data/contracts/stock-movement'

export class UpdateStockMovementRepositoryMock
  implements UpdateStockMovementRepository
{
  async update(
    type: 'input' | 'output',
    productId: string,
    quantity: number
  ): Promise<void> {}
}
