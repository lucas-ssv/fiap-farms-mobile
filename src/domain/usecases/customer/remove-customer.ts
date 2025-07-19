export interface RemoveCustomer {
  execute: (customerId: string) => Promise<void>
}
