import type { UpdateCategoryRepository } from '@/data/contracts/category'
import type { UploadService } from '@/data/contracts/services'
import type { UpdateCategory } from '@/domain/usecases/category'

export class UpdateCategoryImpl implements UpdateCategory {
  private updateCategoryRepository: UpdateCategoryRepository
  private uploadService: UploadService

  constructor(updateCategoryRepository: UpdateCategoryRepository, uploadService: UploadService) {
    this.updateCategoryRepository = updateCategoryRepository
    this.uploadService = uploadService
  }

  async execute(
    categoryId: string,
    data: UpdateCategory.Params
  ): Promise<void> {
    if (data.image) {
      const { url } = await this.uploadService.upload(data.image as string, 'categories')
      data.image = url
    }
    await this.updateCategoryRepository.update(categoryId, data)
  }
}
