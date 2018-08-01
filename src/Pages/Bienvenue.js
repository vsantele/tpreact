// eslint-disable-next-line
import React, {Component} from 'react'
// eslint-disable-next-line
import { Link, Route, Switch } from 'react-router-dom'
// eslint-disable-next-line
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

export default class Bienvenue extends Component {
  render () {
    const classes = this.props.classes
    return (
      <div className={classes.affFrame}>
        <div className={classes.content}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Paper style ={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
              <div className={classes.margin}>
                <Typography variant="title">Bienvenue:</Typography>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}
