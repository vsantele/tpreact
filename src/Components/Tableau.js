// eslint-disable-next-line
import React, {Component} from 'react'
// eslint-disable-next-line
import Rendu from './Rendu'
// eslint-disable-next-line
// import RenduAdvanced from './RenduAdvanced'
// eslint-disable-next-line
// import SelectionTp from './SelectionTp'
import loadable from 'loadable-components'

const RenduAdvanced = loadable( () => import('./RenduAdvanced'))

export default class Tableau extends Component {
  render () {
    var tp
    const classes = this.props.classes
      if (!this.props.aleatoire) {
        tp = this.props.tp
      } else {
        tp = this.props.tpRandom
      }
      return (
        <div>
          {
            this.props.advanced
              ? <RenduAdvanced
                  handleSelect = {this.props.handleSelect}
                  handleQuestion = {this.props.handleQuestion}
                  tp = {tp}
                  tpExclu = {this.props.tpExclu}
                  colonne = {this.props.colonne}
                  limite = {this.props.limite}
                  handleReponse = {this.props.handleReponse}
                  afficherReponse = {this.props.afficherReponse}
                  selectionPage = {this.props.selectionPage}
                  handleCheck = {this.props.handleCheck}
                  aleatoireQuestion= {this.props.aleatoireQuestion}
                  nbAleatoireQuestion = {this.props.nbAleatoireQuestion}
                  classes = {classes}
              />
              : <Rendu
                handleSelect = {this.props.handleSelect}
                handleQuestion = {this.props.handleQuestion}
                tp = {tp}
                tpExclu = {this.props.tpExclu}
                colonne = {this.props.colonne}
                limite = {this.props.limite}
                handleReponse = {this.props.handleReponse}
                selectionPage = {this.props.selectionPage}
                handleCheck = {this.props.handleCheck}
                aleatoireQuestion= {this.props.aleatoireQuestion}
                nbAleatoireQuestion = {this.props.nbAleatoireQuestion}
                type ={this.props.type}
                affCor = {this.props.affCor}
                affRep={this.props.affRep}
                classes = {classes}
              />
          }
        </div>
      )
    }
}
