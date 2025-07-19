import { initializeApp, type FirebaseOptions } from 'firebase/app'
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

import { ENV } from '@/main/config'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig: FirebaseOptions = {
  apiKey: ENV.API_KEY,
  projectId: ENV.PROJECT_ID,
  appId: ENV.APP_ID,
  storageBucket: ENV.BUCKET_URL,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)

export const db = getFirestore()

export const storage = getStorage(app, ENV.BUCKET_URL)
