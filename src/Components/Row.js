/*eslint-disable */
import React, {Component} from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Cell from './Cell'
/* eslint-enable */
export default class Row extends Component {
  render () {
    var index = this.props.index
    var colonne = this.props.colonne
    var listValue = this.props.listValue
    var nombre = [0, 1, 2, 3]
    return (
      <TableRow>
        <TableCell scope='row'> <span style={{fontSize: '16px'}}>{index + 1}</span> </TableCell>
        {
          nombre.map((nb) =>
            <Cell
              key={'cell' + colonne[nb].value + listValue.id}
              nb={nb}
              index={index}
              id={listValue.id}
              value={listValue}
              colonne={colonne[nb]}
              nbColonne={nb}
              handleReponse={this.props.handleReponse}
              aleatoireQuestion={this.props.aleatoireQuestion}
              nbAleatoireQuestion={this.props.nbAleatoireQuestion}
              classes={this.props.classes}
              type={this.props.type}
              level={this.props.level}
              affCor={this.props.affCor}
              affRep={this.props.affRep}
            />
          )
        }
      </TableRow>
    )
  }
}
