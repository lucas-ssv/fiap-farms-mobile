import type { RemoveCategoryRepository } from "@/data/contracts/category";

export class RemoveCategoryRepositoryMock implements RemoveCategoryRepository {
  async remove(categoryId: string): Promise<void> {}
}