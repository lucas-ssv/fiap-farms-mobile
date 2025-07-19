import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore'

import { mockAddCustomerParams } from '@tests/data/usecases/customer/mocks'
import { CustomerFirebaseRepository } from '@/infra/repositories/firebase/customer'

jest.useFakeTimers()

jest.mock('@/main/config/env', () => ({
  ENV: {
    APP_ID: 'any_app_id',
    PROJECT_ID: 'any_project_id',
    API_KEY: 'any_api_key',
    BUCKET_URL: 'any_bucket_url',
  },
}))

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn().mockResolvedValue({
    user: {
      uid: "any_user_uid",
    },
  }),
  onAuthStateChanged: jest.fn().mockReturnValue(() => {}),
  signOut: jest.fn(),
  initializeAuth: jest.fn(),
  getAuth: jest.fn(),
  setPersistence: jest.fn(),
}));

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn().mockResolvedValue({ id: 'any_customer_id' }),
  collection: jest.fn(),
  query: jest.fn(),
  onSnapshot: jest.fn(),
  doc: jest.fn(),
  getDocs: jest.fn().mockResolvedValue({
    empty: false,
    forEach: (callback: any) => {
      callback({
        id: 'any_customer_id',
        data: () => ({
          id: 1,
          name: 'John Doe',
          email: 'johndue@email.com',
          phone: '123-456-7890',
          postalCode: '12345',
          city: 'Springfield',
          state: 'IL',
          neighborhood: 'Downtown',
          address: '123 Main St',
          addressNumber: 101,
          addressComplement: 'Apt 4B',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      })
    },
  }),
  getFirestore: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  Timestamp: {
    now: jest.fn(() => 'any_timestamp'),
  },
}))

describe('CustomerFirebaseRepository', () => {
  describe('add()', () => {
    it('should add a customer on success', async () => {
      const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
      const withConverterMock = jest
        .fn()
        .mockReturnValue(mockedCollectionWithConverter)
      ;(collection as jest.Mock).mockReturnValue({
        withConverter: withConverterMock,
      })
      const params = mockAddCustomerParams()
      const sut = new CustomerFirebaseRepository()

      await sut.add(params)

      expect(addDoc).toHaveBeenCalledWith(mockedCollectionWithConverter, {
        ...params,
        createdAt: 'any_timestamp',
        updatedAt: 'any_timestamp',
      })
    })
  })

  describe('loadAll()', () => {
    it('should load all customers on success', async () => {
      const sut = new CustomerFirebaseRepository()

      const customers = await sut.loadAll()

      expect(customers).toEqual([
        {
          id: 'any_customer_id',
          name: 'John Doe',
          email: 'johndue@email.com',
          phone: '123-456-7890',
          postalCode: '12345',
          address: '123 Main St',
          addressNumber: 101,
          addressComplement: 'Apt 4B',
          neighborhood: 'Downtown',
          city: 'Springfield',
          state: 'IL',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
    })
  })

  describe('update()', () => {
    it('should update a customer on success', async () => {
      const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
      const withConverterMock = jest
        .fn()
        .mockReturnValue(mockedCollectionWithConverter)
      ;(doc as jest.Mock).mockReturnValue({
        withConverter: withConverterMock,
      })
      const sut = new CustomerFirebaseRepository()
      const data = {
        name: 'any_customer_name',
      }

      await sut.update('any_customer_id', data)

      expect(updateDoc).toHaveBeenCalledWith(
        mockedCollectionWithConverter,
        data
      )
    })
  })

  describe('watchAll()', () => {
    it('should call onChange with all customers', async () => {
      const docMock = {
        id: 'any_customer_id',
        data: () => ({
          id: 'any_customer_id',
          name: 'any_customer_name',
          email: 'any_customer_email',
          phone: 'any_customer_phone',
          postalCode: 'any_postal_code',
          address: 'any_address',
          addressNumber: 123,
          addressComplement: 'any_complement',
          neighborhood: 'any_neighborhood',
          city: 'any_city',
          state: 'any_state',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      }

      const querySnapshotMock = {
        forEach: (callback: (doc: any) => void) => {
          callback(docMock)
        },
      }

      const unsubscribeMock = jest.fn()

      ;(onSnapshot as jest.Mock).mockImplementation((_q, callback) => {
        callback(querySnapshotMock)
        return unsubscribeMock
      })

      const withConverterMock = jest
        .fn()
        .mockReturnValue('mockedCollectionWithConverter')
      ;(collection as jest.Mock).mockReturnValue({
        withConverter: withConverterMock,
      })
      ;(query as jest.Mock).mockReturnValue('mock_query')

      const onChangeMock = jest.fn()

      const sut = new CustomerFirebaseRepository()
      const unsubscribe = sut.watchAll(onChangeMock)

      expect(unsubscribe).toBe(unsubscribeMock)
      expect(onSnapshot).toHaveBeenCalled()
    })
  })

  describe('remove()', () => {
    it('should remove a customer on success', async () => {
      const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
      const withConverterMock = jest
        .fn()
        .mockReturnValue(mockedCollectionWithConverter)
      ;(doc as jest.Mock).mockReturnValue({
        withConverter: withConverterMock,
      })
      const sut = new CustomerFirebaseRepository()

      await sut.remove('any_customer_id')

      expect(deleteDoc).toHaveBeenCalledWith(mockedCollectionWithConverter)
    })
  })
})
