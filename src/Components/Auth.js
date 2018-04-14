// eslint-disable-next-line
import React, {Component} from 'react'
// eslint-disable-next-line
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
// eslint-disable-next-line
import firebase, { auth, provider } from '../firebase/firebase.js'
// eslint-disable-next-line
import { Typography, Paper } from 'material-ui'

export default class Auth extends Component {
  render () {
    const classes = this.props.classes
    const uiConfig = this.props.uiConfig
    return (
      <div className={classes.appFrame}>
        <div className={classes.content}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Paper style ={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
              <div className={classes.margin}>
                <Typography variant="title">Connexion:</Typography>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}
