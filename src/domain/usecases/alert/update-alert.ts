export interface UpdateAlert {
  execute: (alertId: string, data: UpdateAlert.Params) => Promise<void>
}

export namespace UpdateAlert {
  export type Params = {
    userId?: string
    productId?: string
    type?: 'sales' | 'production'
    message?: string
    read?: boolean
  }
}
