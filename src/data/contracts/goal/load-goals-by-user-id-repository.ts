import type { GoalModel } from '@/domain/models/goal'

export interface LoadGoalsByUserIdRepository {
  loadAll: (userId: string) => Promise<LoadGoalsByUserIdRepository.Result>
}

export namespace LoadGoalsByUserIdRepository {
  export type Result = GoalModel[]
}
