// eslint-disable-next-line
import React, {Component} from 'react'
// eslint-disable-next-line
import {MuiThemeProvider, withStyles, createMuiTheme } from 'material-ui/styles'
import Tp from './tp.json'
// eslint-disable-next-line
import { Link } from 'react-router-dom'
// eslint-disable-next-line
import Divider from 'material-ui/Divider'
// eslint-disable-next-line
import Paper from 'material-ui/Paper'
import 'typeface-roboto'
// eslint-disable-next-line
import Typography from 'material-ui/Typography'
// eslint-disable-next-line
import Grid from 'material-ui/Grid'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#BBDEFB',
      main: '#2196F3',
      dark: '#0D47A1',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff'
    }
  }
})

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: `100%`,
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    }
  },
  paper: {
    width: '100%'
  },
  bigWord: {
    textAlign: 'center'
  }

})

export default withStyles(styles, {withTheme: true})(class Mobile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      tp: Tp
    }
  }

  render () {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <div className={classes.content}>
            <Card classes = {classes} />
            <Link to='/'>Back</Link>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
})

const Card = function (props) {
  const classes = props.classes
  return (
    <div>
      En construction...
      <Paper className={classes.paper} >
        <Typography align='center' type='display2' gutterBottom>
          <span>infinitif Fr</span>
        </Typography>
        <Divider />
        <div>
          <Typography align='center' type='display1' gutterBottom>
            <span>infinitif Nl </span>
            <span>participe passe </span>
            <span>OVT </span>
          </Typography>
        </div>
      </Paper>
    </div>

  )
}
