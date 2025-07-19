import type { LoadAlertsRepository } from '@/data/contracts/alert'
import type { LoadAlerts } from '@/domain/usecases/alert'

export class LoadAlertsImpl implements LoadAlerts {
  private loadAlertsRepository: LoadAlertsRepository

  constructor(loadAlertsRepository: LoadAlertsRepository) {
    this.loadAlertsRepository = loadAlertsRepository
  }

  async execute(): Promise<LoadAlerts.Result> {
    return this.loadAlertsRepository.loadAll()
  }
}
