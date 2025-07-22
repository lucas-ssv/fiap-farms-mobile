import { AuthenticationImpl } from "@/data/usecases/account"
import { LoadAccountRepositoryMock } from "@tests/data/mocks/account"

describe('Authentication Use Case', () => {
  it('should call LoadAccountRepository with correct values', async () => {
    const loadAccountRepositoryMock = new LoadAccountRepositoryMock()
    const authSpy = jest.spyOn(loadAccountRepositoryMock, 'auth')
    const sut = new AuthenticationImpl(loadAccountRepositoryMock)

    await sut.execute({
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    })
  })

  it('should throw if LoadAccountRepository throws', async () => {
    const loadAccountRepositoryMock = new LoadAccountRepositoryMock()
    jest.spyOn(loadAccountRepositoryMock, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new AuthenticationImpl(loadAccountRepositoryMock)

    const promise = sut.execute({
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(promise).rejects.toThrow()
  })
})