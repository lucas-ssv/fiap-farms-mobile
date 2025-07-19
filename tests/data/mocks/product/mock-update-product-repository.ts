import type { UpdateProductRepository } from '@/data/contracts/product'

export class UpdateProductRepositoryMock implements UpdateProductRepository {
  async update(
    productId: string,
    data: UpdateProductRepository.Params
  ): Promise<void> {}
}
