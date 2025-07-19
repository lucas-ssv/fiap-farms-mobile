import type { LoadProductsRepository } from '@/data/contracts/product'
import type { LoadProducts } from '@/domain/usecases/product'

export class LoadProductsImpl implements LoadProducts {
  private loadProductsRepository: LoadProductsRepository

  constructor(loadProductsRepository: LoadProductsRepository) {
    this.loadProductsRepository = loadProductsRepository
  }

  async execute(): Promise<LoadProducts.Result> {
    return await this.loadProductsRepository.loadAll()
  }
}
