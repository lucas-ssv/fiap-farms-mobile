import { LoadProductsImpl } from '@/data/usecases/product'
import { LoadProductsRepositoryStub } from '@tests/data/mocks/product'
import { mockProductsResult } from '@tests/data/mocks/product/mocks'

jest.useFakeTimers()

type SutTypes = {
  sut: LoadProductsImpl
  loadProductsRepositoryStub: LoadProductsRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadProductsRepositoryStub = new LoadProductsRepositoryStub()
  const sut = new LoadProductsImpl(loadProductsRepositoryStub)
  return {
    sut,
    loadProductsRepositoryStub,
  }
}

describe('LoadProducts usecase', () => {
  it('should call LoadProductsRepository with correct values', async () => {
    const { sut, loadProductsRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadProductsRepositoryStub, 'loadAll')

    await sut.execute()

    expect(loadAllSpy).toHaveBeenCalled()
  })

  it('should return a list of products on success', async () => {
    const { sut } = makeSut()

    const products = await sut.execute()

    expect(products).toEqual(mockProductsResult())
  })

  it('should throw if LoadProductsRepository throws', async () => {
    const { sut, loadProductsRepositoryStub } = makeSut()
    jest
      .spyOn(loadProductsRepositoryStub, 'loadAll')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute()

    await expect(promise).rejects.toThrow()
  })
})
