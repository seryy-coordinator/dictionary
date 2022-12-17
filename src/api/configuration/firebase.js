import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

import { initFirestore } from '../utilities/firestore.js'

const firebaseConfig = {
  apiKey: 'AIzaSyDa5mKTcgnSlupOvrLSH9v-a1VfeK_x_54',
  authDomain: 'greydictionary.firebaseapp.com',
  databaseURL: 'https://greydictionary-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'greydictionary',
  storageBucket: 'greydictionary.appspot.com',
  messagingSenderId: '696278819070',
  appId: '1:696278819070:web:3f2889c6a7a8b3252305af',
  measurementId: 'G-6FF3KXWFP3',
}

export function initializeFirebase() {
  const app = initializeApp(firebaseConfig)
  const firestore = getFirestore(app)
  initFirestore(firestore)
}
