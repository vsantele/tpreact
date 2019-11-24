import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as cors from 'cors'
import * as xljs from 'exceljs'
cors({
  origin: true
})
// require('cors')({
//   origin: true
// });
// var gcloud = gcloud.storage({
//   projectId: 'tpneerandais',
//   keyFilename: '../tpneerandais-firebase-adminsdk-5n1j8-d0eb297df6.json'
// });
admin.initializeApp()
const db = admin.firestore()
db.settings({timestampsInSnapshots: true})
// var bucket = admin.storage().bucket()
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const publicList = functions.region('europe-west1').firestore
  .document('/users/{userId}/lists/{listId}')
  .onCreate( async (change, context) => {
    const value = change.data()
    const isPrivate = value.private
    const userId = context.params.userId
    const listId = context.params.listId
    if (isPrivate) return null
    const auteur = db
      .collection('users').doc(userId).get()
      .then(snap => {
        return snap.data().displayName
      })
      .catch(error => {
        console.error('impossible de récupérer auteur de la liste,', error)
        return userId
      })
    const newList = db.collection('lists').doc()
    newList
      .set({auteur: auteur,name: value.name, id: newList.id, tps: value.tps, listId: listId, token: value.token, timestamp: value.timestamp})
      .then((res) => console.log('list créée',res))
      .catch(error => console.error('Impossible d\'ajouter la list avec l\'ID ' + value.id + ' dans la partie public qui porte l\'ID' + newList.id, error))
      return newList
  })

export const addListWithCode = functions.region('europe-west1').https.onRequest((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*') 
  if (req.method !== "POST") {
    console.log("Forbidden!")
    return res.sendStatus(403)
  }
  let value = req.body
  if (!value) {
    value = req.query
  }
  const token = String(value.token)
  if (token.length !== 5) {
    console.log('Format token incorrect')
     return res.status(500).send('Format token incorrect')
   }
   return db
     .collection('lists')
     .where("token", '==', token)
     .limit(1)
     .get()
     .then(snap => {
       try {
         if (snap.docs.length === 0) {
           throw new functions.https.HttpsError('not-found', 'token incorrect')
         } else {
           const list = snap.docs[0].data()
           console.log("info Send")
           return res.status(200).send({tps: list.tps, lang: list.lang})
         }
       } catch (error) {
         console.error("catch error", error)
         return res.status(500).send(String(error))
       }
         
     })
     .catch(error => {
       console.log(error)
       return res.status(500).send(String(error))
     })
   })

export const createSheet = functions.region('europe-west1').https.onRequest(async (req, res) => {      
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  // const cols = [
  //   {value: 'infNl', label: 'Infinitif néerlandais'},
  //   {value: 'OVT', label: 'Imparfait'},
  //   {value: 'PP', label: 'Participe passé'},
  //   {value: 'infFr', label: 'Infinitif français'}
  // ]
  let value = req.body
  if (!value) {
    value = req.query
  }
  
  try {
    let dlLimit = await db.collection('users').doc(value.user).get().then(data => data.data().dlLimit)

    if (dlLimit > 0) {
      const Tp = await db.collection('tp').doc(value.lang).get().then(snap => snap.data())
      const wbjs = new xljs.Workbook()
      wbjs.created = new Date()
      wbjs.creator = 'https://flamboyant-chandrasekhar-71d621.netlify.com'
      const wsjs = wbjs.addWorksheet('feuille 1')
      const cols = Tp.headers
      const colSheet = cols.map(col => {
        return {
          header:col.label, key: col.value, width: 25, style: {font: {size: 12}, alignement: {horizontal: 'center'}}
        }
      })
      wsjs.columns = colSheet
      const headerRow = wsjs.getRow(1)
      headerRow.eachCell((cell) => {
        cell.font = {bold: true, size: 14}
        cell.border= {
          top: {style:'medium'},
          left: {style:'medium'},
          right: {style:'medium'},
          bottom: {style:'medium'}
        }
        cell.alignment= {horizontal: 'center'}
      })
      
      Tp.tp.filter(tp=> value.list.indexOf(tp.id) !== -1).map(tp => {
        wsjs.addRow(
          cols.map(col => {
            return tp[col.value]
          })
        ).eachCell(cell => {
          cell.border = {
            top: {style:'thin'},
            left: {style:'thin'},
            right: {style:'thin'},
            bottom: {style:'thin'}
          }
          cell.alignment= {horizontal: 'center'}
        })
      })
      res.attachment('Liste Tp.xlsx')
      wbjs.xlsx.write(res)
      .then(() => {
        dlLimit--
        db.collection('users').doc(value.user).update({dlLimit: dlLimit}).then(() => res.end()).catch((e) => {if(e) res.status(500).send('Erreur envoie fichier')})
      })
      .catch(e => {
        console.error('WriteFile Failed', e)
        res.status(500).send('Erreur écriture fichier')
      })
    } else {
      res.status(500).send(Error('Vous ne pouvez plus télécharger de fichier pour ce mois-ci...'))
    }
  } catch (e) {
    res.status(500).send(String(e))
    console.error(e)
  }

})

export const ResetDlLimit = functions.pubsub.topic('monthly-tick').onPublish((msg) => {
  return db.collection('users').get().then(snap => {
    const batch = db.batch()
    snap.forEach(user => {
      batch.update(user.ref,{dlLimit:10})
    })
    return batch.commit()
  }).then(() => {
    console.log('Reset dlLimit okay!')
  }).catch(e => {
    console.error('Reset dlLimit Failed :\'(', e)
  })
})