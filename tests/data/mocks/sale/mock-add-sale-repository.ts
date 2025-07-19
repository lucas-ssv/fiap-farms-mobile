import type { AddSaleRepository } from '@/data/contracts/sale'

export class AddSaleRepositoryMock implements AddSaleRepository {
  async add(params: AddSaleRepository.Params): Promise<void> {}
}
