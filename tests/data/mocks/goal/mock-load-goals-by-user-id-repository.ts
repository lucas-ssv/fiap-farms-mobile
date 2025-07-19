import type { LoadGoalsByUserIdRepository } from '@/data/contracts/goal'
import { mockGoalsResult } from './mocks'

export class LoadGoalsByUserIdRepositoryMock
  implements LoadGoalsByUserIdRepository
{
  async loadAll(userId: string): Promise<LoadGoalsByUserIdRepository.Result> {
    return mockGoalsResult()
  }
}
