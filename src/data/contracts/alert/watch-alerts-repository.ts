import type { AlertModel } from '@/domain/models/alert'

export interface WatchAlertsRepository {
  watchAll: (
    onChange: WatchAlertsRepository.Params
  ) => WatchAlertsRepository.Result
}

export namespace WatchAlertsRepository {
  export type Params = (alerts: AlertModel[]) => void

  export type Result = () => void
}
