import type { LoadCategoriesRepository } from '@/data/contracts/category'
import { mockCategoriesResult } from './mocks'

export class LoadCategoriesRepositoryStub implements LoadCategoriesRepository {
  async loadAll(): Promise<LoadCategoriesRepository.Result> {
    return mockCategoriesResult()
  }
}
