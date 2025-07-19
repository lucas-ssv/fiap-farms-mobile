import type { UpdateSaleRepository } from '@/data/contracts/sale'
import type { UpdateSale } from '@/domain/usecases/sale'

export class UpdateSaleImpl implements UpdateSale {
  private updateSaleRepository: UpdateSaleRepository

  constructor(updateSaleRepository: UpdateSaleRepository) {
    this.updateSaleRepository = updateSaleRepository
  }

  async execute(saleId: string, data: UpdateSale.Params): Promise<void> {
    await this.updateSaleRepository.update(saleId, data)
  }
}
