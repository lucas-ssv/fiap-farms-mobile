import { LoadAccountsImpl } from '@/data/usecases/account'
import { LoadCustomersImpl } from '@/data/usecases/customer'
import { LoadProductsImpl } from '@/data/usecases/product'
import {
  UpdateSaleImpl,
  RemoveSaleImpl,
  WatchSalesImpl,
} from '@/data/usecases/sale'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase/account'
import { CustomerFirebaseRepository } from '@/infra/repositories/firebase/customer'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { SaleFirebaseRepository } from '@/infra/repositories/firebase/sale'
import { Sales } from '@/presentation/screens/app/Sales'

export function MakeSales() {
  const loadAccounts = new LoadAccountsImpl(new AccountFirebaseRepository())
  const loadCustomers = new LoadCustomersImpl(new CustomerFirebaseRepository())
  const loadProducts = new LoadProductsImpl(new ProductFirebaseRepository())
  const updateSale = new UpdateSaleImpl(new SaleFirebaseRepository())
  const removeSale = new RemoveSaleImpl(new SaleFirebaseRepository())
  const watchSales = new WatchSalesImpl(new SaleFirebaseRepository())

  return (
    <Sales
      loadAccounts={loadAccounts}
      loadCustomers={loadCustomers}
      loadProducts={loadProducts}
      updateSale={updateSale}
      removeSale={removeSale}
      watchSales={watchSales}
    />
  )
}
