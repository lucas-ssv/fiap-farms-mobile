import type { AddAlertRepository } from '@/data/contracts/alert'
import type {
  LoadGoalsByUserIdRepository,
  UpdateGoalRepository,
} from '@/data/contracts/goal'
import type {
  LoadByProductIdRepository,
  UpdateProductRepository,
} from '@/data/contracts/product'
import type { UpdateProductionRepository } from '@/data/contracts/production'
import type { UpdateProduction } from '@/domain/usecases/production'

export class UpdateProductionImpl implements UpdateProduction {
  private updateProductionRepository: UpdateProductionRepository
  private loadGoalsByUserIdRepository: LoadGoalsByUserIdRepository
  private updateGoalRepository: UpdateGoalRepository
  private addAlertRepository: AddAlertRepository
  private loadByProductIdRepository: LoadByProductIdRepository
  private updateProductRepository: UpdateProductRepository

  constructor(
    updateProductionRepository: UpdateProductionRepository,
    loadGoalsByUserIdRepository: LoadGoalsByUserIdRepository,
    updateGoalRepository: UpdateGoalRepository,
    addAlertRepository: AddAlertRepository,
    loadByProductIdRepository: LoadByProductIdRepository,
    updateProductRepository: UpdateProductRepository
  ) {
    this.updateProductionRepository = updateProductionRepository
    this.loadGoalsByUserIdRepository = loadGoalsByUserIdRepository
    this.updateGoalRepository = updateGoalRepository
    this.addAlertRepository = addAlertRepository
    this.loadByProductIdRepository = loadByProductIdRepository
    this.updateProductRepository = updateProductRepository
  }

  async execute(
    productionId: string,
    data: UpdateProduction.Params
  ): Promise<void> {
    if (data.quantityProduced === data.quantity) {
      data.status = 'harvested'
    }

    await this.updateProductionRepository.update(productionId, data)

    const product = await this.loadByProductIdRepository.loadByProductId(
      data.productId!
    )
    if (product) {
      const updatedStock = product.stock + data.quantityProduced!
      await this.updateProductRepository.update(data.productId!, {
        stock: updatedStock,
      })
    }

    const goals = await this.loadGoalsByUserIdRepository.loadAll(data.userId!)
    const goalsByProductId = goals.filter(
      (goal) =>
        goal.product.id === data.productId &&
        goal.type === 'production' &&
        goal.status !== 'done'
    )

    for (const goal of goalsByProductId) {
      const newCurrentValue = goal.currentValue + data.quantityProduced!
      const goalAchieved = newCurrentValue >= goal.targetValue
      const updatedGoalData: UpdateGoalRepository.Params = {
        currentValue: newCurrentValue,
      }

      if (goalAchieved) {
        updatedGoalData.status = 'done'
      }

      await this.updateGoalRepository.update(goal.id, updatedGoalData)

      if (goalAchieved) {
        await this.addAlertRepository.add({
          userId: data.userId!,
          productId: data.productId!,
          type: 'production',
          message: `Goal achieved for product ${data.productId!}`,
          read: false,
        })
      }
    }
  }
}
