import config from './config'
var firebase = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
var firestore = firebase.firestore()
var auth = firebase.auth()
auth.useDeviceLanguage()
var provider = new firebase.auth.GoogleAuthProvider()
//provider.addScope('https://www.googleapis.com/auth/userinfo.profile')
firestore.settings({timestampsInSnapshots: true})
export { provider, auth }
export const db = firestore
// export default firebase
