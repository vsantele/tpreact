/*eslint-disable */
import React, {Component} from 'react'
import 'raf/polyfill'
// import Tp from './tp.json'
import Shuffle from 'shuffle-array'
// import Alert from 'react-s-alert'
import CssBaseline from '@material-ui/core/CssBaseline'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import withStyles from '@material-ui/core/styles/withStyles'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Helmet from 'react-helmet'
// import Drawer from '@material-ui/core/Drawer'
import { BrowserRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom'
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
import Footer from './Components/Footer'
import About from './Pages/About'
/*eslint-enable */
// var matomo = new MatomoTracker(2, 'http://wolfvic.toile-libre.org/admin/analytics/piwik.php')

// const Loading = () => {
//   console.log('loading')
//   return (
//     <div style={{
//       backgroundColor: theme.palette.background.default,
//       width: `100%`,
//       padding: theme.spacing.unit * 3,
//       height: 'calc(100% - 56px)',
//       marginTop: 56,
//       [theme.breakpoints.up('sm')]: {
//         height: 'calc(100% - 64px)',
//         marginTop: 64
//       }
//     }}>CHARGEMENT.....</div>
//   )
// }

// const ErrorComponent = ({error}) => {
//   return (
//     <div style={{
//       backgroundColor: theme.palette.background.default,
//       width: `100%`,
//       padding: theme.spacing.unit * 3,
//       height: 'calc(100% - 56px)',
//       marginTop: 56,
//       [theme.breakpoints.up('sm')]: {
//         height: 'calc(100% - 64px)',
//         marginTop: 64
//       }
//     }}>
//     Oups! {error.message} 💥
//     </div>
//   )
// }

// eslint-disable-next-line
// const Mobile = loadable( () => import('./Pages/Mobile.js'), {
//   LoadingComponent: Loading,
//   ErrorComponent: ErrorComponent
// })
// eslint-disable-next-line
// const Home = loadable( () => import('./Pages/Home'), { // eslint-disable-next-line
//   LoadingComponent: Loading,
//   ErrorComponent: ErrorComponent
// })

// const Selection = loadable( () => import('./Pages/Selection'), {
//     LoadingComponent: Loading,
//     ErrorComponent: ErrorComponent
// })

// const Auth = loadable( () => import('./Components/Auth'), {
//   LoadingComponent: Loading,
//   ErrorComponent: ErrorComponent
// }) 

// const Liste = loadable(() => import('./Pages/Liste'),{
//   LoadingComponent: Loading,
//   ErrorComponent: ErrorComponent
// })

// const Profile = loadable(() => import('./Pages/Profile'),{
//   LoadingComponent: Loading,
//   ErrorComponent: ErrorComponent
// })

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true, // chargment en cours
      tp: [], // liste des tps dans l'ordre
      tpLength: -1,
      lang: 'neerlandais',
      // tpExclu: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133], // tps à exclure de l'affichage en se basant sur la value infNL (TODO: Ajout index maybe)
      tpExclu: [],
      colonne: [
        {value: 'infNl', label: 'Infinitif néerlandais', question: false, afficher: true},
        {value: 'OVT', label: 'Imparfait', question: false, afficher: true},
        {value: 'PP', label: 'Participe passé', question: false, afficher: true},
        {value: 'infFr', label: 'Infinitif français', question: false, afficher: true}
      ], // ordre des colonnes
      aleatoire: false, // ordre aleatoire ou non
      limite: 20, // limite d'affichage des tps
      correction: {erreur: 0, vide: 0, correct: 0, total: 0},
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
      msgSnackbar: 'Erreur texte Snackbar...',
      valueSelectTp: 20,
      listSelected: false,
      nbAleatoireQuestion: [],
      idList: ''
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
    this.changePage = this.changePage.bind(this)
    this.selectList = this.selectList.bind(this)
    this.connexion = this.connexion.bind(this)
    this.setListWithToken = this.setListWithToken.bind(this)
    this.selectTp = this.selectTp.bind(this)
    this.allList = this.allList.bind(this)
    this.resetTp = this.resetTp.bind(this)
    this.resetQuestion = this.resetQuestion.bind(this)
    this.selectLang = this.selectLang.bind(this)
    this.loadTp = this.loadTp.bind(this)
    this.handleRandom = this.handleRandom.bind(this)
    this.resetLimite = this.resetLimite.bind(this)
  }
  // mélange des tps pour l'aléatoire
  shuffleTp () {
    const tpRandomized = Shuffle(this.state.tp, {copy: true})
    this.setState({
      tpRandom: tpRandomized // liste des tps dans un ordre aléatoire
    })
  }
  shuffleQuestion (nbTrou) {
    const tpLength = this.state.tpLength
    const nbCol = this.state.colonne.length
    let list = []
    for (let i = 0; i < nbCol; i++) {
      list.push(i)
    }
    function shuffleRow () {
      var trouRow = []
      let listC = Array.from(list)
      for (var i = 0; i < nbTrou; i++) {
        var tire = Math.floor((Math.random() * listC.length))
        trouRow[i] = listC.splice(tire, 1)[0]
      }
      for (var j = nbTrou; j < nbCol; j++) {
        trouRow[j] = -1
      }
      return trouRow
    }
    function shuffle () {
      let nbAleaQuest = []
      for (var i = 0; i < tpLength; i++) {
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
    console.log(target)
    /* valeur de l'input: si c'est une checkbox, retourne valeur de checked sinon si c'est un nombre, retorune la valeur passé dans la fonction setLimite,
     sinon retourne valeur */
    // nom de l'input
    const name = target.name
    const value = parseInt(target.value, 10)
    if (value <= (this.state.nbTpSelected || this.state.tp.length) && value > 0) {
    // setState du nom de la target avec la valeur
    this.setState({
      [name]: value
    })
  }
  }
  handleRandom () {
    this.shuffleTp()
    this.setState({aleatoire: !this.state.aleatoire})
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
      limite = this.state.nbTpSelected || this.state.tp.length
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
    this.shuffleQuestion(this.state.nbTrou)
    this.shuffleTp()
  }
  handleQuestion (col) {
    // // OLD function qui sert à attribuer une nouvelle valeur à une colonne en gardant les autres pour la visibilité 
    // function setValue (colonne, value, previousColonne) {
    //   previousColonne[colonne].question = value
    //   return previousColonne
    // }
    // const question = this.state.colonne
    // const target = e.target
    // const colonne = target.id.substring(3, 4)
    // const value = setValue(colonne, target.checked, question)
    // const name = 'question'
    // this.setState({
    //   [name]: value
    // })
    let colonne = this.state.colonne
    colonne.map((colonne, index) => {
      if (col.indexOf(index) !== -1) {
        colonne.question = true
      } else {
        colonne.question = false
      }
      return true
    })
    this.setState({colonne: colonne})
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
    this.setState({tp: tp, selectAllChbx: true, afficherNbTp: false})
  }

  handleSelectionTpOpen () {
    this.setState({ selectionPage: true })
  }

  handleSelectionTpClose () {
    let nbTpSelected = 0
    this.state.tp.forEach((tp) => {
      nbTpSelected += tp.afficher ? 1 : 0
    })
    let valueSelectTp
    let limite
    let afficherNbTp
    switch (nbTpSelected) {
      case 10:
        limite = 10
        valueSelectTp = 10
        afficherNbTp = false
        break
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
        limite = this.state.tp.length
        valueSelectTp = 'tout'
        afficherNbTp = false
        break
      default:
        limite = nbTpSelected
        valueSelectTp = 'libre'
        afficherNbTp = true
    }
    this.setState({ selectionPage: false, limite, valueSelectTp, afficherNbTp, nbTpSelected }, () => this.shuffleTp())
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

  selectTp (list, id) {
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
    switch (list.length) {
      case 10:
        limite = 10
        valueSelectTp = 10
        afficherNbTp = false
        break
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
        limite = this.state.tp.length
        valueSelectTp = 'tout'
        afficherNbTp = false
        break
      default:
        limite = list.length
        valueSelectTp = 'libre'
        afficherNbTp = true
    }
    this.setState({ tp, selectAllChbx, limite, valueSelectTp, afficherNbTp, listSelected: true, idList: id, nbTpSelected: list.length })
    return Promise.resolve()
  }

  selectList (id) {
    db
      .collection('users')
      .doc(this.state.user.uid)
      .collection('lists')
      .get()
      .then(collection => {
        const listName = collection.docs.map(doc => { return {name: doc.data().name, id: doc.data().id, tps: doc.data().tps, lang: doc.data().lang} })
        return {list: listName.filter(list => list.id === id)[0].tps, lang: listName.lang}
      })
      .then((list) => this.selectTp(list.list))
      .then(this.setState({msgSnackbar: 'Liste appliquée avec succès!', openSnackbar: true}))
      .catch((error) => {
        this.setState({openSnackbar: true, msgSnackbar: `Erreur: ${error} `})
      })
  }

  setListWithToken (result) {
    const lang = result.lang
    if (lang === this.state.lang) {
      return this.selectTp(result.tps)
    } else {
      return this.loadTp(lang).then(() => {
        this.setState({lang: lang})
        return this.selectTp(result.tps)
      })
    }
  }

  resetTp () {
    let tp = this.state.tp
    let colonne = this.state.colonne
    tp.forEach(tp => {
      colonne.map(col => {
        let nomCol = col.value
        tp['correct'][nomCol] = 'neutre'
      })
    })
    this.setState({tp: tp})
    this.shuffleTp()
  }

  /* addList (token) {
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
  } */

  resetQuestion () {
    let col = this.state.colonne
    col.map(col => {
      col.question = false
      return null
    })
    this.setState({colonne: col})
  }
  resetLimite () {
    this.setState({limite: 20, valueSelectTp: 20})
  }

  selectLang (lang) {
    this.loadTp(lang)
    this.setState({lang: lang})
  }

  loadTp (lang) {
    // IMPORT TP FROM FIRESTORE
    return db
      .collection('tp').doc(lang)
      .get()
      .then(tps => {
        this.setState({tp: tps.data().tp, colonne: tps.data().headers, tpLength: tps.data().tp.length})
      })
      .then(() => {
        this.shuffleTp(this.state.tp)
        this.shuffleQuestion(1)
      })
      .then(() => {
        this.setState({loading: false})
        return true
      })
      .catch(err => {
        if (err) {
          console.log(err)
          return false
        } else return true
      })
  }

  connexion () {
    auth.signInWithPopup(provider).then(result => {
      const userAuth = result.user
      const userRef = db.collection('users').doc(userAuth.uid)
      db.runTransaction((transaction) => {
        return transaction.get(userRef).then(user => {
          if (!user.exists) {
            console.log(user)
            transaction.set(userRef, {
              id: userAuth.uid,
              displayName: userAuth.displayName,
              photoURL: userAuth.photoURL,
              email: userAuth.email,
              locale: result.additionalUserInfo.profile.locale,
              provider: result.additionalUserInfo.providerId,
              dlLimit: 10
            })
            return 'set'
          } else {
            transaction.update(userRef, {
              id: userAuth.uid,
              displayName: userAuth.displayName,
              photoURL: userAuth.photoURL,
              email: userAuth.email,
              locale: result.additionalUserInfo.profile.locale,
              provider: result.additionalUserInfo.providerId
            })
            return 'update'
          }
        })
      }).then((info) => console.log('Information ' + info))
        .catch(err => console.error(err))
    }).catch(error => {
      console.error('Error authentification: ', error)
    })
  }

  componentWillMount () {
    this.loadTp('neerlandais')
  }
  componentDidMount () {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userInfo = await db.collection('users').doc(user.uid).get().then(data => {
          const {id, displayName, photoURL, email, locale, dlLimit} = data.data()
          const user = {
            uid: id,
            displayName,
            photoURL,
            email,
            locale,
            dlLimit
          }
          return user
        })
        this.setState({user: userInfo})
      }
    })
  }

  componentWillUnmount () {
    // firebase.off()
  }
  render () {
    const { classes } = this.props
    if (process.env.NODE_ENV === 'test') {
      ReactGA.initialize(process.env.REACT_APP_GA, { testMode: true })
    } else {
      ReactGA.initialize(process.env.REACT_APP_GA)
    }
    ReactGA.pageview(window.location.pathname + window.location.search)
    return (
      <div>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <div className={classes.main}>
            <Helmet
              title={'Tp ' + this.state.lang}
              meta={[
                { name: 'description', content: 'Verbes irréguliers' + this.state.lang },
                { name: 'keywords', content: 'tp, temps primitifs, neelandais, grammaire, conjugaison, verbes irréguliers, verbe irégulier, anglais, allemand' }
              ]}
            />
            <ButtonAppBar
              classes = {classes}
              user = {this.state.user}
              login = {this.login}
              logout = {this.logout}
              page = {this.state.page}
              lang = {this.state.lang}
              selectLang={this.selectLang}
            />
            <div className = {classes.flex}>
              <Switch>
                <Redirect exact from='/' to='/Bienvenue' />
                <Route exact path='/Auth' render= {() => <Auth classes = {classes} user = {this.state.user} connexion={this.connexion} /> } />
                <Route exact path='/Profile' render = {() => (<Profile classes = {classes} user = {this.state.user}/>)} />
                <Route exact path='/Bienvenue' render = {() => <Bienvenue classes = {classes} resetLimite = {this.resetLimite} lang = {this.state.lang} user = {this.state.user} setListWithToken={this.setListWithToken} selectTp={this.selectTp}/>} />
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
                    lang = {this.state.lang}
                    listId={this.state.listId}
                  />}
                />
                <Route exact path='/Liste' render = {(link) => <Liste classes= {classes} user = {this.state.user} colonne={this.state.colonne} allList = {this.allList} link = {link}/>}/>
                <Route exact path='/About' render={() => <About classes ={classes}/>}/>
                <Route
                  path='/Home'
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
                        resetQuestion = {this.resetQuestion}
                        history = {this.props.history}
                        handleRandom = {this.handleRandom}
                        lang={this.state.lang}
                        nbTpSelected = {this.state.nbTpSelected}
                      />
                      )
                  }/>
              </Switch>
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={this.state.openSnackbar}
                autoHideDuration={6000}
                onClose={() => this.setState({openSnackbar: false})}
                ContentProps={{
                  'aria-describedby': 'Liste appliquée'
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
                  </IconButton>
                ]}
              />
            </div>
            <Footer />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(App))
