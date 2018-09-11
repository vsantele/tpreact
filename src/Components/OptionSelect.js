/*eslint-disable */
import React, {Component} from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
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
import SaveIcon from '@material-ui/icons/Save'
import Progress from '@material-ui/core/LinearProgress'
import classNames from 'classnames'
import AddAlert from '../Components/AddAlert'
/* eslint-enable */

export default withMobileDialog()(class Options extends Component {
  constructor () {
    super()
    this.state = {
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
      loadingGetList: false,
      errorNom: false
    }
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
      if (this.state.name.length === 0) {
        console.error('Nom de la liste Vide')
        this.setState({openSnackbar: true, msgSnackbar: 'Nom de la liste Vide', errorNom: true})
      } else {
        const doc = db
          .collection('users')
          .doc(this.props.user.uid)
          .collection('lists')
          .doc()
        doc
          .set({name: this.state.name, id: doc.id, private: this.state.private, tps: getTps(), token: this.state.token, timestamp: this.state.timestamp, lang: this.props.lang})
          .then(this.setState({saveAlert: false, name: '', openSnackbar: true, msgSnackbar: 'Liste enregistrée avec succès', errorNom: false}))
          .catch(error => {
            this.setState({openSnackbar: true, msgSnackbar: `Erreur: ${error}`})
            console.error('Erreur enregistrement liste: ', error)
          })
      }
    }
  }

  getList () {
    db
      .collection('users')
      .doc(this.props.user.uid)
      .collection('lists')
      .get()
      .then(collection => {
        const listName = collection.docs.map(doc => { return {name: doc.data().name, id: doc.data().id, tps: doc.data().tps, token: doc.data().token, private: doc.data().private, lang: doc.data().lang} })
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
    this.setState({loadingAdd: true})
    const token = this.state.tokenAdd
    const save = this.state.toSave
    let msgSnackbar = ''
    // eslint-disable-next-line
    let header = new Headers()
    header.append('Content-Type', 'application/json')
    const url = 'https://europe-west1-tpneerandais.cloudfunctions.net/addListWithCode?token=' + token
    if (token.length !== 5) {
      console.error('Erreur, taille token incorrect')
      msgSnackbar = 'Erreur, taille token incorrect'
      this.setState({msgSnackbar: msgSnackbar, openSnackbar: true, addAlert: true, loadingAdd: false})
    } else {
      // eslint-disable-next-line
      const req = new XMLHttpRequest()
      req.open('POST', url)
      // req.responseType = 'json'
      req.onload = () => {
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
              .set({id: doc.id, name: this.state.nameAdd, tps: list.tps, token: token, private: false, lang: this.props.lang})
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
    return (
      <div className={classes.gridRoot} style={{marginBottom: '1em'}}>
        <Grid container spacing={24}>
          <Grid item className={classes.grid}>
            <Link to={{pathname: '/Liste', state: {all: false}}}><Button variant='raised' color='secondary' className={classes.button} onClick={this.props.handleSelectionTpClose} id='selectionTpClose'> Valider</Button></Link>
          </Grid>
          <Grid item className={classes.grid}>
            <Button variant='raised' color='secondary' className={classes.button} onClick={this.openSaveAlert} id='saveList' disabled={!this.props.user}>Sauvegarder Liste</Button>
            <Typography variant='caption' style={{display: !this.props.user ? 'flex' : 'none'}}>Connection requise </Typography>
          </Grid>
        </Grid>
        <SaveAlert name={this.state.name} errorNom={this.state.errorNom} isPrivate={this.state.private} token={this.state.token} open={this.state.saveAlert} handleSave={this.handleSave} handleChange={this.handleChange} closeSaveAlert={this.closeSaveAlert} fullscreen={this.props.fullScreen} private={this.state.private} privateSwitch={this.privateSwitch} classes={classes} />
        <AddAlert open={this.state.addAlert} setListWithToken={this.props.setListWithToken} handleChange={this.handleChange} addList={this.addList} tokenSwitch={this.tokenSwitch} user={this.props.user} closeAddAlert={this.closeAddAlert} classes={classes} />
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={this.state.openSnackbar}
          autoHideDuration={6000}
          onClose={() => this.setState({openSnackbar: false, errorNom: false})}
          ContentProps={{
            'aria-describedby': 'Liste enregistré'
          }}
          message={<span id={this.state.msgSnackbar}>{this.state.msgSnackbar} </span>}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              className={classes.close}
              onClick={() => this.setState({openSnackbar: false, errorNom: false})}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    )
  }
})

// eslint-disable-next-line
function SaveAlert (props) {
  const classes = props.classes
  return (
    <Dialog
      fullScreen={props.fullscreen}
      open={props.open}
      onClose={props.closeSaveAlert}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      scroll='body'
    >
      <DialogTitle id='alert-dialog-title'>{'Sauvegarde Liste'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Sauvegarde de la liste de temps primitifs pour les retrouver après.
        </DialogContentText>
        <div className={classes.gridRoot}>
          <Grid container spacing={8} >
            <Grid item>
              <div className={classes.grid}>
                <FormControl>
                  <TextField
                    error={props.errorNom}
                    id='name'
                    label='Titre'
                    onChange={props.handleChange}
                    margin='normal'
                  />
                  <FormHelperText >Nom de la liste de Temps primitifs</FormHelperText>
                </FormControl>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.grid}>
                <FormControl>
                  <InputLabel htmlFor='privateSwitch' shrink>Privé</InputLabel>
                  <Switch onClick={props.privateSwitch} id='privateSwitch' classes={{checked: classes.checked, bar: classes.bar}} checked={props.private} />
                </FormControl>
                <Typography variant='body1' style={{display: props.isPrivate ? 'none' : 'inline'}}>token: {props.token}</Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color='secondary' className={classes.button} id='advanced' onClick={props.handleSave}><SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} /> Sauvegarder </Button>
        <Button onClick={props.closeSaveAlert} color='primary' autoFocus>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  )
}
