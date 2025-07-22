import { LoadCategoriesImpl } from '@/data/usecases/category'
import { LoadCategoriesRepositoryStub } from '@tests/data/mocks/category'
import { mockCategoriesResult } from '@tests/data/mocks/category/mocks'

jest.useFakeTimers()

type SutTypes = {
  sut: LoadCategoriesImpl
  loadCategoriesRepositoryStub: LoadCategoriesRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadCategoriesRepositoryStub = new LoadCategoriesRepositoryStub()
  const sut = new LoadCategoriesImpl(loadCategoriesRepositoryStub)
  return {
    sut,
    loadCategoriesRepositoryStub,
  }
}

describe('LoadCategories usecase', () => {
  it('should call LoadCategoriesRepository', async () => {
    const { sut, loadCategoriesRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadCategoriesRepositoryStub, 'loadAll')

    await sut.execute()

    expect(loadAllSpy).toHaveBeenCalled()
  })

  it('should return a list of categories on success', async () => {
    const { sut } = makeSut()

    const categories = await sut.execute()

    expect(categories).toEqual(mockCategoriesResult())
  })

  it('should throw if LoadCategoriesRepository throws', async () => {
    const { sut, loadCategoriesRepositoryStub } = makeSut()
    jest
      .spyOn(loadCategoriesRepositoryStub, 'loadAll')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute()

    await expect(promise).rejects.toThrow()
  })
})
