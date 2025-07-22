export interface UpdateGoal {
  execute: (goalId: string, data: UpdateGoal.Params) => Promise<void>
}

export namespace UpdateGoal {
  export type Params = {
    productId?: string
    description?: string
    type?: 'sales' | 'production'
    status?: 'in_progress' | 'done' | 'active' | 'inactive'
    targetValue?: number
    currentValue?: number
    startDate?: Date
    deadline?: Date
  }
}
