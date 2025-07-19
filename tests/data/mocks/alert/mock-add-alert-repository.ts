import type { AddAlertRepository } from '@/data/contracts/alert'

export class AddAlertRepositoryMock implements AddAlertRepository {
  async add(params: AddAlertRepository.Params): Promise<void> {}
}
