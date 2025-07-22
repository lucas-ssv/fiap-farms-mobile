export interface UpdateCustomer {
  execute: (customerId: string, data: UpdateCustomer.Params) => Promise<void>
}

export namespace UpdateCustomer {
  export type Params = {
    name?: string
    email?: string
    phone?: string
    postalCode?: string
    city?: string
    state?: string
    neighborhood?: string
    address?: string
    addressNumber?: number
    addressComplement?: string
  }
}
