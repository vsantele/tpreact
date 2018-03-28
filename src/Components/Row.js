// eslint-disable-next-line
import React, {Component} from 'react'
// eslint-disable-next-line
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
// eslint-disable-next-line
import Cell from './Cell'

export default class Row extends Component {
  render () {
    var index = this.props.index
    var colonne = this.props.colonne
    var listValue = this.props.listValue
    var nombre = [0, 1, 2, 3]
    return (
      <TableRow>
        <TableCell scope="row"> <span style={{fontSize: '16px'}}>{index + 1}</span> </TableCell>
        {
          nombre.map((nb) =>
            <Cell
              key={'cell' + colonne[nb].value + nb}
              nb = {nb}
              index = {index}
              value = {listValue}
              colonne = {colonne[nb]}
              nbColonne = {nb}
              question = {this.props.question}
              handleReponse = {this.props.handleReponse}
              affReponse = {this.props.affReponse}
              aleatoireQuestion = {this.props.aleatoireQuestion}
              nbAleatoireQuestion = {this.props.nbAleatoireQuestion}
              classes = {this.props.classes}
            />
          )
        }
      </TableRow>
    )
  }
}
