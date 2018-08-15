// eslint-disable-next-line
import React, {Component} from 'react'
// eslint-disable-next-line
import {Paper, Table, TableHead, TableRow, TableCell, FormControl, InputLabel, Switch as SwitchButton, Select, TableBody} from '@material-ui/core'
// eslint-disable-next-line
import Row from './Row'
import options from '../config/options'

export default class RenduAdvanced extends Component {
  render () {
    const classes = this.props.classes
    var tp = this.props.tp
    var limite = this.props.limite
    var colonne = this.props.colonne
    var nombre = [0, 1, 2, 3]
    var handleReponse = this.props.handleReponse
    var afficherReponse = this.props.afficherReponse
    var selectionPage = this.props.selectionPage
    var tpAfficher = this.props.tpAfficher
    var handleCheck = this.props.handleCheck
    var aleatoireQuestion = this.props.aleatoireQuestion
    var nbAleatoireQuestion = this.props.nbAleatoireQuestion
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table} >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                {
                  nombre.map((nb) =>
                    <TableCell key={'th' + nb} style={{'display': colonne[nb].afficher ? 'table-cell' : 'none'}}>
                      <div>
                        <FormControl className={classes.formControl}>
                          <InputLabel htmlFor={nb}>Colonne {nb + 1}</InputLabel>
                          <Select
                            native
                            onChange={(event) => this.props.handleSelect(event)}
                            inputProps={{ id: nb }} defaultValue={nb}
                          >
                            {[0, 1, 2, 3].map(nbCol => (<option key={'TH' + nbCol} value={nbCol}>{options[nbCol].label}</option>))}
                          </Select>
                        </FormControl>
                        <FormControl>
                          <InputLabel htmlFor={'col' + nb} shrink>Question</InputLabel>
                          <SwitchButton inputProps={{ id: 'col' + nb }} onChange={this.props.handleQuestion} checked={this.props.colonne[nb].question} classes={{checked: classes.checked, bar: classes.bar}} />
                        </FormControl>
                      </div>
                    </TableCell>
                  )
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                tp.filter(tpAfficher => tpAfficher.afficher)
                  .map(function (listValue, index) {
                    if (index < limite) {
                      return (
                        <Row key={'row' + index}
                          index={index}
                          listValue={listValue}
                          colonne={colonne}
                          handleReponse={handleReponse}
                          afficherReponse={afficherReponse}
                          selectionPage={selectionPage}
                          tpAfficher={tpAfficher}
                          handleCheck={handleCheck}
                          aleatoireQuestion={aleatoireQuestion}
                          nbAleatoireQuestion={nbAleatoireQuestion}
                          classes={classes}
                        />
                      )
                    } else {
                      return null
                    }
                  })
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}
