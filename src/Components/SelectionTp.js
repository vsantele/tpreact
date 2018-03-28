// eslint-disable-next-line
import React, {Component} from 'react'
// eslint-disable-next-line
import {Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox} from 'material-ui'

export default class SelectionTp extends Component {
  render () {
    const tp = this.props.tp
    const colonne = this.props.colonne
    var handleCheck = this.props.handleCheck
    const classes = this.props.classes
    /* matomo.track({
    url: 'https://flamboyant-chandrasekhar-71d621.netlify.com/',
    action_name: 'Selection Tp'
  }) */
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell> </TableCell>
              {[0, 1, 2, 3].map(nb => <TableCell key={'STH' + nb}><span style={{fontSize: '18px'}}>{colonne[nb].label}</span></TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              tp.map((tp, index) => {
                return (
                  <TableRow onClick={event => handleCheck(index)} key={'rowSeTp' + tp.id}>
                    <TableCell scope = 'row'><span style={{fontSize: '18px'}}> {index + 1 }</span></TableCell>
                    <TableCell key = {'chbk' + tp.id}>
                      <Checkbox
                        checked={tp.afficher}
                        id={'check' + tp.id}
                        tabIndex={-1}
                        disableRipple
                        classes= {{checked: classes.checked}}
                      />
                    </TableCell>
                    <TableCell key= {'0C' + tp.id}><span style={{fontSize: '18px'}}>{tp.infNl}</span> </TableCell>
                    <TableCell key= {'1C' + tp.id}><span style={{fontSize: '18px'}}>{tp.OVT}</span> </TableCell>
                    <TableCell key= {'2C' + tp.id}><span style={{fontSize: '18px'}}>{tp.PP}</span> </TableCell>
                    <TableCell key= {'3C' + tp.id}><span style={{fontSize: '18px'}}>{tp.infFr}</span> </TableCell>
                  </TableRow>)
              })
            }
          </TableBody>
        </Table>
      </Paper>
    )
  }
}
