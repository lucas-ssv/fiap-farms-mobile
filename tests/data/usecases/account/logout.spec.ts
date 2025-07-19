import { LogoutImpl } from '@/data/usecases/account'
import { LogoutAccountRepositoryMock } from '@tests/data/mocks/account'

type SutTypes = {
  sut: LogoutImpl
  logoutAccountRepositoryMock: LogoutAccountRepositoryMock
}

const makeSut = (): SutTypes => {
  const logoutAccountRepositoryMock = new LogoutAccountRepositoryMock()
  const sut = new LogoutImpl(logoutAccountRepositoryMock)
  return {
    sut,
    logoutAccountRepositoryMock,
  }
}

describe('Logout usecase', () => {
  it('should call LogoutAccountRepository with correct values', async () => {
    const { sut, logoutAccountRepositoryMock } = makeSut()
    const logoutSpy = jest.spyOn(logoutAccountRepositoryMock, 'logout')

    await sut.execute()

    expect(logoutSpy).toHaveBeenCalled()
  })

  it('should throw if LogoutAccountRepository throws', async () => {
    const { sut, logoutAccountRepositoryMock } = makeSut()
    jest
      .spyOn(logoutAccountRepositoryMock, 'logout')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute()

    expect(promise).rejects.toThrow()
  })
})
