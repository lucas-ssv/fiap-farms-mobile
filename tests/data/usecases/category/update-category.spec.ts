import { UpdateCategoryImpl } from '@/data/usecases/category'
import type { UpdateCategory } from '@/domain/usecases/category'
import { UpdateCategoryRepositoryMock } from '@tests/data/mocks/category'
import { UploadServiceMock } from '@tests/data/mocks/services'

jest.useFakeTimers()

type SutTypes = {
  sut: UpdateCategory
  updateCategoryRepositoryMock: UpdateCategoryRepositoryMock
  uploadServiceMock: UploadServiceMock
}

const makeSut = (): SutTypes => {
  const updateCategoryRepositoryMock = new UpdateCategoryRepositoryMock()
  const uploadServiceMock = new UploadServiceMock()
  const sut = new UpdateCategoryImpl(updateCategoryRepositoryMock, uploadServiceMock)
  return {
    sut,
    updateCategoryRepositoryMock,
    uploadServiceMock,
  }
}

describe('UpdateCategory usecase', () => {
  it('should call UploadService with correct values if image is provided', async () => {
    const { sut, uploadServiceMock } = makeSut()
    const uploadSpy = jest.spyOn(uploadServiceMock, 'upload')
    const params: UpdateCategory.Params = {
      image: 'any_image',
    }

    await sut.execute('any_product_id', params)

    expect(uploadSpy).toHaveBeenCalledWith(
      'any_image',
      'categories'
    )
  })

  it('should call UpdateCategoryRepository with correct values', async () => {
    const { sut, updateCategoryRepositoryMock } = makeSut()
    const updateSpy = jest.spyOn(updateCategoryRepositoryMock, 'update')
    const params = {
      image: 'any_image',
    }

    await sut.execute('any_category_id', params)

    expect(updateSpy).toHaveBeenCalledWith('any_category_id', params)
  })

  it('should not call UploadService if there is no image', async () => {
    const { sut, uploadServiceMock } = makeSut()
    const uploadSpy = jest.spyOn(uploadServiceMock, 'upload')

    await sut.execute('any_product_id', {
      description: 'any_description',
      name: 'any_name',
    })

    expect(uploadSpy).not.toHaveBeenCalled()
  })

  it('should throw if UpdateCategoryRepository throws', async () => {
    const { sut, updateCategoryRepositoryMock } = makeSut()
    jest
      .spyOn(updateCategoryRepositoryMock, 'update')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute('any_category_id', {
      image: 'any_image',
    })

    await expect(promise).rejects.toThrow()
  })
})
