export interface RemoveProduct {
  execute: (productId: string) => Promise<void>
}
