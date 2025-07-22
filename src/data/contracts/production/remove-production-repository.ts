export interface RemoveProductionRepository {
  remove: (productionId: string) => Promise<void>
}
