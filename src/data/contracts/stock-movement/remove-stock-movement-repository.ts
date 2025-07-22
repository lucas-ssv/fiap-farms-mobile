export interface RemoveStockMovementRepository {
  removeByProductId: (productId: string) => Promise<void>
}
