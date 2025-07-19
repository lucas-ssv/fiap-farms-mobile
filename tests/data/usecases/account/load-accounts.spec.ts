import { LoadAccountsImpl } from "@/data/usecases/account"
import { LoadAccountsRepositoryStub } from "@tests/data/mocks/account"
import { mockAccountsResult } from "@tests/data/mocks/account/mocks"

jest.useFakeTimers()

type SutTypes = {
  sut: LoadAccountsImpl
  loadAccountsRepositoryStub: LoadAccountsRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadAccountsRepositoryStub = new LoadAccountsRepositoryStub()
  const sut = new LoadAccountsImpl(loadAccountsRepositoryStub)
  return {
    sut,
    loadAccountsRepositoryStub,
  }
}

describe('LoadAccounts usecase', () => {
  it('should call LoadAccountsRepository', async () => {
    const { sut, loadAccountsRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadAccountsRepositoryStub, 'loadAll')

    await sut.execute()

    expect(loadAllSpy).toHaveBeenCalled()
  })

  it('should return a list of accounts on success', async () => {
    const { sut } = makeSut()

    const accounts = await sut.execute()

    expect(accounts).toEqual(mockAccountsResult())
  })

  it('should throw if LoadAccountsRepository throws', async () => {
    const { sut, loadAccountsRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountsRepositoryStub, 'loadAll')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute()

    await expect(promise).rejects.toThrow()
  })
})
