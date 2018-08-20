﻿/*eslint-disable */
import React, {Component} from 'react'
import 'raf/polyfill'
// import Tp from './tp.json'
import Shuffle from 'shuffle-array'
import 'react-select/dist/react-select.css'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
// import Alert from 'react-s-alert'
import CssBaseline from '@material-ui/core/CssBaseline'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import withStyles from '@material-ui/core/styles/withStyles'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Helmet from 'react-helmet'
// import Drawer from '@material-ui/core/Drawer'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import ReactGA from 'react-ga'
import { auth, provider, db } from './firebase/firebase.js'
import ButtonAppBar from './Components/ButtonAppBar'
import Home from './Pages/Home'
import Auth from './Components/Auth'
import styles from './config/styles'
import theme from './config/theme'
import options from './config/options'
// import isMobile from './scripts/isMobile'
import Bienvenue from './Pages/Bienvenue'
import loadable from 'loadable-components'
import Profile from './Pages/Profile'
import Selection from './Pages/Selection'
import Liste from './Pages/Liste'
/*eslint-enable */
// var matomo = new MatomoTracker(2, 'http://wolfvic.toile-libre.org/admin/analytics/piwik.php')

const Loading = () => {console.log("loading"); return(
  <div style={{
    backgroundColor: theme.palette.background.default,
    width: `100%`,
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    }
   }}>CHARGEMENT.....</div>
)}

const ErrorComponent = ({error}) => {return(
  <div style={{
    backgroundColor: theme.palette.background.default,
    width: `100%`,
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    }
  }}>
    Oups! {error.message} 💥
  </div>
)}

// eslint-disable-next-line
const Mobile = loadable( () => import('./Pages/Mobile.js'), {
  LoadingComponent: Loading,
  ErrorComponent: ErrorComponent
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
        {value: 'infNl', label: 'Infinitif Nl', question: false, afficher: true},
        {value: 'OVT', label: 'OVT', question: false, afficher: true},
        {value: 'PP', label: 'Participe Passé', question: false, afficher: true},
        {value: 'infFr', label: 'Infinitif FR', question: false, afficher: true}
      ], // ordre des colonnes
      aleatoire: false, // ordre aleatoire ou non
      limite: 20, // limite d'affichage des tps
      correction: {erreur: 0, vide: 0, correct: 0, total: 0},
      anchorEl: null,
      selectionPage: false,
      selectAllChbx: true,
      mobileOpen: false,
      aleatoireQuestion: false,
      nbTrou: 1,
      afficherNbTp: false,
      user: null,
      signIn: false,
      page: '/Home',
      advanced: false,
      mobile: false,
      msgSnackbar:'Erreur texte Snackbar...',
      valueSelectTp: 20,
      listSelected: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleQuestion = this.handleQuestion.bind(this)
    this.handleReponse = this.handleReponse.bind(this)
    this.shuffleTp = this.shuffleTp.bind(this)
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
    this.selectList = this.selectList.bind(this)
    this.connexion = this.connexion.bind(this)
    this.setListWithToken = this.setListWithToken.bind(this)
    this.selectTp = this.selectTp.bind(this)
    this.addList = this.addList.bind(this)
    this.allList = this.allList.bind(this)
    this.resetTp = this.resetTp.bind(this)
  }
  // mélange des tps pour l'aléatoire
  shuffleTp () {
    const tpRandomized = Shuffle(this.state.tp, {copy: true})
    this.setState({
      tpRandom: tpRandomized // liste des tps dans un ordre aléatoire
    })
  }
  shuffleQuestion (nbTrou) {
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
    const value = target.id === 'aleatoire' ? !this.state.aleatoire : target.type === 'number' ? parseInt(target.value, 10) : target.value
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
    let value = e.target.value
    let limite = this.state.limite
    let afficherNbTp
    let valueSelectTp
    if (value === 'tout') {
      limite = 134
      valueSelectTp = 'tout'
      afficherNbTp = false
    } else if (value === 'libre') {
      afficherNbTp = true
      valueSelectTp = 'libre'
    } else {
      limite = parseInt(value, 10)
      afficherNbTp = false
      valueSelectTp = limite
    }
    this.setState({
      limite: limite,
      afficherNbTp: afficherNbTp,
      valueSelectTp: valueSelectTp
    })
  }
  handleClick (e) {
    // si on clic sur random, ça random
      this.shuffleTp()
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

  allList () {
    let tp = this.state.tp
    for (let i in tp) {
      tp[i].afficher = true
    }
    this.setState({tp: tp, selectAllChbx: true, limite: 134, afficherNbTp: false, valueSelectTp: 'tout'})
  }

  handleSelectionTpOpen () {
    this.setState({ selectionPage: true })
  }

  handleSelectionTpClose () {
    let nbTpSelected = 0
    this.state.tp.forEach((tp) => {
      tp.afficher? nbTpSelected ++ : null
    })

    let valueSelectTp
    let limite
    let afficherNbTp
    switch(nbTpSelected) {
      case 20:
        limite = 20
        valueSelectTp = 20
        afficherNbTp = false
        break
      case 40:
        limite = 40
        valueSelectTp = 40
        afficherNbTp = false
       break
      case 60:
        limite = 60
        valueSelectTp = 60
        afficherNbTp = false
        break
      case this.state.tp.length:
        limite = 134
        valueSelectTp = 'tout'
        afficherNbTp = false
        break
      default:
        limite = nbTpSelected
        valueSelectTp = 'libre'
        afficherNbTp = true

    }
    this.setState({ selectionPage: false, limite: limite, valueSelectTp: valueSelectTp, afficherNbTp: afficherNbTp  })
    this.shuffleTp()
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
    this.setState({ nbTrou: value }, () => this.shuffleQuestion(value))
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

  selectTp(list) {
    let tp = this.state.tp
      for (let i in tp) {
        if (list.indexOf(Number(i)) === -1) {
          tp[i].afficher = false
        } else {
          tp[i].afficher = true
        }
      }
      let selectAllChbx = tp.filter(tp => tp.afficher).length === tp.length
      let valueSelectTp
      let limite
      let afficherNbTp
      switch(list.length) {
        case 20:
          limite = 20
          valueSelectTp = 20
          afficherNbTp = false
          break
        case 40:
          limite = 40
          valueSelectTp = 40
          afficherNbTp = false
         break
        case 60:
          limite = 60
          valueSelectTp = 60
          afficherNbTp = false
          break
        case tp.length:
          limite = 134
          valueSelectTp = 'tout'
          afficherNbTp = false
          break
        default:
          limite = list.length
          valueSelectTp = 'libre'
          afficherNbTp = true
      }
      this.setState({tp: tp, selectAllChbx: selectAllChbx, limite: limite, valueSelectTp: valueSelectTp, afficherNbTp: afficherNbTp, listSelected: true })
  }

  selectList (id) {
    db
    .collection('users')
    .doc(this.state.user.uid)
    .collection('lists')
    .get()
    .then(collection => {
      const listName = collection.docs.map(doc => { return {name: doc.data().name, id: doc.data().id, tps: doc.data().tps} })
      return listName.filter(list => list.id === id)[0].tps
    })
    .then((list) => this.selectTp(list))
    .then(this.setState({msgSnackbar: 'Liste appliquée avec succès!', openSnackbar: true}))
    .catch((error) => {
      this.setState({openSnackbar: true, msgSnackbar: `Erreur: ${error} `})
    })
  }

  setListWithToken (result) {
    this.selectTp (result)
  }

  resetTp () {
    console.log('resetTp')
    let tp = this.state.tp
    let colonne = this.state.colonne
    tp.map(tp => {
      for (let i = 0; i < 4; i++) {
        let nomCol = colonne[i].value
        tp['correct'][nomCol] = 'neutre'
      }
    })
    this.setState({tp: tp})
    this.shuffleTp()
  }

  addList (token) {
    let msgSnackbar = ''
    // eslint-disable-next-line
    let header = new Headers()
    header.append('Content-Type', 'application/json')
    const url = 'https://europe-west1-tpneerandais.cloudfunctions.net/addListWithCode?token=' + token
    if (token.length !== 5) {
      console.error('Erreur, taille token incorrect')
      msgSnackbar = 'Erreur, taille token incorrect'
      this.setState({msgSnackbar: msgSnackbar, openSnackbar: true})
    } else {
      // eslint-disable-next-line
      const req = new XMLHttpRequest()
      req.open('POST', url)
      // req.responseType = 'json'
      req.onload = () => {
        console.log(req.response)
        const body = req.response
        if (req.status === 200) {
          console.log('réponse recue: %s', req.responseType)
        } else {
          console.log('Status de la réponse %d (%s)', req.status, req.statusText)
        }
        try {
          if (req.status === 500) {
            throw new Error('Erreur serveur, ' + body)
          }
          let result = JSON.parse(body)
          let list = {
            name: result.name,
            tps: result.tps
          }
          console.log(result)
          this.setListWithToken(result.tps)
          msgSnackbar = 'List importé avec succès'
          this.setState({msgSnackbar: msgSnackbar})
          return list
        } catch (e) {
          msgSnackbar = e.message
          console.error('Erreur request: ', e.message)
          this.setState({msgSnackbar: msgSnackbar, openSnackbar: true})
          return e
        }
      }
      req.send()
    }
  }

  connexion () {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user
      db
        .collection('users')
        .doc(user.uid)
        .set({
          id: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          locale: result.additionalUserInfo.profile.locale,
          provider: result.additionalUserInfo.providerId
        })
        .then(function () {
          console.log('Document successfully written!') 
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    }).catch(error => {
      console.error('Error authentification: ', error)
    })
  }

  componentWillMount () {
    // IMPORT TP FROM FIRESTORE
    db
      .collection('tp').doc('neerlandais')
      .get()
      .then(tps => {

        //this.shuffleTp(tps.data().neerlandais)
        this.setState({tp: tps.data().neerlandais})
      })
      .then(() => {
        this.shuffleTp(this.state.tp)
      })
      .then(() => this.setState({loading: false}))
    this.shuffleQuestion()
    this.setState({
      page: window.location.pathname
    })
  }
  componentDidMount () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user: user})
      }
    })
    // function $_GET(param) {
    //   var vars = {}
    //   //eslint-disable-next-line
    //   window.location.href.replace( location.hash, '' ).replace( 
    //     /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    //     function( m, key, value ) { // callback
    //       vars[key] = value !== undefined ? value : ''
    //     }
    //   )
    //   if ( param ) {
    //     return vars[param] ? vars[param] : null
    //   }
    //   return vars
    // }
    // const token = decodeURI($_GET("token"))
    // console.log(token)
    // if (token) this.addList(token)
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
            <div>
              <Helmet
                title="Tp Néérlandais"
                meta={[
                  { name: 'description', content: 'Verbes irréguliers néérlandais' },
                  { name: 'keywords', content: 'tp, temps primitifs, neelandais, grammaire, conjugaison, verbes irréguliers, verbe irégulier' }
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
                  <Redirect exact from='/' to='/Bienvenue' />
                  { /* <Route exact path='/Questionnaire' component = {Questionnaire} /> */ }
                  <Route exact path='/Auth' render= {() => <Auth classes = {classes} user = {this.state.user} connexion={this.connexion} /> } />
                  <Route exact path='/Profile' render = {() => (<Profile classes = {classes} user = {this.state.user}/>)} />
                  <Route exact path='/Bienvenue' render = {() => <Bienvenue classes = {classes} user = {this.state.user} setListWithToken={this.setListWithToken} selectTp={this.selectTp}/>} />
                  <Route extact path='/Selection' render = {
                    () => <Selection
                      classes = {classes}  
                      handleSelectionTpOpen = {this.handleSelectionTpOpen}
                      handleSelectionTpClose = {this.handleSelectionTpClose}
                      selectAll = {this.selectAll}
                      selectAllChbx = {this.state.selectAllChbx}
                      selectionPage = {this.state.selectionPage}
                      tp = {this.state.tp}
                      user = {this.state.user}
                      setListWithToken={this.setListWithToken}
                      colonne = {this.state.colonne}
                      loading={this.state.loading}
                      handleCheck = {this.handleCheck}
                     />}
                  />
                  <Route exact path='/Liste' render = {(link) => <Liste classes= {classes} user = {this.state.user} allList = {this.allList} link = {link}/>}/>
                  <Route
                    path='/Home' // path='/:type/:token
                    render={
                      (link) =>
                        (<Home
                            classes = {classes}
                            handleInputChange = {this.handleInputChange}
                            handleClick = {this.handleClick}
                            handleSelect = {this.handleSelect}
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
                            valueSelectTp = {this.state.valueSelectTp}
                            afficherNbTp = {this.state.afficherNbTp}
                            changePage= {this.changePage}
                            advanced = {this.state.advanced}
                            loading = {this.state.loading}
                            user = {this.state.user}
                            selectList = {this.selectList}
                            setListWithToken={this.setListWithToken}
                            listSelected = {this.state.listSelected}
                            allList = {this.allList}
                            shuffleQuestion={this.shuffleQuestion}
                            link = {link}
                            resetTp = {this.resetTp}
                          />
                        )
                    }/>
                </Switch>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={this.state.openSnackbar}
                  autoHideDuration={6000}
                  onClose={() => this.setState({openSnackbar: false})}
                  ContentProps={{
                    'aria-describedby': 'Liste appliquée',
                  }}
                  message={<span id='listSnack'>{this.state.msgSnackbar} </span>}
                  action={[
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      className={classes.close}
                      onClick={() => this.setState({openSnackbar: false})}
                    >
                      <CloseIcon />
                    </IconButton>,
                  ]}
                />
              </div>
            </div>
          </MuiThemeProvider>
        </div>
      </BrowserRouter>
    )
  }
})
