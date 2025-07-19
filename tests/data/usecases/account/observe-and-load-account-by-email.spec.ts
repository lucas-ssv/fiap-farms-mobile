import { ObserveAndLoadAccountByEmailImpl } from "@/data/usecases/account"
import { AuthRepositoryStub, LoadAccountByEmailRepositoryMock } from "@tests/data/mocks/account"

type SutTypes = {
  sut: ObserveAndLoadAccountByEmailImpl
  authRepositoryStub: AuthRepositoryStub
  loadAccountByEmailRepositoryMock: LoadAccountByEmailRepositoryMock
}

const makeSut = (): SutTypes => {
  const authRepositoryStub = new AuthRepositoryStub()
  const loadAccountByEmailRepositoryMock =
    new LoadAccountByEmailRepositoryMock()
  const sut = new ObserveAndLoadAccountByEmailImpl(authRepositoryStub, loadAccountByEmailRepositoryMock)
  return {
    sut,
    authRepositoryStub,
    loadAccountByEmailRepositoryMock,
  }
}

describe('ObserveAndLoadAccountByEmail usecase', () => {
  it('should call AuthRepository with correct values', async () => {
    const { sut, authRepositoryStub } = makeSut()
    const authSpy = jest.spyOn(authRepositoryStub, 'onAuthStateChanged')
    const callback = () => {}

    sut.execute(callback)

    expect(authSpy).toHaveBeenCalled()
  })

  it('should call LoadAccountByEmailRepository with correct values', async () => {
    const { sut, loadAccountByEmailRepositoryMock } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryMock, 'loadByEmail')
    const callback = () => {}

    sut.execute(callback)

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('should call callback with the result from LoadAccountByEmailRepository if user is not null', async () => {
    const { sut } = makeSut()

    const callbackResult = new Promise((resolve) => {
      sut.execute((account) => {
        resolve(account)
      })
    })

    await expect(callbackResult).resolves.toEqual({
      name: 'any_name',
      email: 'any_email@mail.com',
      userUID: 'any_user_uid',
    })
  })

  it('should call callback with null if user returns null', async () => {
    const { sut, authRepositoryStub } = makeSut()
    jest
      .spyOn(authRepositoryStub, 'onAuthStateChanged')
      .mockImplementationOnce((callback) => {
        callback(null)
        return () => {}
      })

    const callbackResult = new Promise((resolve) => {
      sut.execute((account) => {
        resolve(account)
      })
    })

    await expect(callbackResult).resolves.toBeNull()
  })

  it('should return a void function on success', async () => {
    const { sut } = makeSut()

    const unsubscribe = sut.execute(() => {})

    expect(typeof unsubscribe).toBe('function')
  })
})