import { collection, addDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore/lite'

import { getFirestore } from '../utilities/firestore.js'

const getElement = (snapshot) => ({ ...snapshot.data(), _id: snapshot.id })

export default class Base {
  constructor(collectionPath) {
    this.collectionPath = collectionPath
  }

  get firestore() {
    return getFirestore()
  }

  get collectionRef() {
    return collection(this.firestore, this.collectionPath)
  }

  async create(data, id = null, returnData = false) {
    try {
      let docRef
      if (id) {
        docRef = doc(this.collectionRef, id)
        await setDoc(docRef, data)
      } else {
        docRef = await addDoc(this.collectionRef, data)
      }
      return returnData ? this.read(docRef) : true
    } catch (error) {
      throw new Error(error)
    }
  }

  // async update(id, data) {
  //   await this.firestore.collection(this.collectionPath).doc(id).update(data)
  // }

  async read(reference) {
    try {
      const docRef = typeof reference === 'string' ? doc(this.collectionRef, reference) : reference
      const snapshot = await getDoc(docRef)
      return getElement(snapshot)
    } catch (error) {
      throw new Error(error)
    }
  }

  // delete(id) {
  //   try {
  //     return this.collectionRef.doc(id).delete()
  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // }

  // readCollection() {
  //   try {
  //     return this.collectionRef.get()
  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // }

  // async query({ options, limit = null }) {
  //   const collection = this.collectionRef
  //   let query = collection
  //   options.forEach((option) => {
  //     query = query.where(...option)
  //   })
  //   if (limit) {
  //     query = query.limit(limit)
  //   }
  //   const result = await query.get()
  //   return result.docs.map((ref) => {
  //     return {
  //       _id: ref.id,
  //       ...ref.data(),
  //     }
  //   })
  // }

  // listener(callback) {
  //   const collection = this.collectionRef
  //   return collection.onSnapshot((snapshot) => {
  //     /**
  //      * The number of documents in the QuerySnapshot
  //      */
  //     const snapshotSize = snapshot.size
  //     if (snapshotSize === 0) {
  //       const event = { size: snapshotSize, done: true }
  //       callback(event)
  //     } else {
  //       snapshot.docChanges().forEach((change, index) => {
  //         const { type, doc } = change
  //         const event = {
  //           change: type,
  //           doc: { _id: doc.id, ...doc.data() },
  //           size: snapshotSize,
  //           done: snapshotSize === index + 1, // Let us know if listener pulled all snapshot rows
  //         }
  //         callback(event)
  //       })
  //     }
  //   })
  // }

  /**
   * Setup a collection listener to listen to the changes of the collection.
   *
   * @param {Function} callback The callback function to be called when the collection changes.
   * @param {Object} options The options to be passed to the listener.
   *
   * @example
   * options: [['permissions', '==', []]]
   */
  // listenerWithQuery(callback, { options }) {
  //   const collection = this.collectionRef
  //   let query = collection
  //   options.forEach((option) => {
  //     query = query.where(...option)
  //   })
  //   return query.onSnapshot((snapshot) => {
  //     const snapshotSize = snapshot.size // The number of documents in the QuerySnapshot
  //     if (snapshotSize === 0) {
  //       const event = { size: snapshotSize, done: true }
  //       callback(event)
  //     } else {
  //       snapshot.docChanges().forEach((change, index) => {
  //         const { type, doc } = change
  //         const event = {
  //           change: type,
  //           doc: { _id: doc.id, ...doc.data() },
  //           size: snapshotSize,
  //           done: snapshotSize === index + 1, // Let us know if listener pulled all snapshot rows
  //         }
  //         callback(event)
  //       })
  //     }
  //   })
  // }

  async getAll() {
    try {
      const snapshot = await getDocs(this.collectionRef)
      return snapshot.docs.map(getElement)
    } catch (error) {
      throw new Error(error)
    }
  }

  // setAll(data) {
  //   data.forEach((item) => {
  //     this.firestore.collection(this.collectionPath).doc(item._id).set(item)
  //   })
  // }
}
