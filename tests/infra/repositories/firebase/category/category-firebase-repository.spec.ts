import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore'

import { mockAddCategoryParams } from '@tests/data/usecases/category/mocks'
import { CategoryFirebaseRepository } from '@/infra/repositories/firebase/category'

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
  addDoc: jest.fn().mockResolvedValue({ id: 'any_category_id' }),
  collection: jest.fn(),
  query: jest.fn(),
  onSnapshot: jest.fn().mockImplementation((_, callback) => {
    callback({
      docs: [
        {
          id: 'any_category_id',
          data: () => ({
            id: 'any_category_id',
            name: 'any_category_name',
            description: 'any_category_description',
            image: 'any_category_image',
            createdAt: 'any_timestamp',
            updatedAt: 'any_timestamp',
          }),
        },
      ],
    })
    return jest.fn()
  }),
  doc: jest.fn(),
  getDocs: jest.fn().mockResolvedValue({
    empty: false,
    forEach: (callback: any) => {
      callback({
        id: 'any_category_id',
        data: () => ({
          id: '1',
          name: 'Fruits',
          description: 'Fresh fruits',
          image: 'fruit.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      })
      callback({
        id: 'any_category_id',
        data: () => ({
          id: '2',
          name: 'Vegetables',
          description: 'Organic vegetables',
          image: 'vegetable.jpg',
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

describe('CategoryFirebaseRepository', () => {
  describe('add()', () => {
    it('should add a category on success', async () => {
      const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
      const withConverterMock = jest
        .fn()
        .mockReturnValue(mockedCollectionWithConverter)
      ;(collection as jest.Mock).mockReturnValue({
        withConverter: withConverterMock,
      })
      const params = mockAddCategoryParams()
      const sut = new CategoryFirebaseRepository()

      await sut.add(params)

      expect(addDoc).toHaveBeenCalledWith(mockedCollectionWithConverter, {
        ...params,
        createdAt: 'any_timestamp',
        updatedAt: 'any_timestamp',
      })
    })

    it('should return a category id on success', async () => {
      const sut = new CategoryFirebaseRepository()

      const categoryId = await sut.add(mockAddCategoryParams())

      expect(categoryId).toBe('any_category_id')
    })
  })

  describe('update()', () => {
    it('should update a category on success', async () => {
      const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
      const withConverterMock = jest
        .fn()
        .mockReturnValue(mockedCollectionWithConverter)
      ;(doc as jest.Mock).mockReturnValue({
        withConverter: withConverterMock,
      })
      const sut = new CategoryFirebaseRepository()
      const data = {
        image: 'any_image',
      }

      await sut.update('any_category_id', data)

      expect(updateDoc).toHaveBeenCalledWith(
        mockedCollectionWithConverter,
        data
      )
    })
  })

  describe('loadAll()', () => {
    it('should load all categories on success', async () => {
      const sut = new CategoryFirebaseRepository()

      const categories = await sut.loadAll()

      expect(categories).toEqual([
        {
          id: 'any_category_id',
          name: 'Fruits',
          description: 'Fresh fruits',
          image: 'fruit.jpg',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: 'any_category_id',
          name: 'Vegetables',
          description: 'Organic vegetables',
          image: 'vegetable.jpg',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })
  })

  describe('watchAll()', () => {
    it('should call onChange with all categories', async () => {
      const docMock = {
        id: 'any_category_id',
        data: () => ({
          name: 'any_name',
          description: 'any_description',
          image: 'any_image',
          createdAt: 'any_createdAt',
          updatedAt: 'any_updatedAt',
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

      const sut = new CategoryFirebaseRepository()
      const unsubscribe = sut.watchAll(onChangeMock)

      expect(unsubscribe).toBe(unsubscribeMock)
      expect(onSnapshot).toHaveBeenCalled()
    })
  })

  describe('remove()', () => {
    it('should remove a category on success', async () => {
      const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
      const withConverterMock = jest
        .fn()
        .mockReturnValue(mockedCollectionWithConverter)
      ;(doc as jest.Mock).mockReturnValue({
        withConverter: withConverterMock,
      })
      const sut = new CategoryFirebaseRepository()

      await sut.remove('any_category_id')

      expect(deleteDoc).toHaveBeenCalledWith(mockedCollectionWithConverter)
    })
  });
})
