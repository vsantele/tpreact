import config from './config'
var firebase = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
var firestore = firebase.firestore()
firestore.settings({timestampsInSnapshots: true})
export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const db = firestore
// export default firebase
