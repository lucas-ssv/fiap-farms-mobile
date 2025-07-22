import type { SaveUserRepository } from "@/data/contracts/account";

export class SaveUserRepositoryMock implements SaveUserRepository {
  async save(user: SaveUserRepository.Params): Promise<void> {}
}