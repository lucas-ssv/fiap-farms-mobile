import type { ProductionModel } from '@/domain/models/production'

export interface WatchProductionsRepository {
  watchAll: (
    onChange: WatchProductionsRepository.Params
  ) => WatchProductionsRepository.Result
}

export namespace WatchProductionsRepository {
  export type Params = (productions: ProductionModel[]) => void

  export type Result = () => void
}
