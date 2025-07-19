import type { ProductionModel } from '@/domain/models/production'

export interface WatchProductions {
  execute: (onChange: WatchProductions.Params) => WatchProductions.Result
}

export namespace WatchProductions {
  export type Params = (productions: ProductionModel[]) => void

  export type Result = () => void
}
