import type { AddStockMovementRepository } from '@/data/contracts/stock-movement'
import type { AddStockMovement } from '@/domain/usecases/stock-movement'

export class AddStockMovementImpl implements AddStockMovement {
  private addStockMovementRepository: AddStockMovementRepository

  constructor(addStockMovementRepository: AddStockMovementRepository) {
    this.addStockMovementRepository = addStockMovementRepository
  }

  async execute(params: AddStockMovement.Params): Promise<void> {
    await this.addStockMovementRepository.add(params)
  }
}
