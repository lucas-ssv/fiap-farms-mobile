import type { WatchAlertsRepository } from '@/data/contracts/alert'
import type { WatchAlerts } from '@/domain/usecases/alert'

export class WatchAlertsImpl implements WatchAlerts {
  private watchAlertsRepository: WatchAlertsRepository

  constructor(watchAlertsRepository: WatchAlertsRepository) {
    this.watchAlertsRepository = watchAlertsRepository
  }

  execute(onChange: WatchAlerts.Params): WatchAlerts.Result {
    return this.watchAlertsRepository.watchAll(onChange)
  }
}
