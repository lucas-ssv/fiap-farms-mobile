import type { AddProduction } from '@/domain/usecases/production'

export interface AddProductionRepository {
  add: (params: AddProductionRepository.Params) => Promise<void>
}

export namespace AddProductionRepository {
  export type Params = AddProduction.Params
}
