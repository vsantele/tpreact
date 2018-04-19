import firebase from 'firebase'
import 'firebase/firestore'
import config from './config'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const db = firebase.firestore()
export default firebase
