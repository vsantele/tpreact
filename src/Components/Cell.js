/*eslint-disable */
import React, {Component} from 'react'
import TableCell from '@material-ui/core/TableCell'
import TextField from '@material-ui/core/TextField'
/* eslint-enable */
export default class Cell extends Component {
  render () {
    function verification (e) {
      var reponse = e.target.value.toLowerCase()
      var rgxOr = /\s?\|\s?/
      let repOr = value.split(rgxOr)
      let verbes = []
      repOr.forEach(elmt => {
        let isWithSe = elmt.startsWith('[se]')
        let isWithLe = elmt.startsWith('[le]')
        let isWithL = elmt.startsWith('[l\']')
        let isWithLa = elmt.startsWith('[la]')
        let isWithUn = elmt.startsWith('[un]')
        let isWithDes = elmt.startsWith('[des]')
        let isWithA = elmt.startsWith('[a]')
        let isWithAn = elmt.startsWith('[an]')
        let isWithTo = elmt.startsWith('[to]')
        let isWithThe = elmt.startsWith('[the]')
        const parenthese = elmt.search(/\s?(\((.*?)\))\s?/)
        let verbeSeul = parenthese !== -1 ? elmt.slice(0, parenthese) : elmt
        if (isWithSe) {
          verbes.push('se ' + verbeSeul.slice(5))
          verbes.push(verbeSeul.slice(5))
        } else if (isWithLe) {
          verbes.push('le ' + verbeSeul.slice(5))
          verbes.push(verbeSeul.slice(5))
        } else if (isWithL) {
          verbes.push('l\'' + verbeSeul.slice(5))
          verbes.push(verbeSeul.slice(5))
        } else if (isWithLa) {
          verbes.push('la ' + verbeSeul.slice(5))
          verbes.push(verbeSeul.slice(5))
        } else if (isWithUn) {
          verbes.push('un ' + verbeSeul.slice(5))
          verbes.push(verbeSeul.slice(5))
        } else if (isWithDes) {
          verbes.push('des ' + verbeSeul.slice(5))
          verbes.push(verbeSeul.slice(5))
        } else if (isWithA) {
          verbes.push('a ' + verbeSeul.slice(5))
          verbes.push(verbeSeul.slice(5))
        } else if (isWithAn) {
          verbes.push('an ' + verbeSeul.slice(5))
          verbes.push(verbeSeul.slice(5))
        } else if (isWithTo) {
          verbes.push('to ' + verbeSeul.slice(5))
          verbes.push(verbeSeul.slice(5))
        } else if (isWithThe) {
          verbes.push('the ' + verbeSeul.slice(5))
          verbes.push(verbeSeul.slice(5))
        } else {
          verbes.push(verbeSeul)
        }
      })
      var index = e.target.id
      var correct = reponse === '' ? 'neutre' : verbes.indexOf(reponse) !== -1
      handleReponse(correct, index, colonne.value)
    }
    const classes = this.props.classes
    var index = this.props.index
    var id = this.props.value.id
    var colonne = this.props.colonne
    var value = this.props.value[colonne.value]
    var handleReponse = this.props.handleReponse
    var correct = this.props.value['correct'][colonne.value]
    if (this.props.type === 'test') {
      if (this.props.nbAleatoireQuestion.indexOf(this.props.nb) !== -1) {
        return (
          <TableCell key={id + colonne.value} className={this.props.affCor ? correct === true ? classes.success : correct === false ? classes.danger : '' : ''} style={{'display': colonne.afficher ? 'table-cell' : 'none'}}> <TextField id={String(index)} label='Réponse' tag='question' InputProps={{classes: {input: classes.textInput}}} type='text' onBlur={(e) => verification(e)} /> <span style={{display: (this.props.affRep && correct !== true) ? 'flex' : 'none', fontSize: '16px'}}>{value}</span></TableCell>
        )
      } else {
        return (
          <TableCell key={id + colonne.value} style={{'display': colonne.afficher ? 'table-cell' : 'none', fontSize: '16px'}}> {value} </TableCell>
        )
      }
    } else {
      if (colonne.question === true) {
        return (
          <TableCell key={id + colonne.value} className={this.props.affCor ? correct === true ? classes.success : correct === false ? classes.danger : '' : ''} style={{'display': colonne.afficher ? 'table-cell' : 'none'}}> <TextField id={String(index)} label='Réponse' tag='question' InputProps={{classes: {input: classes.textInput}}} type='text' onBlur={(e) => verification(e)} /> <span style={{display: (this.props.affRep && correct !== true) ? 'flex' : 'none', fontSize: '16px'}}>{value}</span></TableCell>
        )
      } else {
        return (
          <TableCell key={id + colonne.value} style={{'display': colonne.afficher ? 'table-cell' : 'none', fontSize: '16px'}}> {value} </TableCell>
        )
      }
    }
  }
}
