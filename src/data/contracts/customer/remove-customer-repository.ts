export interface RemoveCustomerRepository {
  remove: (customerId: string) => Promise<void>
}
