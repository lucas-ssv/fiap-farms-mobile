import type { AddGoalRepository } from '@/data/contracts/goal'
import type { AddGoal } from '@/domain/usecases/goal'

export class AddGoalImpl implements AddGoal {
  private addGoalRepository: AddGoalRepository

  constructor(addGoalRepository: AddGoalRepository) {
    this.addGoalRepository = addGoalRepository
  }

  async execute(params: AddGoal.Params): Promise<void> {
    await this.addGoalRepository.add(params)
  }
}
