import type { WatchGoalsRepository } from '@/data/contracts/goal'
import type { WatchGoals } from '@/domain/usecases/goal'

export class WatchGoalsImpl implements WatchGoals {
  private watchGoalsRepository: WatchGoalsRepository

  constructor(watchGoalsRepository: WatchGoalsRepository) {
    this.watchGoalsRepository = watchGoalsRepository
  }

  execute(onChange: WatchGoals.Params): WatchGoals.Result {
    return this.watchGoalsRepository.watchAll(onChange)
  }
}
