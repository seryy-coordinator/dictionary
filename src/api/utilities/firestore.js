let firestore

export function initFirestore(firestoreInstance) {
  firestore = firestoreInstance
}

export function getFirestore() {
  return firestore
}
