export interface AddStockMovement {
  execute: (params: AddStockMovement.Params) => Promise<void>
}

export namespace AddStockMovement {
  export type Params = {
    productId: string
    userId: string
    type: 'input' | 'output'
    quantity: number
    date: Date
    reason?: string
  }
}
