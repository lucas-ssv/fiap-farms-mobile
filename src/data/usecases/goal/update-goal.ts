import type { UpdateGoalRepository } from '@/data/contracts/goal'
import type { UpdateGoal } from '@/domain/usecases/goal'

export class UpdateGoalImpl implements UpdateGoal {
  private updateGoalRepository: UpdateGoalRepository

  constructor(updateGoalRepository: UpdateGoalRepository) {
    this.updateGoalRepository = updateGoalRepository
  }

  async execute(goalId: string, data: UpdateGoal.Params): Promise<void> {
    await this.updateGoalRepository.update(goalId, data)
  }
}
