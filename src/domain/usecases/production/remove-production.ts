export interface RemoveProduction {
  execute: (productionId: string) => Promise<void>
}
