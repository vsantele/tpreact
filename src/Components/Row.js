/*eslint-disable */
import React, {Component} from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Cell from './Cell'
/*eslint-enable */
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
              afficherReponse = {this.props.afficherReponse}
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
