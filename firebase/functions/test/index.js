// content of index.js
const http = require('http')
const xljs = require('exceljs')
const fs = require('fs')
const port = 3001

const requestHandler = (req, res) => {
  // console.log(req.url)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  // const cols = [
  //   {value: 'infNl', label: 'Infinitif néerlandais'},
  //   {value: 'OVT', label: 'Imparfait'},
  //   {value: 'PP', label: 'Participe passé'},
  //   {value: 'infFr', label: 'Infinitif français'}
  // ]
  let value = req.query
  if (!value) {
    value = req.body
  }
  console.log(req.query)
  fs.writeFile('log.txt', req.body, (e) => console.log(e))
  // res.end(req)
  // const Tp = JSON.parse(fs.readFileSync('./tp.json', 'utf8'))
  // const cols = [
  //   {value: 'infNl', label: 'Infinitif néerlandais'},
  //   {value: 'OVT', label: 'Imparfait'},
  //   {value: 'PP', label: 'Participe passé'},
  //   {value: 'infFr', label: 'Infinitif français'}
  // ]
  // fs.unlink('test.xlsx', err => console.log(err))
  // const wbjs = new xljs.Workbook()
  // wbjs.created = new Date()
  // wbjs.creator = 'https://flamboyant-chandrasekhar-71d621.netlify.com'
  // const wsjs = wbjs.addWorksheet('feuille 1')
  // const colSheet = cols.map(col => {
  //   return {
  //     header: col.label, key: col.value, width: 25, style: {font: {size: 12}, alignement: {horizontal: 'center'}}
  //   }
  // })
  // wsjs.columns = colSheet
  // const headerRow = wsjs.getRow(1)
  // headerRow.eachCell((cell) => {
  //   cell.font = {bold: true, size: 14}
  //   cell.border = {
  //     top: {style: 'medium'},
  //     left: {style: 'medium'},
  //     right: {style: 'medium'},
  //     bottom: {style: 'medium'}
  //   }
  //   cell.alignment = {horizontal: 'center'}
  // })
  // Tp.filter(tp => value.list.indexOf(tp.id) !== -1).map(tp => {
  //   wsjs.addRow(
  //     cols.map(col => {
  //       return tp[col.value]
  //     })
  //   ).eachCell(cell => {
  //     cell.border = {
  //       top: {style: 'thin'},
  //       left: {style: 'thin'},
  //       right: {style: 'thin'},
  //       bottom: {style: 'thin'}
  //     }
  //     cell.alignment = {horizontal: 'center'}
  //   })
  // })
  // res.attachment('Liste Tp.xlsx')
  // wbjs.xlsx.write(res)
  //   .then(() => {
  //     res.end()
  //   })
  //   .catch(e => {
  //     console.error('WriteFile Failed')
  //     res.status(500).send('Erreur écriture fichier')
  //   })
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
