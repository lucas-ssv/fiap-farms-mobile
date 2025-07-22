import type { AddGoal } from '@/domain/usecases/goal'

export interface AddGoalRepository {
  add: (params: AddGoalRepository.Params) => Promise<void>
}

export namespace AddGoalRepository {
  export type Params = AddGoal.Params
}
