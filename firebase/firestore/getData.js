const admin = require('firebase-admin')
const serviceAccount = require('../tpneerandais-firebase-adminsdk-5n1j8-d0eb297df6.json')
const fs = require('fs')

// const data = require('./tpAnglais.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tpneerandais.firebaseio.com'
})
admin.firestore().collection('tp').doc('neerlandais').get().then(data => fs.writeFile('tpNeerlandais.json', JSON.stringify(data.data().neerlandais), (err) => console.log(err)))
