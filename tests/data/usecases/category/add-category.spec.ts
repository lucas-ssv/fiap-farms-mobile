import { AddCategoryImpl } from '@/data/usecases/category'
import {
  AddCategoryRepositoryMock,
  UpdateCategoryRepositoryMock,
} from '@tests/data/mocks/category'
import { UploadServiceMock } from '@tests/data/mocks/services'
import { mockAddCategoryParams } from './mocks'

type SutTypes = {
  sut: AddCategoryImpl
  addCategoryRepositoryMock: AddCategoryRepositoryMock
  uploadServiceMock: UploadServiceMock
  updateCategoryRepositoryMock: UpdateCategoryRepositoryMock
}

const makeSut = (): SutTypes => {
  const addCategoryRepositoryMock = new AddCategoryRepositoryMock()
  const uploadServiceMock = new UploadServiceMock()
  const updateCategoryRepositoryMock = new UpdateCategoryRepositoryMock()
  const sut = new AddCategoryImpl(
    addCategoryRepositoryMock,
    uploadServiceMock,
    updateCategoryRepositoryMock
  )
  return {
    sut,
    addCategoryRepositoryMock,
    uploadServiceMock,
    updateCategoryRepositoryMock,
  }
}

describe('AddCategory', () => {
  it('should call AddCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositoryMock } = makeSut()
    const addSpy = jest.spyOn(addCategoryRepositoryMock, 'add')
    const data = mockAddCategoryParams()

    await sut.execute(data)

    expect(addSpy).toHaveBeenCalledWith({
      name: data.name,
      description: data.description,
    })
  })

  it('should call UploadService with correct values', async () => {
    const { sut, uploadServiceMock } = makeSut()
    const uploadSpy = jest.spyOn(uploadServiceMock, 'upload')
    const data = mockAddCategoryParams()

    await sut.execute(data)

    expect(uploadSpy).toHaveBeenCalledWith(data.image, 'categories')
  })

  it('should not call UploadService if image is not provided', async () => {
    const { sut, uploadServiceMock } = makeSut()
    const uploadSpy = jest.spyOn(uploadServiceMock, 'upload')
    const data = mockAddCategoryParams()
    data.image = undefined

    await sut.execute(data)

    expect(uploadSpy).not.toHaveBeenCalled()
  })

  it('should call UpdateCategoryRepository with correct values', async () => {
    const { sut, updateCategoryRepositoryMock } = makeSut()
    const updateSpy = jest.spyOn(updateCategoryRepositoryMock, 'update')
    const data = mockAddCategoryParams()

    await sut.execute(data)

    expect(updateSpy).toHaveBeenCalledWith('any_id', {
      image: 'any_url',
    })
  })

  it('should throw if AddCategoryRepository throws', async () => {
    const { sut, addCategoryRepositoryMock } = makeSut()
    jest.spyOn(addCategoryRepositoryMock, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.execute(mockAddCategoryParams())

    await expect(promise).rejects.toThrow()
  })

  it('should throw if UploadService throws', async () => {
    const { sut, uploadServiceMock } = makeSut()
    jest.spyOn(uploadServiceMock, 'upload').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.execute(mockAddCategoryParams())

    await expect(promise).rejects.toThrow()
  })

  it('should throw if UpdateCategoryRepository throws', async () => {
    const { sut, updateCategoryRepositoryMock } = makeSut()
    jest
      .spyOn(updateCategoryRepositoryMock, 'update')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute(mockAddCategoryParams())

    await expect(promise).rejects.toThrow()
  })
})
