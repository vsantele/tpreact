import * as xljs from 'exceljs'
import * as fs from 'fs'
const Tp = JSON.parse(fs.readFileSync('./src/tp.json', 'utf8'))
const cols = [
    {value: 'infNl', label: 'Infinitif néerlandais'},
    {value: 'OVT', label: 'Imparfait'},
    {value: 'PP', label: 'Participe passé'},
    {value: 'infFr', label: 'Infinitif français'}
  ]
fs.unlink('test.xlsx', err => console.log(err))
const wbjs = new xljs.Workbook()
wbjs.created = new Date()
wbjs.creator = 'https://flamboyant-chandrasekhar-71d621.netlify.com'
const wsjs = wbjs.addWorksheet('feuille 1')
const colSheet = cols.map(col => {
  return {
    header:col.label, key: col.value, width: 22, style: {font: {size: 12}, alignement: {horizontal: 'center'}}
  }
})
wsjs.columns = colSheet
const headerRow = wsjs.getRow(1)
headerRow.eachCell((cell) => {
  cell.font = {bold: true, size: 14}
  cell.border= {
    top: {style:'thick'},
    left: {style:'thick'},
    right: {style:'thick'},
    bottom: {style:'thick'}
  }
  cell.alignment= {horizontal: 'center'}
}) 
Tp.forEach(tp => {
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
wbjs.xlsx.writeFile('test.xlsx').then().catch()
