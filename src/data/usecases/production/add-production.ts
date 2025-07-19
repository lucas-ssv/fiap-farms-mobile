import type { AddProductionRepository } from '@/data/contracts/production'
import type { AddProduction } from '@/domain/usecases/production'

export class AddProductionImpl implements AddProduction {
  private addProductionRepository: AddProductionRepository

  constructor(addProductionRepository: AddProductionRepository) {
    this.addProductionRepository = addProductionRepository
  }

  async execute(params: AddProduction.Params): Promise<void> {
    await this.addProductionRepository.add(params)
  }
}
