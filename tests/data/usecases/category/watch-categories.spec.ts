import { WatchCategoriesImpl } from "@/data/usecases/category";
import { WatchCategoriesRepositoryStub } from "@tests/data/mocks/category";

type SutTypes = {
  sut: WatchCategoriesImpl
  watchCategoriesRepositoryStub: WatchCategoriesRepositoryStub
}

const makeSut = (): SutTypes => {
  const watchCategoriesRepositoryStub = new WatchCategoriesRepositoryStub()
  const sut = new WatchCategoriesImpl(watchCategoriesRepositoryStub)
  return {
    sut,
    watchCategoriesRepositoryStub,
  }
}

describe('WatchCategories usecase', () => {
  it('should call WatchCategoriesRepository with correct values', async () => {
    const { sut, watchCategoriesRepositoryStub } = makeSut()
    const watchAllSpy = jest.spyOn(watchCategoriesRepositoryStub, 'watchAll')
    const onChange = jest.fn()

    sut.execute(onChange)

    expect(watchAllSpy).toHaveBeenCalledWith(onChange)
  })

  it('should return an unsubscribe function', async () => {
    const { sut, watchCategoriesRepositoryStub } = makeSut()
    const unsubscribeSpy = jest.fn()
    jest
      .spyOn(watchCategoriesRepositoryStub, 'watchAll')
      .mockReturnValueOnce(unsubscribeSpy)
    const onChange = jest.fn()

    const unsubscribe = sut.execute(onChange)

    expect(unsubscribe).toBe(unsubscribeSpy)
  })
});