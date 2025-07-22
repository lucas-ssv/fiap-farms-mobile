import type { WatchCustomersRepository } from '@/data/contracts/customer'
import type { CustomerModel } from '@/domain/models/customer'

export class WatchCustomersRepositoryStub implements WatchCustomersRepository {
  watchAll(
    onChange: WatchCustomersRepository.Params
  ): WatchCustomersRepository.Result {
    const customers: CustomerModel[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'johndue@email.com',
        phone: '123-456-7890',
        postalCode: '12345',
        city: 'Springfield',
        state: 'IL',
        neighborhood: 'Downtown',
        address: '123 Main St',
        addressNumber: 101,
        addressComplement: 'Apt 4B',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    onChange(customers)
    return () => {}
  }
}
