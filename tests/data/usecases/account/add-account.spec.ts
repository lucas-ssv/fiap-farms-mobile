import { AddAccountImpl } from "@/data/usecases/account"
import { AddAccountRepositoryMock, SaveUserRepositoryMock } from "@tests/data/mocks/account"

type SutTypes = {
  sut: AddAccountImpl
  addAccountRepositoryMock: AddAccountRepositoryMock
  saveUserRepositoryMock: SaveUserRepositoryMock
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryMock = new AddAccountRepositoryMock()
  const saveUserRepositoryMock = new SaveUserRepositoryMock()
  const sut = new AddAccountImpl(addAccountRepositoryMock, saveUserRepositoryMock)
  return {
    sut,
    addAccountRepositoryMock,
    saveUserRepositoryMock,
  }
}

describe('AddAccount Use Case', () => {
  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryMock } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryMock, 'add')

    await sut.execute({
      name: 'any_name',
      username: 'any_username',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      username: 'any_username',
      email: 'any_email@mail.com',
      password: 'any_password',
    })
  })

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryMock } = makeSut()
    jest.spyOn(addAccountRepositoryMock, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.execute({
      name: 'any_name',
      username: 'any_username',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    await expect(promise).rejects.toThrow()
  })

  it('should call SaveUserRepository with correct values', async () => {
    const { sut, saveUserRepositoryMock } = makeSut()
    const saveSpy = jest.spyOn(saveUserRepositoryMock, 'save')

    await sut.execute({
      name: 'any_name',
      username: 'any_username',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(saveSpy).toHaveBeenCalledWith({
      userUID: 'any_user_uid',
      name: 'any_name',
      username: 'any_username',
      email: 'any_email@mail.com',
    })
  })

  it('should throw if SaveUserRepository throws', async () => {
    const { sut, saveUserRepositoryMock } = makeSut()
    jest.spyOn(saveUserRepositoryMock, 'save').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.execute({
      name: 'any_name',
      username: 'any_username',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(promise).rejects.toThrow()
  })
})