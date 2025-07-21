import {
  RemoveCustomerImpl,
  UpdateCustomerImpl,
  WatchCustomersImpl,
} from '@/data/usecases/customer'
import { CustomerFirebaseRepository } from '@/infra/repositories/firebase/customer'
import { Customers } from '@/presentation/screens/app/Sales'

export function MakeCustomers() {
  const removeCustomer = new RemoveCustomerImpl(
    new CustomerFirebaseRepository()
  )
  const updateCustomer = new UpdateCustomerImpl(
    new CustomerFirebaseRepository()
  )
  const watchCustomers = new WatchCustomersImpl(
    new CustomerFirebaseRepository()
  )

  return (
    <Customers
      removeCustomer={removeCustomer}
      updateCustomer={updateCustomer}
      watchCustomers={watchCustomers}
    />
  )
}
