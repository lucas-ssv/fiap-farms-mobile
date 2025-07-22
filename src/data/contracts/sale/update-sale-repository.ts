import type { UpdateSale } from '@/domain/usecases/sale'

export interface UpdateSaleRepository {
  update: (saleId: string, data: UpdateSaleRepository.Params) => Promise<void>
}

export namespace UpdateSaleRepository {
  export type Params = UpdateSale.Params
}
