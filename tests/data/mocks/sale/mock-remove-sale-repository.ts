import type { RemoveSaleRepository } from '@/data/contracts/sale'

export class RemoveSaleRepositoryMock implements RemoveSaleRepository {
  async remove(saleId: string): Promise<void> {}
}
