import type { LoadByProductIdRepository } from '@/data/contracts/product'
import { mockProductsResult } from './mocks'

export class LoadByProductIdRepositoryMock
  implements LoadByProductIdRepository
{
  async loadByProductId(
    productId: string
  ): Promise<LoadByProductIdRepository.Result> {
    return mockProductsResult()[0]
  }
}
