import type { StockMovementModel } from '@/domain/models/stock-movement'

export interface LoadStockMovementsByProductIdRepository {
  loadAll(
    productId: string
  ): Promise<LoadStockMovementsByProductIdRepository.Result>
}

export namespace LoadStockMovementsByProductIdRepository {
  export type Result = StockMovementModel[]
}
