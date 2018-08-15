import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import {Link} from 'react-router-dom'

class Liste extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openTest: false
    }
  }
  componentWillMount () {
    console.log(this.props.link.location.state.all)
    const linkAll = this.props.link.location.state.all
    if (linkAll) {
      this.props.allList()
    }
  }
  render () {
    const classes = this.props.classes
    return (
      <div className={classes.affFrame}>
        <div className={classes.content}>
          <Grid container spacing={40} direction='row' justify='center' alignItems='baseline' >
            <Grid item>
              <Button variant='raised' color='secondary' component={Link} to={{pathname: '/Home', state: {type: 'voir'}}}>Voir</Button>
            </Grid>
            <Grid item>
              <Button variant='raised' color='secondary' component={Link} to={{pathname: '/Home', state: {type: 'etude'}}}>Etudier</Button>
            </Grid>
            <Grid item>
              <Button variant='raised' color='secondary' onClick={() => { this.setState({openTest: !this.state.openTest}) }}>Test</Button>
              <Collapse in={this.state.openTest}>
                <MenuList>
                  <Link to={{pathname: '/Home', state: {type: 'test', level: '1'}}}>
                    <MenuItem>
                      Niveau 1
                    </MenuItem>
                  </Link>
                  <Link to={{pathname: '/Home', state: {type: 'test', level: '2'}}}>
                    <MenuItem>
                      Niveau 2
                    </MenuItem>
                  </Link>
                  <Link to={{pathname: '/Home', state: {type: 'test', level: '3'}}}>
                    <MenuItem>
                      Niveau 3
                    </MenuItem>
                  </Link>
                </MenuList>
              </Collapse>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default Liste
