export interface AddSale {
  execute: (params: AddSale.Params) => Promise<void>
}

export namespace AddSale {
  export type Params = {
    productId: string
    customerId?: string
    userId: string
    quantity: number
    saleDate: Date
    totalPrice: number
    unitPrice: number
    unit: string
    discount?: number
    paymentMethod: string
    observations?: string
    status: 'pending' | 'completed' | 'cancelled'
  }
}
