import type { RemoveProductionRepository } from '@/data/contracts/production'

export class RemoveProductionRepositoryMock
  implements RemoveProductionRepository
{
  async remove(productionId: string): Promise<void> {}
}
