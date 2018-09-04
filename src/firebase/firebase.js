import config from './config'
var firebase = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
var firestore = firebase.firestore()
firestore.settings({timestampsInSnapshots: true})
var auth = firebase.auth()
auth.useDeviceLanguage()
var provider = new firebase.auth.GoogleAuthProvider()
export { provider, auth }
export const db = firestore
// export const functions = firebase.functions()
// export default firebase
