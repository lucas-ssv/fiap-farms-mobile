import type { AddCategoryRepository } from '@/data/contracts/category'

export class AddCategoryRepositoryMock implements AddCategoryRepository {
  async add(
    data: AddCategoryRepository.Params
  ): Promise<AddCategoryRepository.CategoryId> {
    return 'any_id'
  }
}
