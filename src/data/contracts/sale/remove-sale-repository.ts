export interface RemoveSaleRepository {
  remove: (saleId: string) => Promise<void>
}
