import type { LoadProductsRepository } from '@/data/contracts/product'
import { mockProductsResult } from './mocks'

export class LoadProductsRepositoryStub implements LoadProductsRepository {
  async loadAll(): Promise<LoadProductsRepository.Result> {
    return mockProductsResult()
  }
}
