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
// eslint-disable-next-line
import Button from 'material-ui/Button'
// eslint-disable-next-line
import Icon from 'material-ui/Icon'
// eslint-disable-next-line
import UpIcon from 'material-ui-icons/KeyboardArrowUp'
// eslint-disable-next-line
import Modal from 'material-ui/Modal'
import FormControl from 'material-ui/Form/FormControl'
import InputLabel from 'material-ui/Input/InputLabel'
// eslint-disable-next-line
import TextField from 'material-ui/TextField'
// eslint-disable-next-line
import SwitchButton from 'material-ui/Switch'
// eslint-disable-next-line
import MatomoTracker from 'matomo-tracker'

var matomo = new MatomoTracker(2, 'http://wolfvic.toile-libre.org/admin/analytics/piwik.php')

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
  },
  link: {
    color: theme.palette.secondary.main
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  paperModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  buttonModal: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  optionsModal: {
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 50
  }

})

export default withStyles(styles, {withTheme: true})(class Mobile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      tp: Tp,
      openModal: false,
      limite: 20,
      aleatoire: true
    }
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleModalOpen = this.handleModalOpen.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleAleatoire = this.handleAleatoire.bind(this)
  }
  handleModalOpen () {
    this.setState({ openModal: true })
  };

  handleModalClose () {
    this.setState({ openModal: false })
  };
  handleInputChange (e) {
    // target de l'input
    const target = e.target
    /* valeur de l'input: si c'est une checkbox, retourne valeur de checked sinon si c'est un nombre, retorune la valeur passé dans la fonction setLimite,
     sinon retourne valeur */
    const value = parseInt(target.value, 10)
    // nom de l'input
    const name = 'limite'
    // setState du nom de la target avec la valeur
    this.setState({
      [name]: value
    })
  }
  handleAleatoire (e) {
    let value = e.target.checked
    this.setState({
      aleatoire: value
    })
  }

  render () {
    const { classes } = this.props
    matomo.track({
      url: 'https://flamboyant-chandrasekhar-71d621.netlify.com/',
      action_name: 'Mobile Page'
    })
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <div className={classes.content}>
            <Card classes = {classes} />
            <Link className={classes.link} to='/'>Back</Link>
          </div>
          <div>
            <Button fab color="secondary" aria-label="edit" className={classes.fab} onClick={this.handleModalOpen}>
              <UpIcon />
            </Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.openModal}
              onClose={this.handleModalClose}
            >
              <div className={classes.paperModal}>
                <Typography type="title" id="modal-title">
                  Options
                </Typography>
                <Divider />
                <div className={classes.optionsModal}>
                  <div className={classes.gridRoot}>
                    <Grid container spacing={8}>
                      <Grid item>
                        <div className={classes.grid}>
                          <FormControl className={styles.formControl}>
                            <InputLabel htmlFor='aleatoire' shrink>Aleatoire</InputLabel>
                            <SwitchButton inputProps={{ id: 'aleatoire', tag: 'aleatoire', name: 'aleatoire', type: 'checkbox' }} classes= {{checked: classes.checked, bar: classes.bar}} checked={Boolean(this.state.aleatoire)} onChange={this.handleAleatoire} />
                          </FormControl>
                        </div>
                      </Grid>
                      <Grid item>
                        <div className={classes.grid}>
                          <Button raised color='secondary' className={classes.button} onClick={this.handleClick} id='shuffle' disabled = {!this.state.aleatoire} > Recharger </Button>
                        </div>
                      </Grid>
                      <Grid item>
                        <div className={classes.grid}>
                          <FormControl>
                            <TextField
                              error = {this.state.limite < 0}
                              id="limite"
                              label="limite"
                              name="limite"
                              value={this.state.limite}
                              onChange={this.handleInputChange}
                              type="number"
                              className={classes.textField}
                              InputLabelProps={{
                                shrink: true
                              }}
                              margin="dense"
                              disabled = {!this.state.aleatoire}
                            />
                          </FormControl>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div>
                  <Button raised onClick={this.handleModalClose} className={classes.buttonModal}>Close</Button>
                </div>
              </div>
            </Modal>
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
