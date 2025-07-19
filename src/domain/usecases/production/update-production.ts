export interface UpdateProduction {
  execute: (
    productionId: string,
    data: UpdateProduction.Params
  ) => Promise<void>
}

export namespace UpdateProduction {
  export type Params = {
    productId?: string
    userId?: string
    status?: 'in_production' | 'waiting' | 'harvested'
    quantity?: number
    quantityProduced?: number
    lastQuantity?: number
    unit?: string
    startDate?: Date
    harvestDate?: Date
  }
}
