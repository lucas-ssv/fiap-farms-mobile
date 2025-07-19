import type { UpdateProductRepository } from '@/data/contracts/product'
import type { UploadService } from '@/data/contracts/services'
import type { UpdateProduct } from '@/domain/usecases/product'

export class UpdateProductImpl implements UpdateProduct {
  private uploadService: UploadService
  private updateProductRepository: UpdateProductRepository

  constructor(
    uploadService: UploadService,
    updateProductRepository: UpdateProductRepository
  ) {
    this.updateProductRepository = updateProductRepository
    this.uploadService = uploadService
  }

  async execute(productId: string, data: UpdateProduct.Params): Promise<void> {
    if (data.image) {
      const { url } = await this.uploadService.upload(data.image as string, 'products')
      data.image = url
    }
    await this.updateProductRepository.update(productId, data)
  }
}
