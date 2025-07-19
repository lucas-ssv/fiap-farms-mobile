import type { UpdateCategoryRepository } from '@/data/contracts/category'

export class UpdateCategoryRepositoryMock implements UpdateCategoryRepository {
  async update(
    categoryId: string,
    data: UpdateCategoryRepository.Params
  ): Promise<void> {}
}
