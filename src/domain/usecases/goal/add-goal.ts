export interface AddGoal {
  execute: (params: AddGoal.Params) => Promise<void>
}

export namespace AddGoal {
  export type Params = {
    productId: string
    userId: string
    description?: string
    type: 'sales' | 'production'
    status: 'in_progress' | 'done' | 'active' | 'inactive'
    targetValue: number
    currentValue: number
    startDate: Date
    deadline: Date
  }
}
