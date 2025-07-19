import type { AddProductionRepository } from '@/data/contracts/production'

export class AddProductionRepositoryMock implements AddProductionRepository {
  async add(params: AddProductionRepository.Params): Promise<void> {}
}
