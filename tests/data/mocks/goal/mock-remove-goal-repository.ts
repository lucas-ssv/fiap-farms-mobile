import type { RemoveGoalRepository } from '@/data/contracts/goal'

export class RemoveGoalRepositoryMock implements RemoveGoalRepository {
  async remove(goalId: string): Promise<void> {}
}
