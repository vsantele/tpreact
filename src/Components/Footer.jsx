/*eslint-disable */
import React, { Component } from 'react'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
/*eslint-enable */

class Footer extends Component {
  render () {
    return (
      <footer>
        <Paper>
          <Divider style={{marginBottom: '1em'}}/>
          <Grid container direction='column' alignItems='center'>
            <Grid item>
            Site créé par Victor Santelé
            </Grid>
            <Grid item>
              <Button component={Link} to='/About'>à propos</Button>
            </Grid>
          </Grid>
        </Paper>
      </footer>
    )
  }
}

export default Footer
