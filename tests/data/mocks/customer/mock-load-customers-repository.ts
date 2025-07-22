import type { LoadCustomersRepository } from '@/data/contracts/customer'
import { mockCustomersResult } from './mocks'

export class LoadCustomersRepositoryStub implements LoadCustomersRepository {
  async loadAll(): Promise<LoadCustomersRepository.Result> {
    return mockCustomersResult()
  }
}
