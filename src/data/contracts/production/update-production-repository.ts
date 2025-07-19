import type { UpdateProduction } from '@/domain/usecases/production'

export interface UpdateProductionRepository {
  update: (
    productionId: string,
    data: UpdateProductionRepository.Params
  ) => Promise<void>
}

export namespace UpdateProductionRepository {
  export type Params = UpdateProduction.Params
}
