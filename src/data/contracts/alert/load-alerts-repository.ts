import type { LoadAlerts } from '@/domain/usecases/alert'

export interface LoadAlertsRepository {
  loadAll: () => Promise<LoadAlertsRepository.Result>
}

export namespace LoadAlertsRepository {
  export type Result = LoadAlerts.Result
}
