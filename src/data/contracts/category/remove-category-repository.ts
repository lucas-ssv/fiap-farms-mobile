export interface RemoveCategoryRepository {
  remove: (categoryId: string) => Promise<void>
}
