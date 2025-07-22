import { initializeApp, type FirebaseOptions } from 'firebase/app'
import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth'
import { getStorage } from 'firebase/storage'

import { ENV } from '@/main/config'
import { getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig: FirebaseOptions = {
  apiKey: ENV.API_KEY,
  projectId: ENV.PROJECT_ID,
  appId: ENV.APP_ID,
  storageBucket: ENV.BUCKET_URL,
}

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export const db = getFirestore()

export const storage = getStorage(app, ENV.BUCKET_URL)
