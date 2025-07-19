import type { AddStockMovement } from '@/domain/usecases/stock-movement'

export interface AddStockMovementRepository {
  add: (params: AddStockMovementRepository.Params) => Promise<void>
}

export namespace AddStockMovementRepository {
  export type Params = AddStockMovement.Params
}
