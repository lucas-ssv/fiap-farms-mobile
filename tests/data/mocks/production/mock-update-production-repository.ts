import type { UpdateProductionRepository } from '@/data/contracts/production'

export class UpdateProductionRepositoryMock
  implements UpdateProductionRepository
{
  async update(
    productionId: string,
    data: UpdateProductionRepository.Params
  ): Promise<void> {}
}
