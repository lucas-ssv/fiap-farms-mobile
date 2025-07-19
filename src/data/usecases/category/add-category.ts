import type {
  AddCategoryRepository,
  UpdateCategoryRepository,
} from '@/data/contracts/category'
import type { UploadService } from '@/data/contracts/services'
import type { AddCategory } from '@/domain/usecases/category'

export class AddCategoryImpl implements AddCategory {
  private addCategoryRepository: AddCategoryRepository
  private uploadService: UploadService
  private updateCategoryRepository: UpdateCategoryRepository

  constructor(
    addCategoryRepository: AddCategoryRepository,
    uploadService: UploadService,
    updateCategoryRepository: UpdateCategoryRepository
  ) {
    this.addCategoryRepository = addCategoryRepository
    this.uploadService = uploadService
    this.updateCategoryRepository = updateCategoryRepository
  }

  async execute(data: AddCategory.Params): Promise<void> {
    const { image, ...dataWithoutImage } = data
    const categoryId = await this.addCategoryRepository.add(dataWithoutImage)
    if (image) {
      const { url } = await this.uploadService.upload(image, 'categories')
      await this.updateCategoryRepository.update(categoryId, {
        image: url,
      })
    }
  }
}
