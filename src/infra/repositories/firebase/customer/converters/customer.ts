import type { AddCustomerRepository } from '@/data/contracts/customer'
import type { CustomerModel } from '@/domain/models/customer'
import type { DocumentData, FirestoreDataConverter } from 'firebase/firestore'

export type Customer = AddCustomerRepository.Params & {
  createdAt: Date
  updatedAt: Date
}

export const customerConverter: FirestoreDataConverter<Customer> = {
  toFirestore: (customer: Customer): DocumentData => {
    return {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      postalCode: customer.postalCode,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      neighborhood: customer.neighborhood,
      addressNumber: customer.addressNumber,
      addressComplement: customer.addressComplement,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }
  },
  fromFirestore: (snapshot, options): Customer => {
    const data = snapshot.data(options)
    return data as Customer
  },
}

export const loadCustomersConverter: FirestoreDataConverter<CustomerModel> = {
  toFirestore: (customer: CustomerModel): DocumentData => {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone ?? null,
      postalCode: customer.postalCode,
      address: customer.address,
      addressNumber: customer.addressNumber,
      addressComplement: customer.addressComplement ?? null,
      neighborhood: customer.neighborhood,
      city: customer.city,
      state: customer.state,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }
  },
  fromFirestore: (snapshot, options): CustomerModel => {
    const data = snapshot.data(options)
    return data as CustomerModel
  },
}
