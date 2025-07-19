import { AddProductionRepositoryMock } from '@tests/data/mocks/production'
import { mockAddProductionParams } from './mocks'
import { AddProductionImpl } from '@/data/usecases/production'

type SutTypes = {
  sut: AddProductionImpl
  addProductionRepositoryMock: AddProductionRepositoryMock
}

const makeSut = (): SutTypes => {
  const addProductionRepositoryMock = new AddProductionRepositoryMock()
  const sut = new AddProductionImpl(addProductionRepositoryMock)
  return {
    sut,
    addProductionRepositoryMock,
  }
}

describe('AddProduction usecase', () => {
  it('should call AddProductionRepository with correct values', async () => {
    const { sut, addProductionRepositoryMock } = makeSut()
    const addSpy = jest.spyOn(addProductionRepositoryMock, 'add')
    const params = mockAddProductionParams()

    await sut.execute(params)

    expect(addSpy).toHaveBeenCalledWith(params)
  })

  it('should throw if AddProductionRepository throws', async () => {
    const { sut, addProductionRepositoryMock } = makeSut()
    jest
      .spyOn(addProductionRepositoryMock, 'add')
      .mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.execute(mockAddProductionParams())

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
