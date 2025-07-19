import type { SaleModel } from '@/domain/models/sale'

export interface WatchSales {
  execute: (onChange: WatchSales.Params) => WatchSales.Result
}

export namespace WatchSales {
  export type Params = (sales: SaleModel[]) => void

  export type Result = () => void
}
