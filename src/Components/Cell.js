// eslint-disable-next-line
import React, {Component} from 'react'
// eslint-disable-next-line
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

export default class Cell extends Component {
  render () {
    function verification (e) {
      var reponse = e.target.value
      var index = e.target.id
      var correct = reponse !== '' ? reponse === value : 'neutre'
      handleReponse(correct, index, colonne.value)
    }
    const classes = this.props.classes
    var index = this.props.index
    var id = this.props.value.id
    var colonne = this.props.colonne
    var value = this.props.value[colonne.value]
    var handleReponse = this.props.handleReponse
    var correct = this.props.value['correct'][colonne.value]
    var affReponse = this.props.affReponse
    if (this.props.aleatoireQuestion) {
      if (this.props.nbAleatoireQuestion[index].indexOf(this.props.nb) !== -1) {
        return (
          <TableCell key = {id + colonne.value} className= {correct === true ? classes.success : correct === false ? classes.danger : ''} style = {{'display': colonne.afficher ? 'table-cell' : 'none'}}> <input id={index} tag='question' className="search-input" type="text" placeholder={'Réponse'} onBlur = {(e) => verification(e)} /> <span style={{display: affReponse ? 'inline' : 'none', fontSize: '16px'}}>{value}</span></TableCell>
        )
      } else {
        return (
          <TableCell key = {id + colonne.value} style = {{'display': colonne.afficher ? 'table-cell' : 'none', fontSize: '16px'}}> {value} </TableCell>
        )
      }
    } else {
      if (colonne.question === true) {
        return (
          <TableCell key = {id + colonne.value} className= {correct === true ? classes.success : correct === false ? classes.danger : ''} style = {{'display': colonne.afficher ? 'table-cell' : 'none'}}> <input id={index} tag='question' className="search-input" type="text" placeholder={'Réponse'} onBlur = {(e) => verification(e)} /> <span style={{display: affReponse ? 'inline' : 'none', fontSize: '16px'}}>{value}</span> </TableCell>
        )
      } else {
        return (
          <TableCell key = {id + colonne.value} style = {{'display': colonne.afficher ? 'table-cell' : 'none', fontSize: '16px'}}> {value} </TableCell>
        )
      }
    }
  }
}
