/*eslint-disable */
import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Alert from 'react-s-alert'
import Options from '../Components/Options'
import Tableau from '../Components/Tableau'
import theme from '../config/theme'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleIcon from '@material-ui/icons/Mood' // from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/MoodBad' // from '@material-ui/icons/Error'
import WarningIcon from '@material-ui/icons/SentimentNeutral' // from '@material-ui/icons/Warning'
/* eslint-enable */
export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      advanced: false,
      correction: {},
      affCorSnack: false,
      affCor: false,
      affRep: false
    }
    this.handleAdvanced = this.handleAdvanced.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleAffReponse = this.handleAffReponse.bind(this)
  }

  handleAdvanced () {
    var oldAvanced = this.state.advanced
    this.setState({advanced: !oldAvanced})
  }

  handleClick () {
    let tp = this.props.aleatoire ? this.props.tpRandom : this.props.tp
    let reponseMauvais = 0
    let reponseVide = 0
    let reponseBon = 0
    let reponseTotal = 0
    let colonne = this.props.colonne
    let nbCol = colonne.length
    let correct = (i) => colonne[i].value
    if (this.state.type === 'etude') {
      for (let i = 0; i < this.props.limite; i++) {
        for (let j = 0; j < nbCol; j++) { // remplacer 4 par nbCol
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
    } else if (this.state.type === 'test') {
      for (let i = 0; i < this.props.limite; i++) {
        this.props.nbAleatoireQuestion[i].forEach((numCol) => {
          if (numCol !== -1) {
            // console.log('numCol', correct(numCol))
            if (tp[i]['correct'][correct(numCol)] === false) {
              reponseMauvais++
            } else if (tp[i]['correct'][correct(numCol)] === 'neutre') {
              reponseVide++
            } else if (tp[i]['correct'][correct(numCol)] === true) {
              reponseBon++
            }
            reponseTotal++
          }
        })
      }
    }
    var ratio = reponseBon / reponseTotal
    var type = ratio >= 0.75 ? 'success' : ratio >= 0.5 ? 'warning' : 'error'
    var correction = {erreur: reponseMauvais, vide: reponseVide, correct: reponseBon, total: reponseTotal, ratio: ratio, type: type}
    this.setState({
      correction: correction,
      affCorSnack: true,
      affCor: true
    })
  }

  handleAffReponse () {
    var value = !this.state.affCor
    this.setState({
      affRep: value
    })
  }

  componentWillMount () {
    // const paramsType = this.props.link.match.params.type
    // const paramsToken = this.props.link.match.params.token
    let type = (this.props.link.location.state !== undefined) ? this.props.link.location.state.type : 'voir'
    let level = (this.props.link.location.state !== undefined) ? this.props.link.location.state.level : 1
    let col = (this.props.link.location.state !== undefined) ? this.props.link.location.state.col : [0]
    switch (type) {
      case 'voir':
        this.props.resetQuestion()
        break
      case 'etude':
        // this.props.resetQuestion()
        this.props.handleQuestion(col)
        break
      case 'test':
        this.props.resetQuestion()
        this.props.shuffleQuestion(level)
        break
      default:
        return null
    }
    this.props.resetTp()
    this.setState({type: type})
    // if (paramsType === 'All') {
    //   this.props.allList()
    //   this.setState({isPageExist: true})
    // } else if (paramsType === 'Liste') {
    //   if (paramsToken.length === 5) {
    //     console.log('OK')
    //     this.setState({isPageExist: true})
    //   } else {
    //     this.setState({isPageExist: false})
    //     console.error('Cette page n\'existe pas')
    //   }
    // } else {
    //   this.setState({isPageExist: false})
    //   console.error('cette page n\'existe pas')
    // }
  }

  render () {
    var classes = this.props.classes
    let type = (this.props.link.location.state !== undefined) ? this.props.link.location.state.type : 'etude'
    let level = (this.props.link.location.state !== undefined) ? this.props.link.location.state.level : 1
    return (
      <div className={classes.appFrame}>
        <main className={classes.content}>
          <Grid container direction='column' justify='flex-start' alignItems='center'>
            <Grid item>
              <Options
                aleatoire={this.props.aleatoire}
                handleInputChange={this.props.handleInputChange}
                handleClick={this.props.handleClick}
                handleSelect={this.props.handleSelect}
                limite={this.props.limite}
                tpLength={this.props.tp.length}
                handleSelectionTpOpen={this.props.handleSelectionTpOpen}
                handleSelectionTpClose={this.props.handleSelectionTpClose}
                selectAll={this.props.selectAll}
                selectAllChbx={this.props.selectAllChbx}
                selectionPage={this.props.selectionPage}
                afficherReponse={this.props.afficherReponse}
                handleQuestion={this.props.handleQuestion}
                colonne={this.props.colonne}
                mobileOpen={this.props.mobileOpen}
                handleDrawerToggle={this.props.handleDrawerToggle}
                handleClickQuestionnaire={this.props.handleClickQuestionnaire}
                aleatoireQuestion={this.props.aleatoireQuestion}
                nbTrou={this.props.nbTrou}
                handleChangeNbTrou={this.props.handleChangeNbTrou}
                handleSelectNombre={this.props.handleSelectNombre}
                valueSelectTp={this.props.valueSelectTp}
                afficherNbTp={this.props.afficherNbTp}
                classes={classes}
                changePage={this.props.changePage}
                user={this.props.user}
                tp={this.props.tp}
                selectList={this.props.selectList}
                setListWithToken={this.props.setListWithToken}
                listSelected={this.props.listSelected}
                type={this.state.type}
                level={level}
                bottom={false}
                lang={this.props.lang}
                handleAffReponse = {this.handleAffReponse}
                history = {this.props.history}
                handleRandom = {this.props.handleRandom}
              />
            </Grid>
            {
              !this.props.loading
                ? <Grid item>
                  <Tableau
                    handleSelect={this.props.handleSelect}
                    handleQuestion={this.props.handleQuestion}
                    tp={this.props.tp}
                    tpRandom={this.props.tpRandom}
                    tpExclu={this.props.tpExclu}
                    colonne={this.props.colonne}
                    aleatoire={this.props.aleatoire}
                    limite={this.props.limite}
                    selectionPage={this.props.selectionPage}
                    handleCheck={this.props.handleCheck}
                    handleReponse={this.props.handleReponse}
                    selectAllChbx={this.props.selectAllChbx}
                    handleSelectionTpClose={this.props.handleSelectionTpClose}
                    selectAll={this.props.selectAll}
                    aleatoireQuestion={this.props.aleatoireQuestion}
                    nbAleatoireQuestion={this.props.nbAleatoireQuestion}
                    advanced={this.state.advanced}
                    affCor={this.state.affCor}
                    affRep={this.state.affRep}
                    type={this.state.type}
                    level={level}
                    classes={classes}
                  />
                </Grid>

                : <div style={{width: `100%`}}><LinearProgress color='primary' variant='query' /></div>
            }
            <Grid item >
              <Options bottom type={type} handleAffReponse={this.handleAffReponse} handleClick={this.handleClick} colonne={this.props.colonne} classes={classes} />
            </Grid>
            <br />
          </Grid>
        </main>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={this.state.affCorSnack}
          autoHideDuration={6000}
          onClose={() => this.setState({affCorSnack: false})}
        >
          <SnackbarContent
            className={this.state.correction.ratio <= 0.75 ? this.state.correction.ratio <= 0.5 ? classes.error : classes.warning : classes.success}
            message={
              <div id='reponse'>
                {this.state.correction.ratio <= 0.75 ? this.state.correction.ratio <= 0.5 ? <ErrorIcon style={{marginRight: theme.spacing.unit}} /> : <WarningIcon style={{marginRight: theme.spacing.unit}} /> : <CheckCircleIcon style={{marginRight: theme.spacing.unit}} />}
                        Vous avez eu {(this.state.correction.ratio * 100).toFixed(2) } / 100
              </div>
            }
            onClose={() => this.setState({affCorSnack: false})}
            action={[
              <IconButton
                key='close'
                aria-label='Close'
                color='inherit'
                style={{marginRight: theme.spacing.unit}}
                onClick={() => this.setState({affCorSnack: false})}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Snackbar>
      </div>
    )
  }
}
