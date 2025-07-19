export interface RemoveCategory {
  execute: (categoryId: string) => Promise<void>
}
