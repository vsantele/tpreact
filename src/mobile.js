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
import Settings from 'material-ui-icons/Settings'
// eslint-disable-next-line
import RightIcon from 'material-ui-icons/KeyboardArrowRight'
// eslint-disable-next-line
import LeftIcon from 'material-ui-icons/KeyboardArrowLeft'
// eslint-disable-next-line
import Modal from 'material-ui/Modal'
// eslint-disable-next-line
import FormControl from 'material-ui/Form/FormControl'
// eslint-disable-next-line
import InputLabel from 'material-ui/Input/InputLabel'
// eslint-disable-next-line
import TextField from 'material-ui/TextField'
// eslint-disable-next-line
import SwitchButton from 'material-ui/Switch'
// eslint-disable-next-line
import MatomoTracker from 'matomo-tracker'
import Shuffle from 'shuffle-array'
// eslint-disable-next-line
import Select from 'material-ui/Select'
// eslint-disable-next-line
import { MenuItem } from 'material-ui/Menu'
// eslint-disable-next-line
import { LinearProgress } from 'material-ui/Progress'

// var matomo = new MatomoTracker(2, 'http://wolfvic.toile-libre.org/admin/analytics/piwik.php')

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
  },
  typography: {
    fontSize: 16
  }
})

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    overflowX: 'auto'
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
    bottom: theme.spacing.unit * -1,
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
  },
  previousButton: {
    height: '100%',
    position: 'absolute',
    left: '16px',
    align: 'center'
  },
  nextButton: {
    height: '100%',
    position: 'absolute',
    right: '16px'
  },
  gridRoot: {
    flexGrow: 1
  },
  grid: {
    padding: 16,
    textAlign: 'center'
  },
  numero: {
    position: 'relative',
    borderRadius: '50%',
    backgroundColor: '#F00',
    width: '3em',
    height: '3em',
    top: theme.spacing.unit,
    left: theme.spacing.unit * 2
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
      aleatoire: true,
      nbAfficher: 0,
      numeroCard: 0
    }
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleModalOpen = this.handleModalOpen.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleAleatoire = this.handleAleatoire.bind(this)
    this.shuffleTp = this.shuffleTp.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleMove = this.handleMove.bind(this)
  }

  shuffleTp () {
    const tpRandomized = Shuffle(this.state.tp, {copy: true})
    this.setState({
      tpRandom: tpRandomized // liste des tps dans un ordre aléatoire
    })
  }

  handleModalOpen () {
    /* matomo.track({
      url: 'https://flamboyant-chandrasekhar-71d621.netlify.com/',
      action_name: 'Mobile Option Open'
    }) */
    this.setState({ openModal: true })
  };

  handleModalClose () {
    /* matomo.track({
      url: 'https://flamboyant-chandrasekhar-71d621.netlify.com/',
      action_name: 'Mobile Option Close'
    }) */
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

  handleClick (e) {
    if (e.target.id === 'shuffle') {
      this.shuffleTp()
    }
  }
  handleMove (e) {
    var numeroCard = this.state.numeroCard
    if (e.target.id === 'next') {
      if (numeroCard < this.state.limite - 1) {
        numeroCard++
      }
    } else {
      if (numeroCard > 0) {
        numeroCard--
      }
    }
    this.setState({numeroCard: numeroCard})
  }
  handleSelect (e) {
    console.log(e.target.value)
  }

  componentWillMount () {
    this.shuffleTp(this.state.tp)
    this.setState({
      loading: false
    })
  }

  render () {
    const { classes } = this.props
    /* matomo.track({
      url: 'https://flamboyant-chandrasekhar-71d621.netlify.com/',
      action_name: 'Mobile Page'
    }) */
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <div className={classes.content}>
            <Card
              classes = {classes}
              tp = {this.state.aleatoire ? this.state.tpRandom : this.state.tp}
              handleMove = {this.handleMove}
              numeroCard = {this.state.numeroCard}
              limite = {this.state.limite}
            />
            <Link className={classes.link} to='/'>Back</Link>
          </div>
          <div>
            <Button variant='fab' color="secondary" aria-label="edit" className={classes.fab} onClick={this.handleModalOpen}>
              <Settings />
            </Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.openModal}
              onClose={this.handleModalClose}
            >
              <div className={classes.paperModal}>
                <Typography variant="title" id="modal-title">
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
                          <Button variant='raised' color='secondary' className={classes.button} onClick={this.handleClick} id='shuffle' disabled = {!this.state.aleatoire} > Recharger </Button>
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
                      <Grid item>
                        <FormControl className={styles.formControl}>
                          <InputLabel htmlFor={'Question'}>Question</InputLabel>
                          <Select
                            native
                            onChange={(event) => this.handleSelect(event)}
                            inputProps={{ id: 'question' }} value={false}
                            disabled
                            autoWidth
                          >
                            <option key={'question' + 0} value={false}>Aucune</option>
                            <option key={'questionInfFr'} value={'infFr'}>Infinitif Français</option>
                            <option key={'questionOVT'} value={'OVT'}>Imparfait</option>
                            <option key={'questionPP'} value={'PP'}>Participe Passé</option>
                            <option key={'questionInfNl'} value={'infNl'}>Infinitif Néérlandais </option>
                            <option key={'questionRandom'} value={'random'} disabled>Aléatoire</option>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div>
                  <Button onClick={this.handleModalClose} className={classes.buttonModal}>Close</Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
})

// eslint-disable-next-line
const Card = function (props) {
  const classes = props.classes
  const progress = (props.numeroCard / (props.limite - 1)) * 100
  return (
    <div>
      En construction...
      <Paper className={classes.paper} >
        <div className={classes.card}>
          {/* <div className={classes.numero}>
            <Typography variant="body2" align='center'>
            1
            </Typography>
          </div> */}
          <div>
            <Grid container justify="center" alignItems="center" direction="column" spacing={0}>
              <Grid item>
                <Typography variant='caption'>
                      Infinitif Neerlandais
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='display2' gutterBottom>
                  {
                    props.tp[props.numeroCard].infNl
                  }
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Divider />
          <div>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <Grid container alignItems="center" justify="center" direction="column" spacing = {0}>
                  <Grid item>
                    <Typography align='center' variant="caption" >
                          Imparfait
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align='center' variant='display1' gutterBottom>
                      {
                        props.tp[props.numeroCard].OVT
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center" justify="center" direction="column" spacing = {0}>
                  <Grid item>
                    <Typography align='center' variant="caption" >
                          Particpe Passé
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align='center' variant='display1' gutterBottom>
                      {
                        props.tp[props.numeroCard].PP
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center" justify="center" direction="column" spacing = {0}>
                  <Grid item>
                    <Typography align='center' variant="caption" >
                          Infinitif Français
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align='center' variant='display1' gutterBottom>
                      {
                        props.tp[props.numeroCard].infFr
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <Divider />
          <Grid
            container
            justify='space-between'
          >
            <Grid item xs={1}>
              <div className={classes.grid}>
                <Button onClick={props.handleMove} className={classes.test} fullWidth id='previous'><LeftIcon /></Button>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.grid}>
                <Button onClick={props.handleMove} size='large' fullWidth id='next'><RightIcon style={ {textAlign: 'center', top: '50%'}} /></Button>
              </div>
            </Grid>
          </Grid>
          <LinearProgress color="secondary" variant="determinate" value={progress} />
        </div>
      </Paper>
    </div>
  )
}

const Cell = function (props) {
  const classes = props.classes
}
