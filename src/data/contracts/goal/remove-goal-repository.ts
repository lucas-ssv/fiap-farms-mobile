export interface RemoveGoalRepository {
  remove: (goalId: string) => Promise<void>
}
