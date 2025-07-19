import { WatchGoalsImpl } from '@/data/usecases/goal'
import { WatchGoalsRepositoryStub } from '@tests/data/mocks/goal'

type SutTypes = {
  sut: WatchGoalsImpl
  watchGoalsRepositoryStub: WatchGoalsRepositoryStub
}

const makeSut = (): SutTypes => {
  const watchGoalsRepositoryStub = new WatchGoalsRepositoryStub()
  const sut = new WatchGoalsImpl(watchGoalsRepositoryStub)
  return {
    sut,
    watchGoalsRepositoryStub,
  }
}

describe('WatchGoals usecase', () => {
  it('should call WatchGoalsRepository with correct values', async () => {
    const { sut, watchGoalsRepositoryStub } = makeSut()
    const watchAllSpy = jest.spyOn(watchGoalsRepositoryStub, 'watchAll')
    const onChange = jest.fn()

    sut.execute(onChange)

    expect(watchAllSpy).toHaveBeenCalledWith(onChange)
  })

  it('should return an unsubscribe function', async () => {
    const { sut, watchGoalsRepositoryStub } = makeSut()
    const unsubscribeSpy = jest.fn()
    jest
      .spyOn(watchGoalsRepositoryStub, 'watchAll')
      .mockReturnValueOnce(unsubscribeSpy)
    const onChange = jest.fn()

    const unsubscribe = sut.execute(onChange)

    expect(unsubscribe).toBe(unsubscribeSpy)
  })
})
