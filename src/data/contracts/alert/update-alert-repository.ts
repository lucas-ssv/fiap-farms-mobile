import type { UpdateAlert } from '@/domain/usecases/alert'

export interface UpdateAlertRepository {
  update: (alertId: string, data: UpdateAlertRepository.Params) => Promise<void>
}

export namespace UpdateAlertRepository {
  export type Params = UpdateAlert.Params
}
