/*eslint-disable */
import React, { Component } from 'react'
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Tp from '../tp.json'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Done from '@material-ui/icons/Done'
import LeftIcon from '@material-ui/icons/NavigateBefore'
import RightIcon from '@material-ui/icons/NavigateNext'
import Settings from '@material-ui/icons/Settings'
import Modal from '@material-ui/core/Modal'
// eslint-disable-next-line
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import SwitchButton from '@material-ui/core/Switch'
// import MatomoTracker from 'matomo-tracker'
import Shuffle from 'shuffle-array'
import Select from '@material-ui/core/Select'
import LinearProgress from '@material-ui/core/LinearProgress'
import CssBaseline from '@material-ui/core/CssBaseline'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
/* eslint-enable */
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
    vw: 50
  },
  bigWord: {
    textAlign: 'center'
  },
  link: {
    color: theme.palette.secondary.main
  },
  fab: {
    position: 'fixed',
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
    padding: 8,
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
  },
  success: {
    backgroundColor: green[500]
  },
  danger: {
    backgroundColor: red[500]
  },
  divider: {
    marginTop: '8px',
    marginBottom: '8px'
  }

})

const optionsBase = [
  { value: 'infNl', label: 'Infinitif Neerlandais', nb: 0 },
  { value: 'OVT', label: 'Imparfait', nb: 1 },
  { value: 'PP', label: 'Participe Passé', nb: 2 },
  { value: 'infFr', label: 'Infinitif Français', nb: 3 }
]

export default withStyles(styles, { withTheme: true })(class Mobile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      tp: Tp,
      openModal: false,
      limite: 20,
      aleatoire: true,
      nbAfficher: 0,
      numeroCard: 0,
      options: [
        { value: 'infNl', label: 'Infinitif Neerlandais', nb: 0 },
        { value: 'OVT', label: 'Imparfait', nb: 1 },
        { value: 'PP', label: 'Participe Passé', nb: 2 },
        { value: 'infFr', label: 'Infinitif Français', nb: 3 }
      ],
      value: 'aucune',
      question: false,
      reponse: ''
    }
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleModalOpen = this.handleModalOpen.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleAleatoire = this.handleAleatoire.bind(this)
    this.shuffleTp = this.shuffleTp.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleMove = this.handleMove.bind(this)
    this.handleCorrect = this.handleCorrect.bind(this)
    this.handleReponse = this.handleReponse.bind(this)
  }

  shuffleTp () {
    const tpRandomized = Shuffle(this.state.tp, { copy: true })
    this.setState({
      tpRandom: tpRandomized // liste des tps dans un ordre aléatoire
    })
  }
  shuffleQuestion () {
    let random = Math.floor((Math.random() * 4))
    let value
    switch (random) {
      case 0:
        value = 'infFr'
        break
      case 1:
        value = 'infNl'
        break
      case 2:
        value = 'OVT'
        break
      case 3:
        value = 'PP'
        break
      default:
        value = null
    }
    return value
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
      this.setState({ numeroCard: 0 })
    }
  }
  handleMove (e) {
    var numeroCard = this.state.numeroCard
    if (e.target.id === 'next') {
      if (numeroCard < this.state.limite - 1) {
        numeroCard++
      }
    } else if (e.target.id === 'previous') {
      if (numeroCard > 0) {
        numeroCard--
      }
    }

    this.setState({
      numeroCard: numeroCard,
      reponse: '',
      estCorrect: undefined
    })
  }
  handleSelect (e) {
    console.log('value: ' + e.target.value)
    var value = e.target.value
    var valueFinal = 'false'
    let question
    if (value === 'aucune') {
      valueFinal = value
      question = false
    } else if (value === 'random') {
      valueFinal = this.shuffleQuestion()
      question = true
    } else {
      valueFinal = value
      question = true
    }
    console.log('valueFinal: ' + valueFinal)
    this.setState({
      value: valueFinal,
      question: question
    })
  }

  handleCorrect () {
    let correct = this.state.aleatoire ? this.state.tpRandom[this.state.numeroCard][this.state.value] : this.tp[this.state.numeroCard][this.state.value]
    let entre = this.state.reponse
    let estCorrect
    if (entre === correct) {
      console.log('ok')
      estCorrect = true
    } else {
      console.log('pas ok')
      estCorrect = false
    }
    console.log('correct: ' + correct)
    console.log('reponse: ' + entre)
    this.setState({
      estCorrect: estCorrect
    })
  }

  handleReponse (e) {
    this.setState({
      reponse: e.target.value,
      estCorrect: undefined
    })
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
      <div>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <div className={classes.content}>
              <Card
                classes={classes}
                tp={this.state.aleatoire ? this.state.tpRandom : this.state.tp}
                handleMove={this.handleMove}
                numeroCard={this.state.numeroCard}
                limite={this.state.limite}
                options={this.state.options}
                question={this.state.question}
                handleCorrect={this.handleCorrect}
                handleReponse={this.handleReponse}
                estCorrect={this.state.estCorrect}
                reponse={this.state.reponse}
              />
              <Link className={classes.link} to='/Home'>Back</Link>
            </div>
            <div>
              <Button variant='fab' color='secondary' aria-label='edit' className={classes.fab} onClick={this.handleModalOpen}>
                <Settings />
              </Button>
              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={this.state.openModal}
                onClose={this.handleModalClose}
              >
                <div className={classes.paperModal}>
                  <Typography variant='title' id='modal-title'>
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
                              <SwitchButton inputProps={{ id: 'aleatoire', tag: 'aleatoire', name: 'aleatoire', type: 'checkbox' }} classes={{ checked: classes.checked, bar: classes.bar }} checked={Boolean(this.state.aleatoire)} onChange={this.handleAleatoire} />
                            </FormControl>
                          </div>
                        </Grid>
                        <Grid item>
                          <div className={classes.grid}>
                            <Button variant='raised' color='secondary' className={classes.button} onClick={this.handleClick} id='shuffle' disabled={!this.state.aleatoire} > Recharger </Button>
                          </div>
                        </Grid>
                        <Grid item>
                          <div className={classes.grid}>
                            <FormControl>
                              <TextField
                                error={this.state.limite < 0}
                                id='limite'
                                label='limite'
                                name='limite'
                                value={this.state.limite}
                                onChange={this.handleInputChange}
                                type='number'
                                className={classes.textField}
                                InputLabelProps={{
                                  shrink: true
                                }}
                                margin='dense'
                                disabled={!this.state.aleatoire}
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
                              inputProps={{ id: 'question' }}
                              value={this.state.value}
                              autoWidth
                              disabled
                            >
                              <option key={'question' + 0} value={'aucune'}>Aucune</option>
                              <option key={'questionInfFr'} value={'infFr'}>Infinitif Français</option>
                              <option key={'questionOVT'} value={'OVT'}>Imparfait</option>
                              <option key={'questionPP'} value={'PP'}>Participe Passé</option>
                              <option key={'questionInfNl'} value={'infNl'}>Infinitif Néérlandais </option>
                              <option key={'questionRandom'} value={'random'}>Aléatoire</option>
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
      </div>
    )
  }
})

// eslint-disable-next-line
const Card = function (props) {
  const classes = props.classes
  const progress = (props.numeroCard / (props.limite - 1)) * 100
  console.log('reponse: ' + props.reponse + ' estCorrect: ' + props.estCorrect)
  return (
    <div>
      En construction...
      <Paper className={classes.paper} >
        <div className={classes.card}>
          <div className={props.reponse ? props.estCorrect === undefined ? '' : props.estCorrect ? classes.success : classes.danger : ''}>
            <div>
              <Cell
                numCell={0}
                options={props.options}
                question={false}
                tp={props.tp}
                numeroCard={props.numeroCard}
                handleReponse={props.handleReponse}
                classes={props.classes}
                reponse={props.reponse}
                typo='display1'
              />
            </div>
            <Divider className={classes.divider} />
            <div>
              <Grid container justify='center' alignItems='center'>
                <Grid item>
                  <Cell
                    numCell={1}
                    options={props.options}
                    question={false}
                    tp={props.tp}
                    numeroCard={props.numeroCard}
                    handleReponse={props.handleReponse}
                    classes={props.classes}
                    reponse={props.reponse}
                    typo='display1'
                  />
                </Grid>
                <Grid item>
                  <Cell
                    numCell={2}
                    options={props.options}
                    question={false}
                    tp={props.tp}
                    numeroCard={props.numeroCard}
                    handleReponse={props.handleReponse}
                    classes={props.classes}
                    reponse={props.reponse}
                    typo='display1'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Cell
                    numCell={3}
                    options={props.options}
                    question={false}
                    tp={props.tp}
                    numeroCard={props.numeroCard}
                    handleReponse={props.handleReponse}
                    classes={props.classes}
                    reponse={props.reponse}
                    typo='display1'
                  />
                </Grid>
              </Grid>
            </div>
            <Divider />
            <Grid
              container
              justify='space-between'
            >
              <Grid item xs={2}>
                <div className={classes.grid} onClick={props.handleMove}>
                  <Button size='large' fullWidth id='previous'><LeftIcon /></Button>
                </div>
              </Grid>
              {
                props.question
                  ? (
                    <Grid item xs={1}>
                      <div className={classes.grid} onClick={props.handleCorrect}>
                        <Button id='correction'><Done /></Button>
                      </div>
                    </Grid>
                  )
                  : null
              }
              <Grid item xs={2}>
                <div className={classes.grid} onClick={props.handleMove}>
                  <Button size='large' fullWidth id='next'><RightIcon /></Button>
                </div>
              </Grid>
            </Grid>
            <LinearProgress color='secondary' variant='determinate' value={progress} />
          </div>
        </div>
      </Paper>
    </div>
  )
}

// eslint-disable-next-line
const Cell = function (props) {
  // const classes = props.classes
  const numCell = props.numCell
  const typo = props.typo
  return (
    <Grid container alignItems='center' justify='center' direction='column' spacing={0}>
      <Grid item>
        <Typography align='center' variant='caption' >
          {props.options[numCell].label}
        </Typography>
      </Grid>
      <Grid item>
        {
          props.question
            ? <input tag='question' id='question' className='search-input' type='text' placeholder={'Réponse'} value={props.reponse} onChange={props.handleReponse} />
            : <Typography align='center' variant={typo} gutterBottom>
              {
                props.tp[props.numeroCard][props.options[numCell].value]
              }
            </Typography>
        }
      </Grid>
    </Grid>
  )
}
