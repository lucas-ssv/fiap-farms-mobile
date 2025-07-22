import type { UpdateGoalRepository } from '@/data/contracts/goal'

export class UpdateGoalRepositoryMock implements UpdateGoalRepository {
  async update(
    goalId: string,
    data: UpdateGoalRepository.Params
  ): Promise<void> {}
}
