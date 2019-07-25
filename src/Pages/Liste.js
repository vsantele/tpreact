/* eslint-disable */
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import {Link} from 'react-router-dom'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
/* eslint-enable */

class Liste extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openTest: false,
      openEtude: false,
      etudeChecked: []
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle (value) {
    const checked = this.state.etudeChecked
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    this.setState({
      etudeChecked: newChecked
    })
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
              {/* <Button variant='contained' color='secondary' component={Link} to={{pathname: '/Home', state: {type: 'voir'}}}>Voir</Button> */}
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{ width: '250px', 'height': '250px' }}
                component={Link} to={{ pathname: '/Home', state: { type: 'voir' } }}
              >
                <span
                  className={classes.imageSrc}
                  // src={cerveauCourse}
                  style={{
                    backgroundImage: `url(https://res.cloudinary.com/wolfvic/image/upload/f_auto,q_auto:eco/v1534806588/tp%20ndls/cerveauCordeSaute.png)`
                  }}
                />
                <span className={classes.imageButton}>
                  <Typography
                    component='span'
                    variant='button'
                    color='inherit'
                    className={classes.imageTitle}
                  >
                        Voir
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
            </Grid>
            <Grid item>
              {/* <Button variant='contained' color='secondary' component={Link} to={{pathname: '/Home', state: {type: 'etude'}}}>Etudier</Button> */}
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{ width: '250px', 'height': '250px' }}
                onClick={() => this.setState({ openEtude: !this.state.openEtude })}
                // component={Link} to={{pathname: '/Home', state: {type: 'etude'}}}
              >
                <span
                  className={classes.imageSrc}
                  // src={cerveauCourse}
                  style={{
                    backgroundImage: `url(https://res.cloudinary.com/wolfvic/image/upload/f_auto,q_auto:eco/v1534806588/tp%20ndls/cerveauCourse.png)`
                  }}
                />
                <span className={classes.imageButton}>
                  <Typography
                    component='span'
                    variant='button'
                    color='inherit'
                    className={classes.imageTitle}
                  >
                        Etudier
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
              <Collapse in={this.state.openEtude}>
                <List>
                  {this.props.colonne.map((col, index) => (
                    <ListItem
                      button
                      onClick={() => this.handleToggle(index)}
                      key={'col' + index}
                    >
                      <Checkbox checked={this.state.etudeChecked.indexOf(index) !== -1} tabIndex={-1} disableRipple />
                      <ListItemText primary={col.label} />
                    </ListItem>
                  ))}
                </List>
                <Button variant='outlined' color='primary' component={Link} to={{ pathname: '/Home', state: { type: 'etude', col: this.state.etudeChecked } }} disabled={this.state.etudeChecked.length === 0 || this.state.etudeChecked.length >= this.props.colonne.length}>Valider</Button>
              </Collapse>
            </Grid>
            <Grid item>
              {/* <Button variant='contained' color='secondary' onClick={() => { this.setState({openTest: !this.state.openTest}) }}>Test</Button> */}
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{ width: '250px', 'height': '250px' }}
                onClick={() => { this.setState({ openTest: !this.state.openTest }) }}
              >
                <span
                  className={classes.imageSrc}
                  // src={cerveauCourse}
                  style={{
                    backgroundImage: `url(https://res.cloudinary.com/wolfvic/image/upload/f_auto,q_auto:eco/v1534806588/tp%20ndls/cerveauAbdo.png)`
                  }}
                />
                <span className={classes.imageButton}>
                  <Typography
                    component='span'
                    variant='button'
                    color='inherit'
                    className={classes.imageTitle}
                  >
                        Test
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
              <Collapse in={this.state.openTest}>
                <List>
                  {[1, 2, 3].map(lvl => (
                    <ListItem key={'lvl' + lvl} button component={Link} to={{ pathname: '/Home', state: { type: 'test', level: lvl } }}>
                      <ListItemText primary={`Niveau ${lvl}`} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default Liste
