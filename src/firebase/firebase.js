import {initializeApp, apps, auth as Auth, firestore} from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from './config'

if (!apps.length) {
  initializeApp(config)
}

export const provider = new Auth.GoogleAuthProvider()
export const auth = Auth()
export const db = firestore()
// export default firebase
