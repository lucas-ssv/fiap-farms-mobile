import { AddStockMovementRepositoryMock } from '@tests/data/mocks/stock-movement'
import { mockAddStockMovementParams } from './mocks'
import { AddStockMovementImpl } from '@/data/usecases/stock-movement'

type SutTypes = {
  sut: AddStockMovementImpl
  addStockMovementRepositoryMock: AddStockMovementRepositoryMock
}

const makeSut = (): SutTypes => {
  const addStockMovementRepositoryMock = new AddStockMovementRepositoryMock()
  const sut = new AddStockMovementImpl(addStockMovementRepositoryMock)
  return {
    sut,
    addStockMovementRepositoryMock,
  }
}

describe('AddStockMovement usecase', () => {
  it('should call AddStockMovementRepository with correct values', async () => {
    const { sut, addStockMovementRepositoryMock } = makeSut()
    const addSpy = jest.spyOn(addStockMovementRepositoryMock, 'add')
    const params = mockAddStockMovementParams()

    await sut.execute(params)

    expect(addSpy).toHaveBeenCalledWith(params)
  })

  it('should throw if AddStockMovementRepository throws', async () => {
    const { sut, addStockMovementRepositoryMock } = makeSut()
    jest
      .spyOn(addStockMovementRepositoryMock, 'add')
      .mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.execute(mockAddStockMovementParams())

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
