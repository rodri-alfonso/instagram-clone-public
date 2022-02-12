import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: '', //set your api key
  authDomain: '', //set your auth domain
  projectId: '', //set your project id
  storageBucket: '', //set your storage bucket
  messagingSenderId: '', //set your messaging sender id
  appId: '', //set your app id
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
