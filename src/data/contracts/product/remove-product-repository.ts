export interface RemoveProductRepository {
  remove: (productId: string) => Promise<void>
}
