// eslint-disable-next-line
import React, {Component} from 'react'
import './App.css'
// eslint-disable-next-line
import ReactLoading from 'react-loading'
import $ from 'minified'
import Tp from './tp.json'
import Shuffle from 'shuffle-array'
// eslint-disable-next-line
import Select from 'react-select'
import 'react-select/dist/react-select.css'
// eslint-disable-next-line
import {Table} from 'reactstrap'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true, // chargment en cours
      tp: Tp, // liste des tps dans l'ordre
      numTpExclu: [], // numero des tps à exclure de l'affichage
      colonne: [
        {value: 'infNl', label: 'Infinitif Nl'},
        {value: 'OVT', label: 'OVT'},
        {value: 'PP', label: 'Participe Passé'},
        {value: 'infFr', label: 'Infinitif FR'}
      ], // ordre des colonnes
      question: [false, false, false, false],
      affichacheColonne: ['table-cell', 'table-cell', 'table-cell', 'table-cell'], // affichage des colonnes oui: inline | non: none
      aleatoire: true, // ordre aleatoire ou non
      limite: 20 // limite d'affichage des tps
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleQuestion = this.handleQuestion.bind(this)
    this.handleReponse = this.handleReponse.bind(this)
    this.shuffleTp = this.shuffleTp.bind(this)
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
      return isNaN(parseInt(e)) ? 20 : parseInt(e)
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
    // state d'affichage des colonnes avant
    const previousAffCol = this.state.affichacheColonne
    // numéro de la colonne
    const colonne = e.colonne
    // function qui sert à attribuer une nouvelle valeur à une colonne en gardant les autres pour la visibilité
    function setValue (colonne, value, previousColonne) {
      previousColonne[colonne] = value
      return previousColonne
    }
    // function qui attribue l'objet retourné par le Select 
    function setCol (colonne, e, previousColonne) {
      previousColonne[colonne] = e
      return previousColonne
    }
    // si la valeur est égal à vide on set juste la visibilité à none
    if (e.value === 'vide') {
      const value = setValue(colonne, 'none', previousAffCol)
      this.setState({
        affichacheColonne: value
      })
      const value1 = setCol(colonne, e, previousColonne)
      this.setState({
        colonne: value1
      })
    } else { // sinon on set la visibilité à inline et on change la value de la colonne
      const valueAff = setValue(colonne, 'table-cell', previousAffCol)
      this.setState({
        affichacheColonne: valueAff
      })
      const value = setCol(colonne, e, previousColonne)
      this.setState({
        colonne: value
      })
    }
  // si on clic sur random, ça random
  }
  handleClick () {
    this.shuffleTp(this.state.tp)
  }
  handleQuestion (e) {
    // function qui sert à attribuer une nouvelle valeur à une colonne en gardant les autres pour la visibilité
    function setValue (colonne, value, previousColonne) {
      previousColonne[colonne] = value
      return previousColonne
    }
    const question = this.state.question
    const target = e.target
    const colonne = target.id
    const value = setValue(colonne, target.checked, question)
    const name = 'question'
    this.setState({
      [name]: value
    })
  }
  handleReponse (e) {
    console.log(e.target.value)
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
        <div>
          <button onClick={this.handleClick} > Recharger </button>
          <input id='limite' tag='limite' className="search-input" type="number" onChange={this.handleInputChange} name="limite" placeholder="Limite" value={this.state.limite} max= {this.state.tp.length} min ={0} />
          <label htmlFor='aleatoire'>Aleatoire: </label> <input id='aleatoire' tag='aleatoire' name='aleatoire' type='checkbox' checked={this.state.aleatoire} onChange={this.handleInputChange} ></input>
          <div>
            <div style={{width: '11em', float: 'left', margin: '1em'}}>
              <label htmlFor='col0'>Colonne 1: </label>
              <Select
                id='col0'
                ref='col0'
                name='col0'
                clearable = {false}
                value={this.state.colonne[0]}
                onChange = {this.handleSelect}
                options={[
                  {value: 'infNl', label: 'Infinitif NL', colonne: '0'},
                  {value: 'OVT', label: 'OVT', colonne: '0'},
                  {value: 'PP', label: 'Participe Passé', colonne: '0'},
                  {value: 'infFr', label: 'Infinitif FR', colonne: '0'},
                  {value: 'vide', label: 'Rien', colonne: '0'}
                ]}
                autosize = {true}
                searchable={false}
                placeholder = 'Selectionner la colonne 1'
              />
              <label htmlFor='0'>Question: </label> <input id='0' tag='0question' name='0question' type='checkbox' checked={this.state.question[0]} onChange={ this.handleQuestion } ></input>
            </div>
            <div style={{width: '11em', float: 'left', margin: '1em'}}>
              <label htmlFor='col1'>Colonne 2: </label>
              <Select
                name='col1'
                clearable = {false}
                value={this.state.colonne[1]}
                onChange = {this.handleSelect}
                options={[
                  {value: 'infNl', label: 'Infinitif NL', colonne: '1'},
                  {value: 'OVT', label: 'OVT', colonne: '1'},
                  {value: 'PP', label: 'Participe Passé', colonne: '1'},
                  {value: 'infFr', label: 'Infinitif FR', colonne: '1'},
                  {value: 'vide', label: 'Rien', colonne: '1'}
                ]}
              />
              <label htmlFor='1'>Question: </label> <input id='1' tag='1question' name='1question' type='checkbox' checked={this.state.question[1]} onChange={ this.handleQuestion } ></input>
            </div>
            <div style={{width: '11em', float: 'left', margin: '1em'}}>
              <label htmlFor='col2'>Colonne 3: </label>
              <Select
                name='col2'
                clearable = {false}
                value={this.state.colonne[2]}
                onChange = {this.handleSelect}
                options={[
                  {value: 'infNl', label: 'Infinitif Nl', colonne: '2'},
                  {value: 'OVT', label: 'OVT', colonne: '2'},
                  {value: 'PP', label: 'Participe Passé', colonne: '2'},
                  {value: 'infFr', label: 'Infinitif FR', colonne: '2'},
                  {value: 'vide', label: 'Rien', colonne: '2'}
                ]}
              />
              <label htmlFor='2'>Question: </label> <input id='2' tag='2question' name='2question' type='checkbox' checked={this.state.question[2]} onChange={ this.handleQuestion } ></input>
            </div>
            <div style={{width: '11em', float: 'left', margin: '1em'}}>
              <label htmlFor='col3'>Colonne 4: </label>
              <Select
                name='col3'
                clearable = {false}
                value={this.state.colonne[3]}
                onChange = {this.handleSelect}
                options={[
                  {value: 'infNl', label: 'Infinitif Nl', colonne: '3'},
                  {value: 'OVT', label: 'OVT', colonne: '3'},
                  {value: 'PP', label: 'Participe Passé', colonne: '3'},
                  {value: 'infFr', label: 'Infinitif FR', colonne: '3'},
                  {value: 'vide', label: 'Rien', colonne: '3'}
                ]}
              />
              <label htmlFor='3'>Question: </label> <input id='3' tag='3question' name='3question' type='checkbox' checked={this.state.question[3]} onChange={ this.handleQuestion } ></input>
            </div>
          </div>
        </div>
        <div style={{clear: 'left'}}>
          <Tableau
            tp = {this.state.tp}
            tpRandom={this.state.tpRandom}
            numTpExclu = {this.state.numTpExclu}
            colonne= {this.state.colonne}
            aleatoire = {this.state.aleatoire}
            limite = {this.state.limite}
            affColonne = {this.state.affichacheColonne}
            question = {this.state.question}
            handleReponse = {this.handleReponse}
          />
        </div>
      </div>

    )
  }
}

// tableau qui renvoie les tps dans l'ordre ou pas en fonction de la valeur de l'aléatoire
// eslint-disable-next-line
var Tableau = function (props) {
  if (!props.aleatoire) {
    return (
      <div>
        <RenduOrdre
          tp = {props.tp}
          numTpExclu = {props.numTpExclu}
          colonne = {props.colonne}
          limite = {props.limite}
          affColonne = {props.affColonne}
          question = {props.question}
          handleReponse = {props.handleReponse}
        />
      </div>
    )
  }
  if (props.aleatoire) {
    return (
      <div>
        <RenduAleatoire
          tpRandom = {props.tpRandom}
          numTpExclu = {props.numTpExclu}
          colonne = {props.colonne}
          limite = {props.limite}
          affColonne = {props.affColonne}
          question = {props.question}
          handleReponse = {props.handleReponse}
        />
      </div>
    )
  }
  return 'ERROR'
}

// affiche les tps dans un ordre aléatoire et dans l'ordre des colonnes choisi et avec la limite
// eslint-disable-next-line
var RenduAleatoire = function (props) {
  var col0 = props.colonne[0]
  var col1 = props.colonne[1]
  var col2 = props.colonne[2]
  var col3 = props.colonne[3]
  var tpRandom = props.tpRandom
  var limite = props.limite
  var affColonne = props.affColonne
  return (
    <div>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th style={{'display': affColonne[0]}}>{col0.label}</th>
            <th style={{display: affColonne[1]}}>{col1.label}</th>
            <th style={{display: affColonne[2]}}>{col2.label}</th>
            <th style={{display: affColonne[3]}}>{col3.label}</th>
          </tr>
        </thead>
        <tbody>
          {

            tpRandom.map(function (listValue, index) {
              if (index >= limite) {
                return
              }
              if (props.numTpExclu.indexOf(index) === -1) {
                return (
                  <Row
                    index = {index}
                    listValue = {listValue}
                    affColonne = {affColonne}
                    colonne = {props.colonne}
                    question = {props.question}
                    handleReponse = {props.handleReponse}
                  />

                )
              }
            })
          }
        </tbody>
      </Table>

    </div>
  )
}

// affiche les tps dans l'ordre des colonnes demandé et avec la limite
// eslint-disable-next-line
var RenduOrdre = function (props) {
  var col0 = props.colonne[0]
  var col1 = props.colonne[1]
  var col2 = props.colonne[2]
  var col3 = props.colonne[3]
  var limite = props.limite
  return (
    <div>
      <ul>
        {
          props.tp.map(function (listValue, index) {
            if (index >= limite) {
              return
            }
            if (props.numTpExclu.indexOf(index) === -1) {
              return (
                <div>
                  <li key = {index} >{ listValue[col0] + `.......` + listValue[col1] + `.......` + listValue[col2] + `.......` + listValue[col3] + `.....` + index}</li>
                </div>
              )
            }
          })}

      </ul>
    </div>
  )
}

// eslint-disable-next-line
var Row = function (props) {
  var index = props.index
  var affColonne = props.affColonne
  var listValue = props.listValue
  var col0 = props.colonne[0]
  var col1 = props.colonne[1]
  var col2 = props.colonne[2]
  var col3 = props.colonne[3]
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <Cell affColonne = {affColonne} index = {index} value = {listValue[col0.value]} numero = {0} question = {props.question} handleReponse = {props.handleReponse} />
      <Cell affColonne = {affColonne} index = {index} value = {listValue[col1.value]} numero = {1} question = {props.question} handleReponse = {props.handleReponse} />
      <Cell affColonne = {affColonne} index = {index} value = {listValue[col2.value]} numero = {2} question = {props.question} handleReponse = {props.handleReponse} />
      <Cell affColonne = {affColonne} index = {index} value = {listValue[col3.value]} numero = {3} question = {props.question} handleReponse = {props.handleReponse} />
    </tr>

  )
}
// eslint-disable-next-line
var Cell = function (props) {
  var verification = function (bonjour) {
  }
  var index = props.index
  var value = props.value
  var question = props.question
  var affColonne = props.affColonne
  var numero = props.numero
  var handleReponse = props.handleReponse
  if (question[numero] === true) {
    return (
      <td key = {index} style = {{'display': affColonne[numero]}}> <input id='question' tag='question' className="search-input" type="textarea" placeholder={value} onBlur = {verification()} /> </td>
    )
  } else {
    return (
      <td key = {index} style = {{'display': affColonne[numero]}}> {value} </td>
    )
  }
}
