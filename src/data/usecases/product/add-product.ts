import type {
  AddProductRepository,
  UpdateProductRepository,
} from '@/data/contracts/product'
import type { UploadService } from '@/data/contracts/services'
import type { AddStockMovementRepository } from '@/data/contracts/stock-movement'
import type { AddProduct } from '@/domain/usecases/product'

export class AddProductImpl implements AddProduct {
  private addProductRepository: AddProductRepository
  private uploadService: UploadService
  private updateProductRepository: UpdateProductRepository
  private addStockMovementRepository: AddStockMovementRepository

  constructor(
    addProductRepository: AddProductRepository,
    uploadService: UploadService,
    updateProductRepository: UpdateProductRepository,
    addStockMovementRepository: AddStockMovementRepository
  ) {
    this.addProductRepository = addProductRepository
    this.uploadService = uploadService
    this.updateProductRepository = updateProductRepository
    this.addStockMovementRepository = addStockMovementRepository
  }

  async execute(data: AddProduct.Params): Promise<void> {
    const { image, ...dataWithoutImage } = data
    const productId = await this.addProductRepository.add(dataWithoutImage)
    if (image) {
      const { url } = await this.uploadService.upload(image, 'products')
      await this.updateProductRepository.update(productId, {
        image: url,
      })
    }
    await this.addStockMovementRepository.add({
      productId,
      userId: data.userId,
      type: 'input',
      quantity: data.stock,
      date: new Date(),
      reason: 'Produto adicionado',
    })
  }
}
