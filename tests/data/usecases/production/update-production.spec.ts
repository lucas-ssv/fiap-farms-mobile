import { UpdateProductionImpl } from '@/data/usecases/production'
import type { UpdateProduction } from '@/domain/usecases/production'
import { AddAlertRepositoryMock } from '@tests/data/mocks/alert/mock-add-alert-repository'
import { LoadGoalsByUserIdRepositoryMock } from '@tests/data/mocks/goal/mock-load-goals-by-user-id-repository'
import { UpdateGoalRepositoryMock } from '@tests/data/mocks/goal/mock-update-goal-repository'
import {
  LoadByProductIdRepositoryMock,
  UpdateProductRepositoryMock,
} from '@tests/data/mocks/product'
import { UpdateProductionRepositoryMock } from '@tests/data/mocks/production'

type SutTypes = {
  sut: UpdateProduction
  updateProductionRepositoryMock: UpdateProductionRepositoryMock
  loadGoalsByUserIdRepositoryMock: LoadGoalsByUserIdRepositoryMock
  updateGoalRepositoryMock: UpdateGoalRepositoryMock
  addAlertRepositoryMock: AddAlertRepositoryMock
}

const makeSut = (): SutTypes => {
  const updateProductionRepositoryMock = new UpdateProductionRepositoryMock()
  const loadGoalsByUserIdRepositoryMock = new LoadGoalsByUserIdRepositoryMock()
  const updateGoalRepositoryMock = new UpdateGoalRepositoryMock()
  const addAlertRepositoryMock = new AddAlertRepositoryMock()
  const loadByProductIdRepositoryMock = new LoadByProductIdRepositoryMock()
  const updateProductRepositoryMock = new UpdateProductRepositoryMock()
  const sut = new UpdateProductionImpl(
    updateProductionRepositoryMock,
    loadGoalsByUserIdRepositoryMock,
    updateGoalRepositoryMock,
    addAlertRepositoryMock,
    loadByProductIdRepositoryMock,
    updateProductRepositoryMock
  )
  return {
    sut,
    updateProductionRepositoryMock,
    loadGoalsByUserIdRepositoryMock,
    updateGoalRepositoryMock,
    addAlertRepositoryMock,
  }
}

describe('UpdateProduction usecase', () => {
  it('should call UpdateProductionRepository with correct values', async () => {
    const { sut, updateProductionRepositoryMock } = makeSut()
    const updateSpy = jest.spyOn(updateProductionRepositoryMock, 'update')
    const params: UpdateProduction.Params = {
      status: 'harvested',
    }

    await sut.execute('any_production_id', params)

    expect(updateSpy).toHaveBeenCalledWith('any_production_id', {
      status: 'harvested',
    })
  })

  it('should throw if UpdateProductionRepository throws', async () => {
    const { sut, updateProductionRepositoryMock } = makeSut()
    jest
      .spyOn(updateProductionRepositoryMock, 'update')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute('any_production_id', {
      status: 'in_production',
    })

    await expect(promise).rejects.toThrow()
  })
})
