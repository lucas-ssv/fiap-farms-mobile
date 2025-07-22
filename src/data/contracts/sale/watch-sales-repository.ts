import type { SaleModel } from '@/domain/models/sale'

export interface WatchSalesRepository {
  watchAll: (
    onChange: WatchSalesRepository.Params
  ) => WatchSalesRepository.Result
}

export namespace WatchSalesRepository {
  export type Params = (sales: SaleModel[]) => void

  export type Result = () => void
}
