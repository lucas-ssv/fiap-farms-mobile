export interface AddAlertRepository {
  add: (params: AddAlertRepository.Params) => Promise<void>
}

export namespace AddAlertRepository {
  export type Params = {
    userId: string
    productId: string
    type: 'sales' | 'production'
    message: string
    read: boolean
  }
}
