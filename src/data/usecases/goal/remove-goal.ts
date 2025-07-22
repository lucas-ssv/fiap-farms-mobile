import type { RemoveGoalRepository } from '@/data/contracts/goal'
import type { RemoveGoal } from '@/domain/usecases/goal'

export class RemoveGoalImpl implements RemoveGoal {
  private removeGoalRepository: RemoveGoalRepository

  constructor(removeGoalRepository: RemoveGoalRepository) {
    this.removeGoalRepository = removeGoalRepository
  }

  async execute(goalId: string): Promise<void> {
    await this.removeGoalRepository.remove(goalId)
  }
}
