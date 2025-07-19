import type { LoadStockMovementsByProductIdRepository } from '@/data/contracts/stock-movement/load-stock-movements-by-product-id-repository'
import { mockStockMovementsResult } from './mocks'

export class LoadStockMovementsByProductIdRepositoryMock
  implements LoadStockMovementsByProductIdRepository
{
  async loadAll(
    productId: string
  ): Promise<LoadStockMovementsByProductIdRepository.Result> {
    return mockStockMovementsResult()
  }
}
