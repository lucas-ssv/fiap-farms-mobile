import type { UpdateGoal } from '@/domain/usecases/goal'

export interface UpdateGoalRepository {
  update: (goalId: string, data: UpdateGoalRepository.Params) => Promise<void>
}

export namespace UpdateGoalRepository {
  export type Params = UpdateGoal.Params
}
