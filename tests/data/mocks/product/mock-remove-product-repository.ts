import type { RemoveProductRepository } from '@/data/contracts/product'

export class RemoveProductRepositoryMock implements RemoveProductRepository {
  async remove(productId: string): Promise<void> {}
}
