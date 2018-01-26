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
import { withStyles } from 'material-ui/styles'
// eslint-disable-next-line
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
// eslint-disable-next-line
import Paper from 'material-ui/Paper'
// eslint-disable-next-line
/* import List, { ListItem, ListItemText } from 'material-ui/List'
// eslint-disable-next-line
import Menu, { MenuItem } from 'material-ui/Menu' */
// eslint-disable-next-line
import Input, {InputLabel} from 'material-ui/Input'
// eslint-disable-next-line
import { FormControl, FormHelperText } from 'material-ui/Form'
// eslint-disable-next-line
import Select from 'material-ui/Select'
// eslint-disable-next-line
import Button from 'material-ui/Button'

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
      tpExclu: [], // tps à exclure de l'affichage en se basant sur la value infNL (TODO: Ajout index maybe)
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
      selectedIndex: [0, 1, 2, 3, 4]
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleQuestion = this.handleQuestion.bind(this)
    this.handleReponse = this.handleReponse.bind(this)
    this.shuffleTp = this.shuffleTp.bind(this)
    this.handleAffReponse = this.handleAffReponse.bind(this)
    this.handleClickListItem = this.handleClickListItem.bind(this)
    this.handleMenuItemsClick = this.handleMenuItemsClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleTest = this.handleTest.bind(this)
  }
  // mélange des tps pour l'aléatoire
  shuffleTp (tp) {
    const tpRandomized = Shuffle(tp, {copy: true})
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
      this.shuffleTp(this.state.tp)
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
  handleClickListItem (event) {
    this.setState({ anchorEl: event.currentTarget })
  }
  handleMenuItemsClick (event, index) {
    console.log(event.target.id)
    const selectedIndex = this.state.selectedIndex
    selectedIndex[event.target.id] = index
    this.setState({ selectedIndex: selectedIndex, anchorEl: null })
  }
  handleClose () {
    this.setState({ anchorEl: null })
  }
  handleTest (event) {
    console.log(this.state.colonne[event.target.value].label)
    this.setState({test: event.target.value})
  }
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
        <div>
          <label htmlFor='aleatoire'>Aleatoire: </label> <input id='aleatoire' tag='aleatoire' name='aleatoire' type='checkbox' checked={this.state.aleatoire} onChange={this.handleInputChange} ></input>
          <Button raised color="primary" className={styles.button} onClick={this.handleClick} id='shuffle' disabled = {!this.state.aleatoire} > Recharger </Button>
          <input id='limite' tag='limite' className="search-input" type="number" onChange={this.handleInputChange} name="limite" placeholder="Limite" value={this.state.limite} max= {this.state.tp.length} min ={0} />
          {/* <span> Total: {this.state.correction.total} | Vide: {this.state.correction.vide} | Bon: {this.state.correction.correct} | Mauvais: {this.state.correction.erreur}</span> */}
          <div>

            {
              [0, 1, 2, 3].map((nb) => (
                <Paper style={{width: '11em', float: 'left', margin: '1em'}}>
                  <FormControl className={styles.formControl}>
                    <InputLabel htmlFor={'select' + nb}>Colonne {nb + 1}</InputLabel>
                    <Select
                      native
                      onChange={(event) => this.handleSelect(event)}
                      inputProps={{
                        id: nb
                      }}
                    >
                      {[0, 1, 2, 3].map(nbCol => (
                        <option value={nbCol}>{options[nbCol].label}</option>
                      ))
                      }
                    </Select>
                  </FormControl>
                </Paper>
              ))}
            <div style={{width: '11em', float: 'left', margin: '1em'}}>
              <Button raised color="primary" className={styles.button} id='correction' onClick={this.handleClick}>Correction</Button>
              <label htmlFor='affReponse'>Afficher Réponse : </label> <input id='affReponse' name ='affReponse' type='checkbox' checked={this.state.afficherReponse} onChange={ this.handleAffReponse}></input>
            </div>
          </div>
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
          />
        </div>
        <Alert stack={{limit: 3}} />
      </div>

    )
  }
}

// tableau qui renvoie les tps dans l'ordre ou pas en fonction de la valeur de l'aléatoire
// eslint-disable-next-line
var Tableau = function (props) {
  var tp
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
      />
    </div>
  )
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
                nombre.map((nb, i) =>
                  <TableCell key= {'th' + i} style={{'display': colonne[nb].afficher ? 'table-cell' : 'none'}}>{colonne[nb].label}</TableCell>
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
                if (props.tpExclu.indexOf(listValue.infNl) === -1 && index < limite) {
                  return (
                    <Row key = {'row' + index}
                      index = {index}
                      listValue = {listValue}
                      colonne = {props.colonne}
                      handleReponse = {props.handleReponse}
                      affReponse = {props.affReponse}
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
        nombre.map((nb, i) =>
          <Cell
            key={'cell' + colonne[nb].value + i}
            index = {index} value = {listValue}
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
      <TableCell key = {index + 'cell'} className= {correct === true ? 'success' : correct === false ? 'danger' : ''} style = {{'display': colonne.afficher ? 'cell-table' : 'none'}}> <input key={index} id={index} tag='question' className="search-input" type="text" placeholder={'Réponse'} onBlur = {(e) => verification(e)} /> <span style={{display: affReponse ? 'inline' : 'none'}}>{value}</span> </TableCell>
    )
  } else {
    return (
      <TableCell key = {index} style = {{'display': colonne.afficher ? 'cell-table' : 'none'}}> {value} </TableCell>
    )
  }
}

