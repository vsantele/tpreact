// eslint-disable-next-line
import React, {Component} from 'react'
import './App.css'
// eslint-disable-next-line
import ReactLoading from 'react-loading'
// import MINI from 'minified'
import Tp from './tp.json'
import Shuffle from 'shuffle-array'
// eslint-disable-next-line
// import Select from 'react-select'
import 'react-select/dist/react-select.css'
// eslint-disable-next-line
// import {Button} from 'reactstrap'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import Alert from 'react-s-alert'
// Material-UI
// eslint-disable-next-line
import Reboot from 'material-ui/Reboot'
// eslint-disable-next-line
import {MuiThemeProvider, withStyles, createMuiTheme } from 'material-ui/styles'
// eslint-disable-next-line
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
// eslint-disable-next-line
import Paper from 'material-ui/Paper'
// eslint-disable-next-line
import Input, {InputLabel} from 'material-ui/Input'
// eslint-disable-next-line
import { FormControl, FormHelperText } from 'material-ui/Form'
// eslint-disable-next-line
import Select from 'material-ui/Select'
// eslint-disable-next-line
import Button from 'material-ui/Button'
// eslint-disable-next-line
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
// eslint-disable-next-line
import Checkbox from 'material-ui/Checkbox'
// eslint-disable-next-line
import Switch from 'material-ui/Switch'
// eslint-disable-next-line
import Modal from 'material-ui/Modal'
import green from 'material-ui/colors/green'
// eslint-disable-next-line
import AppBar from 'material-ui/AppBar'
// eslint-disable-next-line
import Toolbar from 'material-ui/Toolbar'
// eslint-disable-next-line
import Typography from 'material-ui/Typography'
// eslint-disable-next-line
import IconButton from 'material-ui/IconButton'
// eslint-disable-next-line
import MenuIcon from 'material-ui-icons/Menu'
// eslint-disable-next-line
import Drawer from 'material-ui/Drawer'
// eslint-disable-next-line
import Hidden from 'material-ui/Hidden'
// eslint-disable-next-line
import Divider from 'material-ui/Divider'
// eslint-disable-next-line
import ResponsiveDrawer from './Components/ResponsiveDrawer'

// eslint-disable-next-line
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
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
  bar: {},
  checked: {
    color: green[500],
    '& + $bar': {
      backgroundColor: green[500]
    }
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

const options = [
  {value: 'infNl', label: 'Infinitif NL', nb: 0},
  {value: 'OVT', label: 'OVT', nb: 1},
  {value: 'PP', label: 'Participe Passé', nb: 2},
  {value: 'infFr', label: 'Infinitif FR', nb: 3},
  {value: 'vide', label: 'Rien', nb: 4}
]

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true, // chargment en cours
      tp: Tp, // liste des tps dans l'ordre
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
      // test select
      anchorEl: null,
      selectedIndex: [0, 1, 2, 3, 4],
      selectionPage: false,
      selectAllChbx: true
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
  }
  // mélange des tps pour l'aléatoire
  shuffleTp () {
    const tpRandomized = Shuffle(this.state.tp, {copy: true})
    this.setState({
      tpRandom: tpRandomized // liste des tps dans un ordre aléatoire
    })
  }
  // effectue action quand changement effectuer dans les options aléatoire et limite
  handleInputChange (e) {
    // si la limite est vide, on retourne 20, sinon le nombre
    function setLimite (e) {
      return (isNaN(parseInt(e, 10)) ? 20 : parseInt(e, 10))
    }
    // target de l'input
    const target = e.target
    /* valeur de l'input: si c'est une checkbox, retourne valeur de checked sinon si c'est un nombre, retorune la valeur passé dans la fonction setLimite,
     sinon retourne valeur */
    const value = target.type === 'checkbox' ? target.checked : target.type === 'number' ? setLimite(target.value) : target.value
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
  handleClick (e) {
    // si on clic sur random, ça random
    if (e.target.id === 'shuffle') {
      this.shuffleTp()
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
    const colonne = target.id
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
      position: 'top-right',
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
    var tp = this.state.tp
    tp[value].afficher = !tp[value].afficher
    this.setState({tp: tp})
  }

  selectAll () {
    var tp = this.state.tp
    var selectAllChbx = this.state.selectAllChbx
    if (selectAllChbx) {
      for (let i = 0; i < 134; i++) {
        tp[i].afficher = false
      }
    } else {
      for (let i = 0; i < 134; i++) {
        tp[i].afficher = true
      }
    }
    console.log('avant: ' + selectAllChbx)
    selectAllChbx = !selectAllChbx
    console.log('après: ' + selectAllChbx)
    this.setState({
      tp: tp,
      selectAllChbx: selectAllChbx
    })
  }

  handleSelectionTpOpen () {
    this.setState({ selectionPage: true })
  };

  handleSelectionTpClose () {
    this.shuffleTp()
    this.setState({ selectionPage: false })
  };
  // effectue un premiet random (et set la fin du chargement)
  componentWillMount () {
    this.shuffleTp(this.state.tp)
    this.setState({
      loading: false
    })
  }
  render () {
    return (
      <div>
        <Reboot />
        <MuiThemeProvider theme={theme}>
        <div>
         { /* <ResponsiveDrawer/> */ }
          <ButtonAppBar classes = {styles} />
          <div style={{marginTop: '7px'}}>
            <Options
              aleatoire= {this.state.aleatoire}
              handleInputChange = {this.handleInputChange}
              handleClick = {this.handleClick}
              handleSelect = {this.handleSelect}
              handleClick = {this.handleClick}
              handleAffReponse = {this.handleAffReponse}
              limite = {this.state.limite}
              tpLength = {this.state.tp.length}
              handleSelectionTpOpen = {this.handleSelectionTpOpen}
              handleSelectionTpClose = {this.handleSelectionTpClose}
              selectAll = {this.selectAll}
              selectAllChbx = {this.state.selectAllChbx}
              selectionPage = {this.state.selectionPage}
              afficherReponse = {this.state.afficherReponse}
              handleQuestion = {this.handleQuestion}
              colonne = {this.state.colonne}
            />
          </div>
          {/* <span> Total: {this.state.correction.total} | Vide: {this.state.correction.vide} | Bon: {this.state.correction.correct} | Mauvais: {this.state.correction.erreur}</span> */}
        </div>
        <div style={{clear: 'left'}}>
          <Tableau
            handleSelect = {this.handleSelect}
            handleQuestion = {this.handleQuestion}
            tp = {this.state.tp}
            tpRandom={this.state.tpRandom}
            tpExclu = {this.state.tpExclu}
            colonne= {this.state.colonne}
            aleatoire = {this.state.aleatoire}
            limite = {this.state.limite}
            handleReponse = {this.handleReponse}
            affReponse = {this.state.afficherReponse}
            selectionPage = {this.state.selectionPage}
            handleCheck = {this.handleCheck}
          />
        </div>
        <Alert stack={{limit: 3}} />
        </MuiThemeProvider>
      </div>

    )
  }
}

// tableau qui renvoie les tps dans l'ordre ou pas en fonction de la valeur de l'aléatoire
// eslint-disable-next-line
var Tableau = function (props) {
  var tp
  if (props.selectionPage) {
    return (
      <div>
        <SelectionTp
          tp = {props.tp}
          colonne = {props.colonne}
          tpExclu = {props.tpExclu}
          handleCheck = {props.handleCheck}
        />
      </div>
    )
  } else {
    if (!props.aleatoire) {
      tp = props.tp
    } else {
      tp = props.tpRandom
    }
    return (
      <div>
        <Rendu
          handleSelect = {props.handleSelect}
          handleQuestion = {props.handleQuestion}
          tp = {tp}
          tpExclu = {props.tpExclu}
          colonne = {props.colonne}
          limite = {props.limite}
          handleReponse = {props.handleReponse}
          affReponse = {props.affReponse}
          selectionPage = {props.selectionPage}
          handleCheck = {props.handleCheck}
        />
      </div>
    )
  }
}

// affiche les tps dans un ordre aléatoire et dans l'ordre des colonnes choisi et avec la limite
// eslint-disable-next-line
var Rendu = function (props) {
  var tp = props.tp
  var limite = props.limite
  var colonne = props.colonne
  var nombre = [0, 1, 2, 3]
  return (
    <div>
      <Paper className={styles.root}>
        <Table className={styles.table} >
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              {
                nombre.map((nb) =>
                  <TableCell key= {'th' + nb} style={{'display': colonne[nb].afficher ? 'table-cell' : 'none'}}>{colonne[nb].label}</TableCell>
                )
                /* nombre.map((nb, i) =>
                  <th key = {'th' + i} style={{'display': colonne[nb].afficher ? 'table-cell' : 'none'}}> <Thead i = {i} nb = {nb} handleSelect = {props.handleSelect} handleQuestion = {props.handleQuestion} colonne = {props.colonne} /> </th>
                ) */
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              tp.map(function (listValue, index) {
                if (listValue.afficher && index < limite) {
                  return (
                    <Row key = {'row' + index}
                      index = {index}
                      listValue = {listValue}
                      colonne = {props.colonne}
                      handleReponse = {props.handleReponse}
                      affReponse = {props.affReponse}
                      selectionPage = {props.selectionPage}
                      tpAfficher = {props.tpAfficher}
                      handleCheck = {props.handleCheck}
                    />
                  )
                }
              })
            }
          </TableBody>
        </Table>
      </Paper>

    </div>
  )
}

// eslint-disable-next-line
var Row = function (props) {
  var index = props.index
  var colonne = props.colonne
  var listValue = props.listValue
  const nombre = [0, 1, 2, 3]
  return (
    <TableRow>
      <TableCell scope="row">{index + 1}</TableCell>
      {
        nombre.map((nb) =>
          <Cell
            key={'cell' + colonne[nb].value + nb}
            index = {index}
            value = {listValue}
            colonne = {colonne[nb]}
            question = {props.question}
            handleReponse = {props.handleReponse}
            affReponse = {props.affReponse}
          />
        )
      }
    </TableRow>
  )
}
// eslint-disable-next-line
var Cell = function (props) {
  function verification (e) {
    var reponse = e.target.value
    var index = e.target.id
    var correct = reponse !== '' ? reponse === value : 'neutre'
    handleReponse(correct, index, colonne.value)
  }
  var index = props.index
  var colonne = props.colonne
  var value = props.value[colonne.value]
  var handleReponse = props.handleReponse
  var correct = props.value['correct'][colonne.value]
  var affReponse = props.affReponse
  if (colonne.question === true) {
    return (
      <TableCell key = {index + 'cell'} className= {correct === true ? 'success' : correct === false ? 'danger' : ''} style = {{'display': colonne.afficher ? 'table-cell' : 'none'}}> <input key={index} id={index} tag='question' className="search-input" type="text" placeholder={'Réponse'} onBlur = {(e) => verification(e)} /> <span style={{display: affReponse ? 'inline' : 'none'}}>{value}</span> </TableCell>
    )
  } else {
    return (
      <TableCell key = {index} style = {{'display': colonne.afficher ? 'table-cell' : 'none'}}> {value} </TableCell>
    )
  }
}

// eslint-disable-next-line
/* var SelectionTp = function (props) {
  const tpList = props.tp
  const handleCheck = props.handleCheck
  const style = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    modal: {
      position: 'absolute',
      width: 8 * 50,
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      border: '1px solid #e5e5e5',
      backgroundColor: '#fff',
      boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
      padding: 8 * 4
    }
  })
  return (
    <div className={style.modal}>
      <div className={style.root}>
        <List>
          {tpList.map((value, index) => (
            <ListItem
              key={'list-' + value.id}
              dense
              button
              onClick={event => handleCheck(value.id)}
              htmlFor={'check' + index}
            >
              <Checkbox
                checked={props.tpAfficher.indexOf(value) !== -1}
                id={'check' + index}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText> {`${tpList.infNl} | ${tpList.infFr} `}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  )
} */
// <ListItemText primary={`${value.infNl} | ${value.OVT} | ${value.PP} | ${value.infFr}`} />
// eslint-disable-next-line
var Options = function (props) {

  if (props.selectionPage) {
    return (
      <div>
        <label htmlFor='selectAll'>Tout Selectionner</label>
        <Checkbox onClick={props.selectAll} id='selectAll' checked = {props.selectAllChbx}></Checkbox>
        <Button raised color="secondary" className={styles.button} onClick={props.handleSelectionTpClose} id="selectionTpClose"> Valider! </Button>
      </div>
    )
  } else {
    return (
      <div>
        <label htmlFor='aleatoire'>Aleatoire: </label> <Checkbox inputProps={{ id: 'aleatoire', tag: 'aleatoire', name: 'aleatoire', type: 'checkbox' }} color='secondary' checked={props.aleatoire} onChange={props.handleInputChange} />
        <Button raised color='secondary' className={styles.button} onClick={props.handleClick} id='shuffle' disabled = {!props.aleatoire} > Recharger </Button>
        <input id='limite' tag='limite' className="search-input" type="number" onChange={props.handleInputChange} name="limite" placeholder="Limite" value={props.limite} max= {props.tpLength} min ={0} />
        <Button raised color='secondary' onClick={props.handleSelectionTpOpen}>Selection Tp</Button>
        <div>

          {
            [0, 1, 2, 3].map((nb) => (
              <Paper style={{width: '11em', float: 'left', margin: '1em'}}>
                <FormControl className={styles.formControl}>
                  <InputLabel htmlFor={'select' + nb}>Colonne {nb + 1}</InputLabel>
                  <Select
                    native
                    onChange={(event) => props.handleSelect(event)}
                    inputProps={{
                      id: nb
                    }}
                    value={props.colonne[nb].label}
                  >
                    {[0, 1, 2, 3].map(nbCol => (
                      <option value={nbCol}>{options[nbCol].label}</option>
                    ))
                    }
                  </Select>
                  <div>
                    <label htmlFor={nb}>Question: </label>
                    <Switch
                      checked={props.colonne[nb].question}
                      onChange={event => props.handleQuestion(event)}
                      aria-label="question colonne"
                      inputProps= { {id: nb} }
                    />
                  </div>
                </FormControl>
              </Paper>
            ))}
          <div style={{width: '12em', float: 'left', margin: '1em'}}>
            <Button raised color="secondary" className={styles.button} id='correction' onClick={props.handleClick}>Correction</Button>
            <label htmlFor='affReponse'>Afficher Réponse : </label> <Checkbox inputProps={{ id: 'affReponse', name: 'affReponse', type: 'checkbox' }} checked={props.afficherReponse} onChange={ props.handleAffReponse} />
          </div>
        </div>
      </div>
    )
  }
}

// eslint-disable-next-line
var SelectionTp = function (props) {
  const tp = props.tp
  const colonne = props.colonne
  var handleCheck = props.handleCheck

  return (
    <Paper className={styles.root}>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell> </TableCell>
            {[0, 1, 2, 3].map(nb => <TableCell key={'STH' + nb}>{colonne[nb].label}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            tp.map((tp, index) => {
              return (
                <TableRow onClick={event => handleCheck(index)} key={'rowSeTp' + index}>
                  <TableCell scope = 'row'> {index + 1 }</TableCell>
                  <TableCell key = {'chbk' + index}>
                    <Checkbox
                      checked={tp.afficher}
                      id={'check' + index}
                      tabIndex={-1}
                      disableRipple
                    />
                  </TableCell>
                  <TableCell key= {'0C' + index}>{tp.infNl} </TableCell>
                  <TableCell key= {'1C' + index}>{tp.OVT} </TableCell>
                  <TableCell key= {'2C' + index}>{tp.PP} </TableCell>
                  <TableCell key= {'3C' + index}>{tp.infFr} </TableCell>
                </TableRow>)
            })
          }
        </TableBody>
      </Table>
    </Paper>
  )
}
// eslint-disable-next-line
var ButtonAppBar = function (props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            Tp Neerlandais
          </Typography>
          <Button color="inherit"></Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
