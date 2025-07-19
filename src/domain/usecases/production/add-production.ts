export interface AddProduction {
  execute: (data: AddProduction.Params) => Promise<void>
}

export namespace AddProduction {
  export type Params = {
    productId: string
    userId: string
    status: 'waiting' | 'in_production' | 'harvested'
    quantity: number
    quantityProduced: number
    lastQuantity?: number
    unit: string
    startDate: Date
    harvestDate: Date
  }
}
