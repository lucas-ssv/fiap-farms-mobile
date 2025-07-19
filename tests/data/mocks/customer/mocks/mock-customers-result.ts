import type { LoadCustomers } from '@/domain/usecases/customer'

export const mockCustomersResult = (): LoadCustomers.Result => {
  return [
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
      addressNumber: '101',
      addressComplement: 'Apt 4B',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}
