import type { WatchGoalsRepository } from '@/data/contracts/goal'
import type { GoalModel } from '@/domain/models/goal'

export class WatchGoalsRepositoryStub implements WatchGoalsRepository {
  watchAll(onChange: WatchGoalsRepository.Params): WatchGoalsRepository.Result {
    const goals: GoalModel[] = [
      {
        id: 'any_goal_id',
        product: {
          id: 'any_product_id',
          name: 'any_product_email@mail.com',
          price: 10,
          cost: 5,
          category: {
            id: 'any_category_id',
            name: 'any_category_name',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          stock: 100,
          unit: 'kg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        currentValue: 100,
        targetValue: 200,
        status: 'active',
        startDate: new Date(),
        deadline: new Date(),
        type: 'sales',
        description: 'any_goal_description',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    onChange(goals)
    return () => {}
  }
}
