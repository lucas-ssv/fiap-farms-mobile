import type { AddGoalRepository } from '@/data/contracts/goal'

export class AddGoalRepositoryMock implements AddGoalRepository {
  async add(params: AddGoalRepository.Params): Promise<void> {}
}
