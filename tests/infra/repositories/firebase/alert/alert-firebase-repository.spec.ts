import type { AddAlertRepository } from '@/data/contracts/alert'
import { AlertFirebaseRepository } from '@/infra/repositories/firebase/alert'
import { addDoc, collection } from 'firebase/firestore'

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

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
}))

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

describe('AlertFirebaseRepository', () => {
  describe('add()', () => {
    it('should add a alert on success', async () => {
      const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
      const withConverterMock = jest
        .fn()
        .mockReturnValue(mockedCollectionWithConverter)
      ;(collection as jest.Mock).mockReturnValue({
        withConverter: withConverterMock,
      })
      const params: AddAlertRepository.Params = {
        message: 'any_message',
        productId: 'any_product_id',
        userId: 'any_user_id',
        type: 'sales',
        read: false,
      }
      const sut = new AlertFirebaseRepository()

      await sut.add(params)

      expect(addDoc).toHaveBeenCalledWith(mockedCollectionWithConverter, {
        ...params,
        createdAt: 'any_timestamp',
        updatedAt: 'any_timestamp',
      })
    })
  })
})
