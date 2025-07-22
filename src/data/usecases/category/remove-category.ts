import type { RemoveCategoryRepository } from "@/data/contracts/category";
import type { RemoveCategory } from "@/domain/usecases/category";

export class RemoveCategoryImpl implements RemoveCategory {
  private removeCategoryRepository: RemoveCategoryRepository

  constructor(removeCategoryRepository: RemoveCategoryRepository) {
    this.removeCategoryRepository = removeCategoryRepository;
  }

  async execute(categoryId: string): Promise<void> {
    await this.removeCategoryRepository.remove(categoryId);
  }
}