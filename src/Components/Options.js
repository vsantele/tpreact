/*eslint-disable */
import React, {Component} from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import FormHelperText from '@material-ui/core/FormHelperText'
import {db} from '../firebase/firebase'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import CircularProgress from '@material-ui/core/CircularProgress'
import SaveIcon from '@material-ui/icons/Save'
import Progress from '@material-ui/core/LinearProgress'
import classNames from 'classnames'
import Send from '@material-ui/icons/Send'
/*eslint-enable */

export default withMobileDialog()(class Options extends Component {
  constructor () {
    super()
    this.state = {
      openAlert: false,
      saveAlert: false,
      private: true,
      openList: false,
      openSnackbar: false,
      listName: [],
      addAlert: false,
      toSave: false,
      token: '',
      tokenAdd: '',
      nameAdd: '',
      name: '',
      loadingAdd: false,
      loadingGetList: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.openSaveAlert = this.openSaveAlert.bind(this)
    this.closeSaveAlert = this.closeSaveAlert.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.privateSwitch = this.privateSwitch.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.openList = this.openList.bind(this)
    this.deleteList = this.deleteList.bind(this)
    this.addList = this.addList.bind(this)
    this.setToken = this.setToken.bind(this)
    this.closeAddAlert = this.closeAddAlert.bind(this)
    this.tokenSwitch = this.tokenSwitch.bind(this)
  }

  handleOpen () {
    this.setState({openAlert: true})
  }

  handleClose () {
    this.setState({openAlert: false})
  }

  openSaveAlert () {
    this.setToken(5)
    this.setState({saveAlert: true, timestamp: Date.now()})
  }

  closeSaveAlert () {
    this.setState({saveAlert: false})
  }

  handleChange (event) {
    var name = event.target.id
    this.setState({
      [name]: event.target.value
    })
  }

  privateSwitch () {
    const privateState = this.state.private
    this.setToken(5)
    this.setState({
      private: !privateState
    })
  }

  setToken (nbcar) {
    var ListeCar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    var Chaine = ''
    for (let i = 0; i < nbcar; i++) {
      Chaine = Chaine + ListeCar[Math.floor(Math.random() * ListeCar.length)]
    }
    console.log(Chaine)
    this.setState({token: Chaine})
  }

  handleSave () {
    const tps = this.props.tp
    function getTps () {
      let listTps = []
      tps.forEach(tp => {
        if (tp.afficher) {
          listTps.push(tp.id)
        }
      })
      return listTps
    }
    if (this.props.user) {
      const doc = db
        .collection('users')
        .doc(this.props.user.uid)
        .collection('lists')
        .doc()
      doc
        .set({name: this.state.name, id: doc.id, private: this.state.private, tps: getTps(), token: this.state.token, timestamp: this.state.timestamp})
        .then(this.setState({saveAlert: false, name: '', openSnackbar: true, msgSnackbar: 'Liste enregistrée avec succès'}))
        .catch(error => {
          this.setState({openSnackbar: true, msgSnackbar: `Erreur: ${error}`})
          console.error('Erreur enregistrement liste: ', error)
        })
    }
  }

  getList () {
    db
      .collection('users')
      .doc(this.props.user.uid)
      .collection('lists')
      .get()
      .then(collection => {
        const listName = collection.docs.map(doc => { return {name: doc.data().name, id: doc.data().id, tps: doc.data().tps, token: doc.data().token, private: doc.data().private} })
        this.setState({listName: listName, loadingGetList: false})
      })
      .catch((error) => {
        console.error('erreur getList', error)
      })
  }
  openList () {
    if (this.props.user) {
      if (!this.state.openList) {
        this.getList()
        this.setState({openList: true, loadingGetList: true})
      } else {
        this.setState({openList: false, loadingGetList: false})
      }
    }
  }

  deleteList (id) {
    db
      .collection('users')
      .doc(this.props.user.uid)
      .collection('lists')
      .doc(id)
      .delete()
      .then(this.setState({openSnackbar: true, msgSnackbar: 'Liste supprimé avec succès'}))
      .catch(error => {
        console.error('erreur suppression liste: ', error)
        this.setState({openSnackbar: true, msgSnackbar: `Erreur: ${error}`})
      })
      .then(this.getList())
  }

  addList () {
    const token = this.state.tokenAdd
    const save = this.state.toSave
    let msgSnackbar = ''
    // eslint-disable-next-line
    let header = new Headers()
    header.append('Content-Type', 'application/json')
    const url = 'https://europe-west1-tpneerandais.cloudfunctions.net/addListWithCode?token=' + token
    let init = {
      method: 'POST',
      headers: header,
      mode: 'no-cors'
    }
    if (token.length !== 5) {
      console.error('Erreur, taille token incorrect')
      msgSnackbar = 'Erreur, taille token incorrect'
      this.setState({msgSnackbar: msgSnackbar, openSnackbar: true, addAlert: true, loadingAdd: false})
    } else {
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
          this.props.setListWithToken(result.tps)
          msgSnackbar = 'List importé avec succès'
          if (save) {
            const doc = db
              .collection('users').doc(this.props.user.uid).collection('lists')
              .doc()
            doc
              .set({id: doc.id, name: this.state.nameAdd, tps: list.tps, token: token, private: false})
              .then(() => {
                msgSnackbar += ' et enregistré avec succès !'
                this.getList()
              })
              .catch(e => {
                console.error('Erreur save: ', e)
                throw new Error('Erreur save, ' + e)
              })
          }
          this.setState({nameAdd: '', tokenAdd: '', msgSnackbar: msgSnackbar, openSnackbar: true, toSave: false, addAlert: false, loadingAdd: false})
          return list
        } catch (e) {
          msgSnackbar = e.message
          console.error('Erreur request: ', e.message)
          this.setState({msgSnackbar: msgSnackbar, openSnackbar: true, addAlert: true, loadingAdd: false})
          return e
        }
      }
      req.send()
    }
  }

  closeAddAlert () {
    this.setState({addAlert: false})
  }

  tokenSwitch () {
    this.setState({toSave: !this.state.toSave})
  }

  render () {
    const classes = this.props.classes
    const buttonClassname = classNames({
      [classes.buttonSuccess]: this.props.aleatoire,
      [classes.button]: true
    })
    const buttonReponse = classNames({
      [classes.buttonSuccess]: this.props.afficherReponse,
      [classes.buttonFailed]: !this.props.afficherReponse,
      [classes.button]: true
    })

    if (this.props.selectionPage) {
      return (
        <div className={classes.gridRoot}>
          <Grid container spacing={8}>
            <Grid item>
              <div className={classes.grid}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='selectAll' shrink>Tout les TP</InputLabel>
                  <Switch onClick={this.props.selectAll} id='selectAll' classes= {{checked: classes.checked, bar: classes.bar}} checked = {Boolean(this.props.selectAllChbx)}></Switch>
                </FormControl>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.grid}>
                <Button variant="raised" color="secondary" className={classes.button} onClick={this.props.handleSelectionTpClose} id="selectionTpClose"> Valider!</Button>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.grid}>
                <Button variant="raised" color='secondary' className={classes.button} onClick={this.openSaveAlert} id='saveList' disabled={!this.props.user}>Sauvegarder Liste</Button>
                <Typography variant='caption' style={{display: !this.props.user ? 'flex' : 'none'}}>Connection requise </Typography>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.grid}>
                <Button variant="raised" color="secondary" className={classes.button} onClick={this.openList} id='openlist' disabled={!this.props.user}>{this.state.openList ? 'Cacher listes' : 'Afficher listes'}</Button>
                <Typography variant='caption' style={{display: !this.props.user ? 'flex' : 'none'}}>Connection requise </Typography>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.grid}>
                <Button variant='raised' color="secondary" className={classes.button} onClick={() => this.setState({addAlert: true})} id='addAlert' >Ajouter liste</Button>
              </div>
            </Grid>
          </Grid>
          {
            this.state.openList
              ? (
                this.state.listName !== []
                  ? <div><ShowList listName = {this.state.listName} loading={this.state.loadingGetList} selectList={this.props.selectList} classes = {classes} deleteList = {this.deleteList}/></div>
                  : <div>Vous n'avez pas encore enregister de listes pour le moment </div>
              )
              : null
          }
          <SaveAlert name={this.state.name} isPrivate={this.state.private} token={this.state.token} open = {this.state.saveAlert} handleSave={this.handleSave} handleChange={this.handleChange} closeSaveAlert = {this.closeSaveAlert} fullscreen = {this.props.fullScreen} private={this.state.private} privateSwitch={this.privateSwitch} classes = {classes} />
          <AddAlert open={this.state.addAlert} loading={this.state.loadingAdd} handleChange={this.handleChange} addList={this.addList} tokenSwitch={this.tokenSwitch} user = {this.props.user} closeAddAlert={this.closeAddAlert} classes = {classes} toSave={this.state.toSave} fullscreen={this.props.fullScreen}/>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={this.state.openSnackbar}
            autoHideDuration={6000}
            onClose={() => this.setState({openSnackbar: false})}
            ContentProps={{
              'aria-describedby': 'Liste enregistré'
            }}
            message={<span id={this.state.msgSnackbar}>{this.state.msgSnackbar} </span>}
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
      )
    } else {
      return (
        <div className={classes.gridRoot}>
          <Grid container spacing={8}>
            <Grid item >
              <div className={classes.grid}>
                {/* <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='aleatoire' shrink>Aleatoire</InputLabel>
                  <Switch inputProps={{ id: 'aleatoire', tag: 'aleatoire', name: 'aleatoire', type: 'checkbox' }} classes= {{checked: classes.checked, bar: classes.bar}} checked={Boolean(this.props.aleatoire)} onChange={this.props.handleInputChange} />
                </FormControl> */}
                <Button id="aleatoire" name='aleatoire' color='secondary' className={buttonClassname} onClick={this.props.handleInputChange}>Aléatoire</Button>
              </div>
            </Grid>
            <Grid item >
              <div className={classes.grid}>
                <Button variant="raised" color='secondary' className={classes.button} onClick={this.props.handleClick} id='shuffle' disabled = {(!this.props.aleatoire && !this.props.aleatoireQuestion)} > Recharger </Button>
              </div>
            </Grid>
            <Grid item style={{display: this.props.listSelected ? 'flex' : 'flex'}} >
              <div className={classes.grid}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='selectNombre' shrink>Nombres</InputLabel>
                  <Select
                    native
                    onChange={this.props.handleSelectNombre}
                    inputProps={{ id: 'selectNombre' }} defaultValue={20} value = {this.props.valueSelectTp}
                    style = {{width: 75}}
                  >
                    <option key={'nb20'} value={20}>{20}</option>
                    <option key={'nb40'} value={40}>{40}</option>
                    <option key={'n60'} value={60}>{60}</option>
                    <option key={'nbTout'} value={'tout'}>{'Tout'}</option>
                    <option key={'nbAutre'} value={'libre'}>{'Libre'}</option>
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item style={{display: this.props.listSelected ? 'flex' : 'flex'}}>
              <div className={classes.grid} style={{display: this.props.afficherNbTp ? 'flex' : 'none'}}>
                <FormControl className={classes.formControl}>
                  <TextField
                    error = {this.props.limite < 0}
                    id="limite"
                    label="limite"
                    name="limite"
                    value={this.props.limite}
                    onChange={this.props.handleInputChange}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="dense"
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item style={{display: this.props.listSelected ? 'none' : 'none'}}>
              <Typography variant='button' style={{marginTop: '2em'}}>Liste sélectionnée</Typography>
            </Grid>
            <Grid item >
              <div className={classes.grid}>
                <Button variant="raised" color='secondary' className={classes.button} onClick={this.props.handleSelectionTpOpen}>Selection Tp</Button>
              </div>
            </Grid>
            <Grid item >
              <div className={classes.grid}>
                <Button variant="raised" color="secondary" className={classes.button} style={{ display: !this.props.aleatoireQuestion ? 'inline' : 'none' }} id='questionnaireOpen' onClick={this.props.handleClickQuestionnaire}>Questionnaire</Button>
                <Button variant="raised" color="secondary" className={classes.button} style={{ display: this.props.aleatoireQuestion ? 'inline' : 'none' }} id='questionnaireClose' onClick={this.props.handleClickQuestionnaire}>Tableau</Button>
              </div>
            </Grid>
            <Grid item >
              <div className={classes.grid} style={{display: this.props.aleatoireQuestion ? 'flex' : 'none'}}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='selectTrou' shrink>Niveau</InputLabel>
                  <Select
                    native
                    onChange={this.props.handleChangeNbTrou}
                    inputProps={{ id: 'selectTrou' }} defaultValue={1}
                    style = {{width: 55}}
                  >
                    <option key={'trou1'} value={1}>{1}</option>
                    <option key={'trou2'} value={2}>{2}</option>
                    <option key={'trou3'} value={3}>{3}</option>
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item >
              <div className={classes.grid}>
                <Button variant="raised" color="secondary" className={classes.button} id='correction' onClick={this.props.handleClick}>Correction</Button>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.grid}>
                {/* <FormControl>
                  <InputLabel htmlFor='affReponse' shrink>Réponse</InputLabel>
                  <Switch inputProps={{ id: 'affReponse', name: 'affReponse', type: 'checkbox' }} classes={{checked: classes.checked, bar: classes.bar}}checked={this.props.afficherReponse} onChange={ this.props.handleAffReponse} />
                </FormControl> */}
                <Button color='secondary' onClick={this.props.handleAffReponse} className={buttonReponse} >Réponse</Button>
              </div>
            </Grid>
            <Grid item >
              <div className={classes.grid}>
                <Link to='/Mobile' className={classes.link} onClick={() => this.props.changePage('/Mobile')}><Button variant="raised" color="secondary" className={classes.button}> Vers Mobile</Button></Link>
              </div>
            </Grid>
            <Grid item >
              <div className={classes.grid}>
                <Button variant='raised' color='secondary' className={classes.button} id='advanced' onClick={this.handleOpen} >Plus</Button>
              </div>
            </Grid>
          </Grid>
          <Alert open = {this.state.openAlert} handleClose = {this.handleClose} handleAdvanced = {this.props.handleAdvanced} classes = {classes}/>
        </div>
      )
    }
  }
})

// eslint-disable-next-line
function Alert (props) {
  const classes = props.classes
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      scroll='body'
    >
      <DialogTitle id="alert-dialog-title">{'Options Supplémentaire'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
              Ajout d'options supplémentaires
        </DialogContentText>
        <div className={classes.gridRoot}>
          <Grid container spacing={8} >
            <Grid item >
              <div className={classes.grid}>
                <Button variant='raised' color='secondary' className={classes.button} id='advanced' onClick={props.handleAdvanced}>Advanced</Button>
              </div>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary" autoFocus>
              Fermer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// eslint-disable-next-line
function SaveAlert (props) {
  const classes = props.classes
  return (
    <Dialog
      fullScreen = {props.fullscreen}
      open={props.open}
      onClose={props.closeSaveAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      scroll='body'
    >
      <DialogTitle id="alert-dialog-title">{'Sauvegarde Liste'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Sauvegarde de la liste de temps primitifs pour les retrouver après.
        </DialogContentText>
        <div className={classes.gridRoot}>
          <Grid container spacing={8} >
            <Grid item>
              <div className={classes.grid}>
                <FormControl>
                  <TextField
                    id="name"
                    label="Titre"
                    onChange={props.handleChange}
                    margin="normal"
                  />
                  <FormHelperText >Nom de la liste de Temps primitifs</FormHelperText>
                </FormControl>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.grid}>
                <FormControl>
                  <InputLabel htmlFor='privateSwitch' shrink>Privé</InputLabel>
                  <Switch onClick={props.privateSwitch} id='privateSwitch' classes={{checked: classes.checked, bar: classes.bar}} checked = {props.private} />
                </FormControl>
                <Typography variant="body1" style={{display: props.isPrivate ? 'none' : 'inline'}}>token: {props.token}</Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color='secondary' className={classes.button} id='advanced' onClick={props.handleSave}><SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} /> Sauvegarder </Button>
        <Button onClick={props.closeSaveAlert} color="primary" autoFocus>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  )
}
// eslint-disable-next-line
function AddAlert (props) {
  const classes = props.classes
  return (
    <Dialog
      fullScreen= {props.fullscreen}
      open={props.open}
      onClose={props.closeAddAlert}
      scroll='body'
    >
      <DialogTitle>Ajout liste avec code</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ajoute une liste correspondant à un code de 5 caractères et l'enregistre si besoin
        </DialogContentText>
        <div className={classes.gridRoot}>
          <Grid container spacing={32} alignItems='baseline' justify='flex-start'>
            <Grid item>
              <FormControl style={{width: '5em'}}>
                <TextField
                  id="tokenAdd"
                  label="Token"
                  onChange={(e) => props.handleChange(e)}
                  margin='normal'
                  autoFocus={props.open}
                />
                <FormHelperText>Code de 5 caractères d'une liste</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor='tokenSaveSwitch' shrink>Enregistrer</InputLabel>
                <Switch onClick={props.tokenSwitch} id='tokenSaveSwitch' classes={{checked: classes.checked, bar: classes.bar}} checked={props.toSave} disabled={!props.user} />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <TextField id='nameAdd' label='Nom liste' onChange={props.handleChange} disabled={!(props.toSave && props.user)}></TextField>
                <FormHelperText style={{display: !props.user ? 'flex' : 'none'}}>Connection requise</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

        </div>
      </DialogContent>
      <DialogActions>
        <div style={{position: 'relative'}}>
          <Button onClick={props.addList} color='secondary'>Submit <Send className={classes.rightIcon}/></Button>
          {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
        <Button onClick={props.closeAddAlert} color="primary" autoFocus>
              Fermer
        </Button>
      </DialogActions>
    </Dialog>
  )
}
// eslint-disable-next-line
function ShowList (props) {
  return (
    <div >
      <Divider />
      {
        props.loading
          ? <Progress />
          : <Grid container spacing={16} style={{margin: '0.5em'}}>
            {props.listName.length !== 0
              ? (props.listName.map(list => (
                <Grid item key={list.id}>
                  <Paper>
                    <Button color='secondary' className={props.classes.button} onClick={() => props.selectList(list.id)}>
                      {list.name}
                    </Button>
                    <IconButton onClick= {() => props.deleteList(list.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <Typography variant="caption" style={{margin: '0.2em', textAlign: 'center'}} >{list.private ? 'privée' : 'public: ' + list.token}</Typography>
                  </Paper>
                </Grid>
              )))
              : <Typography variant="body1">Vous n'avez pas encore de listes enregistrées. Pour en ajouter une, sélectionnez les temps primitifs que vous voulez et appuyez sur "Sauvegarder liste" ou ajoutez en une avec un token</Typography>}
          </Grid>
      }

    </div>
  )
}
