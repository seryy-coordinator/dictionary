import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

import { initFirestore } from './firestore.js'
import { initAuth } from './auth.js'

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

export async function initializeFirebase() {
  return new Promise((resolve) => {
    const app = initializeApp(firebaseConfig)

    const auth = getAuth(app)
    initAuth(auth)

    const firestore = getFirestore(app)
    initFirestore(firestore)

    auth.onAuthStateChanged((user) => {
      resolve(user)
    })
  })
}
