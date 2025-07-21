import { LoadProductsImpl } from '@/data/usecases/product'
import {
  RemoveProductionImpl,
  UpdateProductionImpl,
  WatchProductionsImpl,
} from '@/data/usecases/production'
import { AlertFirebaseRepository } from '@/infra/repositories/firebase/alert'
import { GoalFirebaseRepository } from '@/infra/repositories/firebase/goal'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { ProductionFirebaseRepository } from '@/infra/repositories/firebase/production'
import { Productions } from '@/presentation/screens/app/Productions'

export function MakeProductions() {
  const loadProducts = new LoadProductsImpl(new ProductFirebaseRepository())
  const removeProduction = new RemoveProductionImpl(
    new ProductionFirebaseRepository()
  )
  const updateProduction = new UpdateProductionImpl(
    new ProductionFirebaseRepository(),
    new GoalFirebaseRepository(),
    new GoalFirebaseRepository(),
    new AlertFirebaseRepository(),
    new ProductFirebaseRepository(),
    new ProductFirebaseRepository()
  )
  const watchProductions = new WatchProductionsImpl(
    new ProductionFirebaseRepository()
  )
  return (
    <Productions
      loadProducts={loadProducts}
      removeProduction={removeProduction}
      updateProduction={updateProduction}
      watchProductions={watchProductions}
    />
  )
}
