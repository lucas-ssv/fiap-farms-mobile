import type { GoalModel } from '@/domain/models/goal'

export interface WatchGoalsRepository {
  watchAll: (
    onChange: WatchGoalsRepository.Params
  ) => WatchGoalsRepository.Result
}

export namespace WatchGoalsRepository {
  export type Params = (goals: GoalModel[]) => void

  export type Result = () => void
}
