// eslint-disable-next-line
import React, {Component} from 'react'
import options from '../config/options'
// eslint-disable-next-line
import {Paper, Table, TableHead, TableRow, TableCell, FormControl, InputLabel, Switch as SwitchButton, TableBody, Grid, Typography} from 'material-ui'
// eslint-disable-next-line
import Row from './Row'
export default class Rendu extends Component {
  render () {
    const classes = this.props.classes
    var tp = this.props.tp
    var limite = this.props.limite
    var colonne = this.props.colonne
    var nombre = [0, 1, 2, 3]
    var handleQuestion = this.props.handleQuestion
    var handleReponse = this.props.handleReponse
    var affReponse = this.props.affReponse
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
                    <TableCell key= {'th' + nb} style={{'display': colonne[nb].afficher ? 'table-cell' : 'none'}}>
                      <div>
                        <div className={classes.gridRoot}>
                          <Grid container>
                            <Grid item >
                              <div className={classes.gridHeader}>
                                <Typography variant="title"> {options[nb].label} </Typography>
                              </div>
                            </Grid>
                            <Grid item>
                              <div className={classes.gridHeader}>
                                <FormControl>
                                  <InputLabel htmlFor={'col' + nb} shrink>Question</InputLabel>
                                  <SwitchButton inputProps={{ id: 'col' + nb }} onChange={handleQuestion} checked={colonne[nb].question} classes={{checked: classes.checked, bar: classes.bar}}/>
                                </FormControl>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
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
                        <Row key = {'row' + index}
                          index = {index}
                          listValue = {listValue}
                          colonne = {colonne}
                          handleReponse = {handleReponse}
                          affReponse = {affReponse}
                          selectionPage = {selectionPage}
                          tpAfficher = {tpAfficher}
                          handleCheck = {handleCheck}
                          aleatoireQuestion = {aleatoireQuestion}
                          nbAleatoireQuestion = {nbAleatoireQuestion}
                          classes = {classes}
                        />
                      )
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
