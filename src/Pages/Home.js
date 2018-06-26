// eslint-disable-next-line
import React, {Component} from 'react'
// eslint-disable-next-line
import {Grid} from 'material-ui'
// eslint-disable-next-line
import Alert from 'react-s-alert'
// eslint-disable-next-line
import Options from '../Components/Options'
// eslint-disable-next-line
import Tableau from '../Components/Tableau'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      advanced: false
    }
    this.handleAdvanced = this.handleAdvanced.bind(this)
  }

  handleAdvanced () {
    var oldAvanced = this.state.advanced
    this.setState({advanced: !oldAvanced})
  }

  render () {
    var classes = this.props.classes
    return (
      <div className={classes.appFrame}>
        <main className={classes.content}>
          <Grid container>
            <Grid item xs={12}>
              <div>
                <Options
                  aleatoire= {this.props.aleatoire}
                  handleInputChange = {this.props.handleInputChange}
                  handleClick = {this.props.handleClick}
                  handleSelect = {this.props.handleSelect}
                  handleAffReponse = {this.props.handleAffReponse}
                  limite = {this.props.limite}
                  tpLength = {this.props.tp.length}
                  handleSelectionTpOpen = {this.props.handleSelectionTpOpen}
                  handleSelectionTpClose = {this.props.handleSelectionTpClose}
                  selectAll = {this.props.selectAll}
                  selectAllChbx = {this.props.selectAllChbx}
                  selectionPage = {this.props.selectionPage}
                  afficherReponse = {this.props.afficherReponse}
                  handleQuestion = {this.props.handleQuestion}
                  colonne = {this.props.colonne}
                  mobileOpen = {this.props.mobileOpen}µ
                  handleDrawerToggle = {this.props.handleDrawerToggle}
                  handleClickQuestionnaire={this.props.handleClickQuestionnaire}
                  aleatoireQuestion={this.props.aleatoireQuestion}
                  nbTrou = {this.props.nbTrou}
                  handleChangeNbTrou = {this.props.handleChangeNbTrou}
                  handleSelectNombre = {this.props.handleSelectNombre}
                  afficherNbTp = {this.props.afficherNbTp}
                  classes ={classes}
                  changePage = {this.props.changePage}
                  handleAdvanced = {this.handleAdvanced}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Tableau
                handleSelect = {this.props.handleSelect}
                handleQuestion = {this.props.handleQuestion}
                tp = {this.props.tp}
                tpRandom={this.props.tpRandom}
                tpExclu = {this.props.tpExclu}
                colonne= {this.props.colonne}
                aleatoire = {this.props.aleatoire}
                limite = {this.props.limite}
                handleReponse = {this.props.handleReponse}
                afficherReponse = {this.props.afficherReponse}
                selectionPage = {this.props.selectionPage}
                handleCheck = {this.props.handleCheck}
                selectAllChbx = {this.props.selectAllChbx}
                handleSelectionTpClose = {this.props.handleSelectionTpClose}
                selectAll = {this.props.selectAll}
                aleatoireQuestion={this.props.aleatoireQuestion}
                nbAleatoireQuestion = {this.props.nbAleatoireQuestion}
                advanced = {this.state.advanced}
                classes = {classes}
              />
            </Grid>
            <br />

          </Grid>
        </main>
        <Alert stack={{limit: 3}} position='bottom-right' />
      </div>
    )
  }
}
