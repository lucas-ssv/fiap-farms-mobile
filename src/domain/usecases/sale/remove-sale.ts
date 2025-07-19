export interface RemoveSale {
  execute: (saleId: string) => Promise<void>
}
