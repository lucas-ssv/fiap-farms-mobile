import type { UpdateSaleRepository } from '@/data/contracts/sale'

export class UpdateSaleRepositoryMock implements UpdateSaleRepository {
  async update(
    saleId: string,
    data: UpdateSaleRepository.Params
  ): Promise<void> {}
}
