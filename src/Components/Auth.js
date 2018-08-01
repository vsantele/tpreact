// eslint-disable-next-line
import React, {Component} from 'react'
// eslint-disable-next-line
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
// eslint-disable-next-line
import { auth, provider } from '../firebase/firebase.js'
// eslint-disable-next-line
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
// eslint-disable-next-line
import { Link } from 'react-router-dom'

export default class Auth extends Component {
  render () {
    const classes = this.props.classes
    const uiConfig = this.props.uiConfig
    return (
      <div className={classes.appFrame}>
        <div className={classes.content}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Paper style ={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
              {
                this.props.user !== null
                  ? <div className={classes.margin}>
                    <Typography variant="title">Vous êtes déjà connecter</Typography>
                    <Link to='Profile'><Button variant='raised' color='secondary' >Vers profile</Button></Link>
                  </div>

                  : <div className={classes.margin}>
                    <Typography variant="title">Connexion:</Typography>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
                  </div>
              }
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}
