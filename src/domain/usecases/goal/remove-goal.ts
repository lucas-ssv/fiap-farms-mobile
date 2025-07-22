export interface RemoveGoal {
  execute: (goalId: string) => Promise<void>
}
