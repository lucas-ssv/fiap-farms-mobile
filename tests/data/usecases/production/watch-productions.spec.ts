import { WatchProductionsImpl } from '@/data/usecases/production'
import { WatchProductionsRepositoryStub } from '@tests/data/mocks/production'

type SutTypes = {
  sut: WatchProductionsImpl
  watchProductionsRepositoryStub: WatchProductionsRepositoryStub
}

const makeSut = (): SutTypes => {
  const watchProductionsRepositoryStub = new WatchProductionsRepositoryStub()
  const sut = new WatchProductionsImpl(watchProductionsRepositoryStub)
  return {
    sut,
    watchProductionsRepositoryStub,
  }
}

describe('WatchProductions usecase', () => {
  it('should call WatchProductionsRepository with correct values', async () => {
    const { sut, watchProductionsRepositoryStub } = makeSut()
    const watchAllSpy = jest.spyOn(watchProductionsRepositoryStub, 'watchAll')
    const onChange = jest.fn()

    sut.execute(onChange)

    expect(watchAllSpy).toHaveBeenCalledWith(onChange)
  })

  it('should return an unsubscribe function', async () => {
    const { sut, watchProductionsRepositoryStub } = makeSut()
    const unsubscribeSpy = jest.fn()
    jest
      .spyOn(watchProductionsRepositoryStub, 'watchAll')
      .mockReturnValueOnce(unsubscribeSpy)
    const onChange = jest.fn()

    const unsubscribe = sut.execute(onChange)

    expect(unsubscribe).toBe(unsubscribeSpy)
  })
})
