import { RemoveProductionImpl } from '@/data/usecases/production'
import { RemoveProductionRepositoryMock } from '@tests/data/mocks/production'

type SutTypes = {
  sut: RemoveProductionImpl
  removeProductionRepositoryMock: RemoveProductionRepositoryMock
}

const makeSut = (): SutTypes => {
  const removeProductionRepositoryMock = new RemoveProductionRepositoryMock()
  const sut = new RemoveProductionImpl(removeProductionRepositoryMock)
  return {
    sut,
    removeProductionRepositoryMock,
  }
}

describe('RemoveProduction usecase', () => {
  it('should call RemoveProductionRepository with correct values', async () => {
    const { sut, removeProductionRepositoryMock } = makeSut()
    const removeSpy = jest.spyOn(removeProductionRepositoryMock, 'remove')

    await sut.execute('any_production_id')

    expect(removeSpy).toHaveBeenCalledWith('any_production_id')
  })

  it('should throw if RemoveProductionRepository throws', async () => {
    const { sut, removeProductionRepositoryMock } = makeSut()
    jest
      .spyOn(removeProductionRepositoryMock, 'remove')
      .mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.execute('any_production_id')

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
