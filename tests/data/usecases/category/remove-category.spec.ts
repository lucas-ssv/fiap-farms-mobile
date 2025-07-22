import { RemoveCategoryImpl } from "@/data/usecases/category"
import { RemoveCategoryRepositoryMock } from "@tests/data/mocks/category"

type SutTypes = {
  sut: RemoveCategoryImpl
  removeCategoryRepositoryMock: RemoveCategoryRepositoryMock
}

const makeSut = (): SutTypes => {
  const removeCategoryRepositoryMock = new RemoveCategoryRepositoryMock()
  const sut = new RemoveCategoryImpl(removeCategoryRepositoryMock)
  return {
    sut,
    removeCategoryRepositoryMock,
  }
}

describe('RemoveCategory usecase', () => {
  it('should call RemoveCategoryRepository with correct values', async () => {
    const { sut, removeCategoryRepositoryMock } = makeSut()
    const removeSpy = jest.spyOn(removeCategoryRepositoryMock, 'remove')

    await sut.execute('any_category_id')

    expect(removeSpy).toHaveBeenCalledWith('any_category_id')
  })

  it('should throw if RemoveCategoryRepository throws', async () => {
    const { sut, removeCategoryRepositoryMock } = makeSut()
    jest
      .spyOn(removeCategoryRepositoryMock, 'remove')
      .mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.execute('any_category_id')

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
