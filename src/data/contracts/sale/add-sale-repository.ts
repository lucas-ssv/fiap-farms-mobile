import type { AddSale } from '@/domain/usecases/sale'

export interface AddSaleRepository {
  add: (params: AddSaleRepository.Params) => Promise<void>
}

export namespace AddSaleRepository {
  export type Params = AddSale.Params
}
