import type { LoadAccountByEmailRepository } from '@/data/contracts/account'

export class LoadAccountByEmailRepositoryMock
  implements LoadAccountByEmailRepository
{
  async loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Result> {
    return Promise.resolve({
      name: 'any_name',
      email: 'any_email@mail.com',
      userUID: 'any_user_uid',
    })
  }
}
