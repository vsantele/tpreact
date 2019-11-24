const admin = require('firebase-admin')
const serviceAccount = require('../tpneerandais-firebase-adminsdk-5n1j8-d0eb297df6.json')

const data = require('./vocAnglais.min.json')
const headers = [
  {value: 'fr', label: 'Anglais', question: false, afficher: true},
  {value: 'an', label: 'français', question: false, afficher: true}
]
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tpneerandais.firebaseio.com'
})
admin.firestore().collection('tp').doc('vocAnglais').set({tp: data, headers: headers, length: data.length})
