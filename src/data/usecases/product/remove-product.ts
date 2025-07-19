import type { RemoveProductRepository } from '@/data/contracts/product'
import type { RemoveStockMovementRepository } from '@/data/contracts/stock-movement'
import type { RemoveProduct } from '@/domain/usecases/product'

export class RemoveProductImpl implements RemoveProduct {
  private removeProductRepository: RemoveProductRepository
  private removeStockMovementRepository: RemoveStockMovementRepository

  constructor(
    removeProductRepository: RemoveProductRepository,
    removeStockMovementRepository: RemoveStockMovementRepository
  ) {
    this.removeProductRepository = removeProductRepository
    this.removeStockMovementRepository = removeStockMovementRepository
  }

  async execute(productId: string): Promise<void> {
    await this.removeProductRepository.remove(productId)
    await this.removeStockMovementRepository.removeByProductId(productId)
  }
}
