import type { AddProductRepository } from '@/data/contracts/product'

export class AddProductRepositoryMock implements AddProductRepository {
  async add(
    data: AddProductRepository.Params
  ): Promise<AddProductRepository.ProductId> {
    return 'any_product_id'
  }
}
