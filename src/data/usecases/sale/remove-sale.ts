import type { RemoveSaleRepository } from '@/data/contracts/sale'
import type { RemoveSale } from '@/domain/usecases/sale'

export class RemoveSaleImpl implements RemoveSale {
  private removeSaleRepository: RemoveSaleRepository

  constructor(removeSaleRepository: RemoveSaleRepository) {
    this.removeSaleRepository = removeSaleRepository
  }

  async execute(saleId: string): Promise<void> {
    await this.removeSaleRepository.remove(saleId)
  }
}
