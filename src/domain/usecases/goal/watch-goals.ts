import type { GoalModel } from '@/domain/models/goal'

export interface WatchGoals {
  execute: (onChange: WatchGoals.Params) => WatchGoals.Result
}

export namespace WatchGoals {
  export type Params = (goals: GoalModel[]) => void

  export type Result = () => void
}
