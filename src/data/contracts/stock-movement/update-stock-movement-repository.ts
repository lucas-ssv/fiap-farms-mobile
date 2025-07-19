export interface UpdateStockMovementRepository {
  update: (
    type: 'input' | 'output',
    productId: string,
    quantity: number
  ) => Promise<void>
}
