import type { AddCustomer } from '@/domain/usecases/customer'

export const mockAddCustomerParams = (): AddCustomer.Params => ({
  name: 'John Doe',
  email: 'any_email@mail.com',
  phone: '123-456-7890',
  postalCode: '12345',
  city: 'Springfield',
  state: 'IL',
  neighborhood: 'Downtown',
  address: '123 Main St',
  addressNumber: '101',
  addressComplement: 'Apt 4B',
})
