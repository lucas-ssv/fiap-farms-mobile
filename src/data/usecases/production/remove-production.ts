import type { RemoveProductionRepository } from '@/data/contracts/production'
import type { RemoveProduction } from '@/domain/usecases/production'

export class RemoveProductionImpl implements RemoveProduction {
  private removeProductionRepository: RemoveProductionRepository

  constructor(removeProductionRepository: RemoveProductionRepository) {
    this.removeProductionRepository = removeProductionRepository
  }

  async execute(productionId: string): Promise<void> {
    await this.removeProductionRepository.remove(productionId)
  }
}
