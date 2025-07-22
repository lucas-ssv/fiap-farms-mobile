import type { UpdateAlertRepository } from '@/data/contracts/alert'
import type { UpdateAlert } from '@/domain/usecases/alert'

export class UpdateAlertImpl implements UpdateAlert {
  private updateAlertRepository: UpdateAlertRepository

  constructor(updateAlertRepository: UpdateAlertRepository) {
    this.updateAlertRepository = updateAlertRepository
  }

  async execute(alertId: string, data: UpdateAlert.Params): Promise<void> {
    await this.updateAlertRepository.update(alertId, data)
  }
}
