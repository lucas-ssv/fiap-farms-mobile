import { WatchProductsImpl } from '@/data/usecases/product'
import { WatchSalesImpl } from '@/data/usecases/sale'
import { WatchProductionsImpl } from '@/data/usecases/production'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { SaleFirebaseRepository } from '@/infra/repositories/firebase/sale'
import { ProductionFirebaseRepository } from '@/infra/repositories/firebase/production'
import { Dashboard } from '@/presentation/screens/app/Dashboard'

export function MakeDashboard() {
  const watchProducts = new WatchProductsImpl(new ProductFirebaseRepository())
  const watchSales = new WatchSalesImpl(new SaleFirebaseRepository())
  const watchProductions = new WatchProductionsImpl(
    new ProductionFirebaseRepository()
  )

  return (
    <Dashboard
      watchProducts={watchProducts}
      watchSales={watchSales}
      watchProductions={watchProductions}
    />
  )
}
