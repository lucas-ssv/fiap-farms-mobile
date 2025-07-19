import type { AlertModel } from '@/domain/models/alert'

export interface LoadAlerts {
  execute: () => Promise<LoadAlerts.Result>
}

export namespace LoadAlerts {
  export type Result = Array<AlertModel>
}
