import type { AddStockMovementRepository } from '@/data/contracts/stock-movement'

export class AddStockMovementRepositoryMock
  implements AddStockMovementRepository
{
  async add(params: AddStockMovementRepository.Params): Promise<void> {}
}
