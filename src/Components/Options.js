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
import Divider from '@material-ui/core/Divider';

/*eslint-enable */
export default withMobileDialog()(class Options extends Component {
  constructor () {
    super()
    this.state = {
      openAlert: false,
      saveAlert: false,
      private: true,
      openList: true,
      listName: []
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.openSaveAlert = this.openSaveAlert.bind(this)
    this.closeSaveAlert = this.closeSaveAlert.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.privateSwitch = this.privateSwitch.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.openList = this.openList.bind(this)
  }

  handleOpen () {
    this.setState({openAlert: true})
  }

  handleClose () {
    this.setState({openAlert: false})
  }

  openSaveAlert () {
    this.setState({saveAlert: true})
  }

  closeSaveAlert () {
    this.setState({saveAlert: false})
  }

  handleChange (event) {
    this.setState({
      'name': event.target.value
    })
  }

  privateSwitch () {
    const privateState = this.state.private
    this.setState({
      private: !privateState
    })
  }

  handleSave () {
    const tps = this.props.tp
    function getTps () {
      let listTps = []
      tps.map(tp => {
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
        .set({name: this.state.name, id: doc.id, private: this.state.private, tps: getTps()})
        .then(this.setState({saveAlert: false, name: ''}))
    }
  }

  openList () {
    if (this.props.user) {
      db
        .collection('users')
        .doc(this.props.user.uid)
        .collection('lists')
        .get()
        .then(collection => {
          const listName = collection.docs.map(doc => { return {name: doc.data().name, id: doc.data().id, tps: doc.data().tps} })
          this.setState({ listName: listName, openList: true })
        })
    }
  }

  render () {
    const classes = this.props.classes
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
                <Button variant="raised" color='secondary' className={classes.button} onClick={this.openSaveAlert} id='saveList' disabled={!this.props.user}>Sauvegarder Liste</Button>
              </div>
            </Grid>

            <Grid item>
              <div className={classes.grid}>
                <Button variant="raised" color="secondary" className={classes.button} onClick={this.props.handleSelectionTpClose} id="selectionTpClose"> Valider!</Button>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.grid}>
                <Button variant="raised" color="secondary" className={classes.button} onClick={this.openList} id='openlist' disabled={!this.props.user}>Afficher listes</Button>
              </div>
            </Grid>
          </Grid>
          {
            this.state.openList
              ? (
                this.state.listName !== []
                  ? <div><ShowList listName = {this.state.listName} selectList={this.props.selectList} classes = {classes} /></div>
                  : <div>Vous n'avez pas encore enregister de listes pour le moment </div>
              )
              : null
          }
          <SaveAlert name={this.state.name} open = {this.state.saveAlert} handleSave={this.handleSave} handleChange={this.handleChange} closeSaveAlert = {this.closeSaveAlert} fullscreen = {this.props.fullscreen} private={this.state.private} privateSwitch={this.privateSwitch} classes = {classes} />
        </div>
      )
    } else {
      return (
        <div className={classes.gridRoot}>
          <Grid container spacing={8}>
            <Grid item >
              <div className={classes.grid}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='aleatoire' shrink>Aleatoire</InputLabel>
                  <Switch inputProps={{ id: 'aleatoire', tag: 'aleatoire', name: 'aleatoire', type: 'checkbox' }} classes= {{checked: classes.checked, bar: classes.bar}} checked={Boolean(this.props.aleatoire)} onChange={this.props.handleInputChange} />
                </FormControl>
              </div>
            </Grid>
            <Grid item >
              <div className={classes.grid}>
                <Button variant="raised" color='secondary' className={classes.button} onClick={this.props.handleClick} id='shuffle' disabled = {(!this.props.aleatoire && !this.props.aleatoireQuestion)} > Recharger </Button>
              </div>
            </Grid>
            <Grid item >
              <div className={classes.grid}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='selectNombre' shrink>Nombres</InputLabel>
                  <Select
                    native
                    onChange={this.props.handleSelectNombre}
                    inputProps={{ id: 'selectNombre' }} defaultValue={20}
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
            <Grid item>
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
                <FormControl>
                  <InputLabel htmlFor='affReponse' shrink>Réponse</InputLabel>
                  <Switch inputProps={{ id: 'affReponse', name: 'affReponse', type: 'checkbox' }} classes={{checked: classes.checked, bar: classes.bar}}checked={this.props.afficherReponse} onChange={ this.props.handleAffReponse} />
                </FormControl>
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
                  <Switch onClick={props.privateSwitch} id='privateSwitch' classes={{checked: classes.checked, bar: classes.bar}} checked = {props.private} disabled />
                </FormControl>
              </div>
            </Grid>
            <Grid item >
              <div className={classes.grid}>
                <Button variant='raised' color='secondary' className={classes.button} id='advanced' onClick={props.handleSave}>Sauvegarder</Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeSaveAlert} color="primary" autoFocus>
              Fermer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function ShowList (props) {
  return (
    <div >
      <Divider />
      <Grid container>
        {props.listName.map(list => (
          <Grid item key={list.id} xs={1}>
            <Button variant='outlined' color='secondary' className={props.classes.button} onClick={() => props.selectList(list.id)} >{list.name}</Button>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
