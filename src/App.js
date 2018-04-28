/* @flow */
// eslint-disable-next-line
import React, {Component} from 'react'
import 'raf/polyfill'
// import Tp from './tp.json'
import Shuffle from 'shuffle-array'
import 'react-select/dist/react-select.css'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import Alert from 'react-s-alert'
// eslint-disable-next-line
import CssBaseline from 'material-ui/CssBaseline'
// eslint-disable-next-line
import {MuiThemeProvider, withStyles, createMuiTheme } from 'material-ui/styles'

import Helmet from 'react-helmet'
// eslint-disable-next-line
// import Drawer from 'material-ui/Drawer'
// eslint-disable-next-line
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'

import ReactGA from 'react-ga'
// eslint-disable-next-line
import firebase, { auth, provider, db } from './firebase/firebase.js'
import ButtonAppBar from './Components/ButtonAppBar'
// eslint-disable-next-line
import Home from './Pages/Home'
// eslint-disable-next-line
import Auth from './Components/Auth'
import styles from './config/styles'
import theme from './config/theme'
import options from './config/options'
import isMobile from './scripts/isMobile'
// eslint-disable-next-line
import Bienvenue from './Pages/Bienvenue'
import * as Loadable from 'react-loadable'
// eslint-disable-next-line
import Profile from './Pages/Profile'

// var matomo = new MatomoTracker(2, 'http://wolfvic.toile-libre.org/admin/analytics/piwik.php')

const Loading = (props) => {return(<div className={props.classes.content}>CHARGEMENT.....</div>)}

const Mobile = (classes) => Loadable({
  loader: () => import('./Pages/Mobile.js'),
  loading: () => <Loading classes = {classes} />
})

export default withStyles(styles, { withTheme: true })(class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true, // chargment en cours
      tp: [], // liste des tps dans l'ordre
      // tpExclu: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133], // tps à exclure de l'affichage en se basant sur la value infNL (TODO: Ajout index maybe)
      tpExclu: [],
      colonne: [
        {value: 'infNl', label: 'Infinitif Nl', question: true, afficher: true},
        {value: 'OVT', label: 'OVT', question: false, afficher: true},
        {value: 'PP', label: 'Participe Passé', question: false, afficher: true},
        {value: 'infFr', label: 'Infinitif FR', question: false, afficher: true}
      ], // ordre des colonnes
      aleatoire: true, // ordre aleatoire ou non
      limite: 20, // limite d'affichage des tps
      correction: {erreur: 0, vide: 0, correct: 0, total: 0},
      afficherReponse: false,
      anchorEl: null,
      selectedIndex: [0, 1, 2, 3, 4],
      selectionPage: false,
      selectAllChbx: true,
      mobileOpen: false,
      aleatoireQuestion: false,
      nbTrou: 1,
      afficherNbTp: false,
      user: null,
      signIn: false,
      page: '/',
      advanced: false,
      mobile: false,
      test: 'false'
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleQuestion = this.handleQuestion.bind(this)
    this.handleReponse = this.handleReponse.bind(this)
    this.shuffleTp = this.shuffleTp.bind(this)
    this.handleAffReponse = this.handleAffReponse.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleSelectionTpOpen = this.handleSelectionTpOpen.bind(this)
    this.handleSelectionTpClose = this.handleSelectionTpClose.bind(this)
    this.selectAll = this.selectAll.bind(this)
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    this.handleClickQuestionnaire = this.handleClickQuestionnaire.bind(this)
    this.shuffleQuestion = this.shuffleQuestion.bind(this)
    this.handleSelectionTpOpen = this.handleSelectionTpOpen.bind(this)
    this.handleChangeNbTrou = this.handleChangeNbTrou.bind(this)
    this.handleSelectNombre = this.handleSelectNombre.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleMenu = this.handleMenu.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.changePage = this.changePage.bind(this)
  }
  // mélange des tps pour l'aléatoire
  shuffleTp () {
    const tpRandomized = Shuffle(this.state.tp, {copy: true})
    this.setState({
      tpRandom: tpRandomized // liste des tps dans un ordre aléatoire
    })
  }
  shuffleQuestion () {
    const nbTrou = this.state.nbTrou
    function shuffleRow () {
      var trouRow = []
      var list = [0, 1, 2, 3]
      for (var i = 0; i < 4; i++) {
        var tire = Math.floor((Math.random() * (4 - i)))
        trouRow[i] = list.splice(tire, 1)[0]
      }
      for (var j = nbTrou; j < 4; j++) {
        trouRow[j] = -1
      }
      return trouRow
    }
    function shuffle () {
      let nbAleaQuest = []
      for (var i = 0; i < 134; i++) {
        var trouRow = shuffleRow()
        nbAleaQuest[i] = trouRow
      }
      return nbAleaQuest
    }
    let nbAleatoireQuestion = shuffle()
    this.setState({
      nbAleatoireQuestion: nbAleatoireQuestion
    })
  }
  // effectue action quand changement effectuer dans les options aléatoire et limite
  handleInputChange (e) {
    // target de l'input
    const target = e.target
    /* valeur de l'input: si c'est une checkbox, retourne valeur de checked sinon si c'est un nombre, retorune la valeur passé dans la fonction setLimite,
     sinon retourne valeur */
    const value = target.type === 'checkbox' ? target.checked : target.type === 'number' ? parseInt(target.value, 10) : target.value
    // nom de l'input
    const name = target.name
    // setState du nom de la target avec la valeur
    this.setState({
      [name]: value
    })
  }
  // effectue une action quand on change de colonne dans les Select
  handleSelect (e) {
    // state de l'ordre des colonnes avant
    const previousColonne = this.state.colonne
    // numéro de la colonne
    const numero = e.target.id
    const nbValueCol = e.target.value
    const valueSelect = options[nbValueCol].value
    const labelSelect = options[nbValueCol].label
    var colonne
    // function qui set value, label, affichage pour le state colonne en fct du select
    function setColonne (nb, value, label, affichage, previousColonne) {
      if (value) previousColonne[nb].value = value
      if (label) previousColonne[nb].label = label
      previousColonne[nb].afficher = affichage
      return previousColonne
    }
    // si la valeur est égal à vide on set juste la visibilité à none
    if (valueSelect === 'vide') {
      colonne = setColonne(numero, valueSelect, labelSelect, false, previousColonne)
    } else { // sinon on set la visibilité à inline et on change la value de la colonne
      colonne = setColonne(numero, valueSelect, labelSelect, true, previousColonne)
    }
    this.setState({
      colonne: colonne
    })
  }
  handleSelectNombre (e) {
    var value = e.target.value
    var limite = this.state.limite
    var afficherNbTp
    if (value === 'tout') {
      limite = 134
      afficherNbTp = false
    } else if (value === 'libre') {
      afficherNbTp = true
    } else {
      limite = parseInt(value, 10)
    }
    this.setState({
      limite: limite,
      afficherNbTp: afficherNbTp
    })
  }
  handleClick (e) {
    // si on clic sur random, ça random
    if (e.target.id === 'shuffle') {
      this.shuffleTp()
      this.shuffleQuestion()
    } else if (e.target.id === 'correction') {
      var tp = this.state.aleatoire ? this.state.tpRandom : this.state.tp
      var reponseMauvais = 0
      var reponseVide = 0
      var reponseBon = 0
      var reponseTotal = 0
      var colonne = this.state.colonne
      var correct = (i) => colonne[i].value
      for (var i = 0; i < this.state.limite; i++) {
        for (var j = 0; j < 4; j++) {
          if (colonne[j].question) {
            if (tp[i]['correct'][correct(j)] === false) {
              reponseMauvais++
            } else if (tp[i]['correct'][correct(j)] === 'neutre') {
              reponseVide++
            } else if (tp[i]['correct'][correct(j)] === true) {
              reponseBon++
            }
            reponseTotal++
          }
        }
      }
      var ratio = reponseBon / reponseTotal
      var type = ratio >= 0.75 ? 'success' : ratio >= 0.5 ? 'warning' : 'error'
      var correction = {erreur: reponseMauvais, vide: reponseVide, correct: reponseBon, total: reponseTotal, ratio: ratio}
      this.setState({
        correction: correction
      })
      this.showAlert(type, ratio, reponseTotal, reponseVide, reponseBon, reponseMauvais)
    }
  }
  handleQuestion (e) {
    // function qui sert à attribuer une nouvelle valeur à une colonne en gardant les autres pour la visibilité
    function setValue (colonne, value, previousColonne) {
      previousColonne[colonne].question = value
      return previousColonne
    }
    const question = this.state.colonne
    const target = e.target
    const colonne = target.id.substring(3, 4)
    const value = setValue(colonne, target.checked, question)
    const name = 'question'
    this.setState({
      [name]: value
    })
  }
  handleReponse (correct, index, category) {
    let previousState
    let tpList
    if (this.state.aleatoire) {
      previousState = this.state.tpRandom
      tpList = 'tpRandom'
    } else {
      previousState = this.state.tp
      tpList = 'tp'
    }
    previousState[index]['correct'][category] = correct
    this.setState({
      [tpList]: previousState
    })
  }

  showAlert (type, ratio, total, vide, bon, mauvais) {
    function precisionRound (number, precision) {
      var factor = Math.pow(10, precision)
      return Math.round(number * factor) / factor
    }
    Alert[type](`Tu as eu ${precisionRound(ratio * 100, 2)}% <ul><li>Total: ${total}</li> <li>Bon: ${bon}</li> <li>Mauvais: ${mauvais}</li> <li>Vide: ${vide}</li></ul>`, {
      position: 'bottom-right',
      effect: 'slide',
      timeout: 7500,
      html: true
    })
  }
  handleAffReponse (e) {
    var value = e.target.checked
    this.setState({
      afficherReponse: value
    })
  }
  handleCheck (value) {
    let tp = this.state.tp
    tp[value].afficher = !tp[value].afficher
    // décocher selectAll
    function isSelectAll () {
      var reponse
      for (let i in tp) {
        if (!tp[i].afficher) {
          reponse = false
          break
        } else {
          reponse = true
        }
      }
      return reponse
    }
    let selectAll = isSelectAll()
    this.setState({
      tp: tp,
      selectAllChbx: selectAll
    })
  }

  selectAll () {
    var tp = this.state.tp
    var selectAllChbx = this.state.selectAllChbx
    if (selectAllChbx) {
      for (let i in tp) {
        tp[i].afficher = false
      }
    } else {
      for (let i in tp) {
        tp[i].afficher = true
      }
    }
    selectAllChbx = !selectAllChbx
    this.setState({
      tp: tp,
      selectAllChbx: selectAllChbx
    })
  }

  handleSelectionTpOpen () {
    this.setState({ selectionPage: true })
  };

  handleSelectionTpClose () {
    // this.shuffleTp()
    this.setState({ selectionPage: false })
  };
  handleDrawerToggle () {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }
  handleClickQuestionnaire (e) {
    if (e.target.id === 'questionnaireOpen') {
      this.setState({ aleatoireQuestion: true })
    } else {
      this.setState({ aleatoireQuestion: false })
    }
  }
  handleChangeNbTrou (e) {
    var value = e.target.value
    this.setState({ nbTrou: value }, () => this.shuffleQuestion())
  }
  handleMenu (event) {
    this.setState({ anchorEl: event.currentTarget })
  }
  handleClose () {
    this.setState({ anchorEl: null })
  }
  login () {
    this.setState({signIn: true})
    /* auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user
        this.setState({
          user
        })
      }) */
  }
  logout () {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        })
      })
  }
  changePage (page) {
    var uiConfig = this.state.uiConfig
    uiConfig.signInSuccessUrl = page
    this.setState({uiConfig: uiConfig})
  }
  componentWillMount () {
    // IMPORT TP FROM FIRESTORE
    db
      .collection('tp').doc('neerlandais')
      .get()
      .then(tps => {
        this.setState({tp: tps.data().neerlandais})
        // console.log(tps.data().neerlandais)
        this.shuffleTp()
      })

    const uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'redirect',
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      signInSuccessUrl: this.state.page,
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccess: (authResult, page) => {
          function writeUserData (userId, name, email, imageUrl) {
            db
              .collection('users')
              .doc(userId)
              .set({
                username: name,
                email: email,
                imageUrl: imageUrl
              })
              .then(function () {
                this.setState({test: userId})
                console.log('Document successfully written!')
              })
              .catch(function (error) {
                console.error('Error writing document: ', error)
              })
          }
          writeUserData(authResult.uid, authResult.displayName, authResult.email, authResult.photoURL)
          return true
        }
      }
    }
    this.shuffleTp(this.state.tp)
    this.shuffleQuestion()
    this.setState({
      loading: false,
      uiConfig: uiConfig,
      page: window.location.pathname
    })
  }
  componentDidMount () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db
          .collection('users')
          .doc(user.uid)
          .get()
          .then(doc => this.setState({user: doc.data()}))
      }
    })
  }

  componentWillUnmount () {
    // firebase.off()
  }
  render () {
    const { classes } = this.props
    /* matomo.on('error', function (err) {
      console.log('error tracking request: ', err)
    }) */
    /* matomo.track({
      url: 'https://flamboyant-chandrasekhar-71d621.netlify.com/',
      action_name: 'Main Page'
    }) */
    if (process.env.NODE_ENV === 'test') {
      ReactGA.initialize(process.env.REACT_APP_GA, { testMode: true })
    } else {
      ReactGA.initialize(process.env.REACT_APP_GA)
    }
    ReactGA.pageview(window.location.pathname + window.location.search)
    return (
      <BrowserRouter>
        <div>
          <CssBaseline />
          <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
              <Helmet
                title="Questionnaire Tp Néérlandais"
                meta={[
                  { name: 'description', content: 'Questionnaire Tp Néérlandais' },
                  { name: 'keywords', content: 'tp, temps primitifs, neelandais, grammaire, conjugaison' }
                ]}
              />
              <ButtonAppBar
                classes = {classes}
                user = {this.state.user}
                login = {this.login}
                logout = {this.logout}
                anchorEl = {this.state.anchorEl}
                handleMenu = {this.handleMenu}
                handleClose = {this.handleClose}
                page = {this.state.page}
              />
              <div>
                <Switch>
                  <Route
                    exact
                    path='/'
                    render={
                      () =>
                        (isMobile ? (<Redirect to="/Mobile"/>) : (
                          <Home
                            classes = {classes}
                            handleInputChange = {this.handleInputChange}
                            handleClick = {this.handleClick}
                            handleSelect = {this.handleSelect}
                            handleAffReponse = {this.handleAffReponse}
                            handleSelectionTpOpen = {this.handleSelectionTpOpen}
                            handleSelectionTpClose = {this.handleSelectionTpClose}
                            handleQuestion = {this.handleQuestion}
                            handleDrawerToggle = {this.handleDrawerToggle}
                            handleReponse = {this.handleReponse}
                            handleCheck = {this.handleCheck}
                            selectAll = {this.selectAll}
                            selectAllChbx = {this.state.selectAllChbx}
                            selectionPage = {this.state.selectionPage}
                            aleatoire = {this.state.aleatoire}
                            afficherReponse = {this.state.afficherReponse}
                            limite = {this.state.limite}
                            tpLength = {this.state.tp.length}
                            colonne = {this.state.colonne}
                            mobileOpen = {this.state.mobileOpen}
                            tp = {this.state.tp}
                            tpRandom={this.state.tpRandom}
                            tpExclu = {this.state.tpExclu}
                            aleatoireQuestion={this.state.aleatoireQuestion}
                            nbAleatoireQuestion = {this.state.nbAleatoireQuestion}
                            handleClickQuestionnaire={this.handleClickQuestionnaire}
                            nbTrou = {this.state.nbTrou}
                            handleChangeNbTrou = {this.handleChangeNbTrou}
                            handleSelectNombre = {this.handleSelectNombre}
                            afficherNbTp = {this.state.afficherNbTp}
                            changePage= {this.changePage}
                            advanced = {this.state.advanced}
                          />
                        )
                        )
                    }/>
                  { /* <Route exact path='/Questionnaire' component = {Questionnaire} /> */ }
                  <Route exact path='/Mobile' component={Mobile(classes)} />
                  <Route exact path='/Auth' render= {() => <Auth classes = {classes} uiConfig = {this.state.uiConfig} user = {this.state.user} /> } />
                  <Route exact path='/Bienvenue' render = {() => <Bienvenue classes = {classes} />} />
                  <Route exact path='/Profile' render = {() => (<Profile classes = {classes} user = {this.state.user}/>)} />
                </Switch>
              </div>
            </div>
          </MuiThemeProvider>
        </div>
      </BrowserRouter>
    )
  }
})
