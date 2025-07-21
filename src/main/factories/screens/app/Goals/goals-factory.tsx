import {
  RemoveGoalImpl,
  UpdateGoalImpl,
  WatchGoalsImpl,
} from '@/data/usecases/goal'
import { LoadProductsImpl } from '@/data/usecases/product'
import { GoalFirebaseRepository } from '@/infra/repositories/firebase/goal'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { Goals } from '@/presentation/screens/app/Goals'

export function MakeGoals() {
  const loadProducts = new LoadProductsImpl(new ProductFirebaseRepository())
  const removeGoal = new RemoveGoalImpl(new GoalFirebaseRepository())
  const updateGoal = new UpdateGoalImpl(new GoalFirebaseRepository())
  const watchGoals = new WatchGoalsImpl(new GoalFirebaseRepository())
  return (
    <Goals
      loadProducts={loadProducts}
      removeGoal={removeGoal}
      updateGoal={updateGoal}
      watchGoals={watchGoals}
    />
  )
}
