export interface AddCustomer {
  execute: (data: AddCustomer.Params) => Promise<void>
}

export namespace AddCustomer {
  export type Params = {
    name: string
    email: string
    phone?: string
    postalCode: string
    city: string
    state: string
    neighborhood: string
    address: string
    addressNumber: number
    addressComplement?: string
  }
}
