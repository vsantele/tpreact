/* eslint-disable */
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import {Link} from 'react-router-dom'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import cerveauCordeSaute from '../Images/cerveauCordeSaute.png'
import cerveauCourse from '../Images/cerveauCourse.png'
import cerveauAbdo from '../Images/cerveauAbdo.png'
/* eslint-enable */

class Liste extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openTest: false
    }
  }
  componentWillMount () {
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
              {/* <Button variant='raised' color='secondary' component={Link} to={{pathname: '/Home', state: {type: 'voir'}}}>Voir</Button> */}
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{width: '250px', 'height': '250px'}}
                component={Link} to={{pathname: '/Home', state: {type: 'voir'}}}
              >
                <span
                  className={classes.imageSrc}
                  // src={cerveauCourse}
                  style={{
                    backgroundImage: `url(https://res.cloudinary.com/wolfvic/image/upload/f_auto,q_auto:best/v1534806588/tp%20ndls/cerveauCordeSaute.png)`
                  }}
                />
                <span className={classes.imageButton}>
                  <Typography
                    component="span"
                    variant="button"
                    color="inherit"
                    className={classes.imageTitle}
                  >
                        Voir
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
            </Grid>
            <Grid item>
              {/* <Button variant='raised' color='secondary' component={Link} to={{pathname: '/Home', state: {type: 'etude'}}}>Etudier</Button> */}
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{width: '250px', 'height': '250px'}}
                component={Link} to={{pathname: '/Home', state: {type: 'etude'}}}
              >
                <span
                  className={classes.imageSrc}
                  // src={cerveauCourse}
                  style={{
                    backgroundImage: `url(https://res.cloudinary.com/wolfvic/image/upload/f_auto,q_auto:best/v1534806588/tp%20ndls/cerveauCourse.png)`
                  }}
                />
                <span className={classes.imageButton}>
                  <Typography
                    component="span"
                    variant="button"
                    color="inherit"
                    className={classes.imageTitle}
                  >
                        Etudier
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
            </Grid>
            <Grid item>
              {/* <Button variant='raised' color='secondary' onClick={() => { this.setState({openTest: !this.state.openTest}) }}>Test</Button> */}
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{width: '250px', 'height': '250px'}}
                onClick={() => { this.setState({openTest: !this.state.openTest}) }}
              >
                <span
                  className={classes.imageSrc}
                  // src={cerveauCourse}
                  style={{
                    backgroundImage: `url(https://res.cloudinary.com/wolfvic/image/upload/f_auto,q_auto:best/v1534806588/tp%20ndls/cerveauAbdo.png)`
                  }}
                />
                <span className={classes.imageButton}>
                  <Typography
                    component="span"
                    variant="button"
                    color="inherit"
                    className={classes.imageTitle}
                  >
                        Test
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
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
