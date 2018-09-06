/*eslint-disable */
import React, {Component} from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
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
import classNames from 'classnames'
import Refresh from '@material-ui/icons/Refresh'
import Shuffle from '@material-ui/icons/Shuffle'
import Download from '@material-ui/icons/CloudDownload'
import LinearProgress from "@material-ui/core/LinearProgress"
import Fade from '@material-ui/core/Fade'
import download from 'downloadjs'
import Typography from '@material-ui/core/Typography';
/* eslint-enable */

const req = new XMLHttpRequest() // eslint-disable-line

export default withMobileDialog()(class Options extends Component {
  constructor () {
    super()
    this.state = {
      openAlert: false,
      loading: false,
      finish: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleDownload = this.handleDownload.bind(this)
  }

  handleOpen () {
    this.setState({openAlert: true, finish: false})
  }

  handleClose () {
    this.setState({openAlert: false, loading: false})
  }

  showCorRep () {
    const col = this.props.colonne
    let nbColQ = 0
    if (this.props.type === 'etude') {
      for (let i in col) {
        nbColQ += col[i].question ? 1 : 0
      }
      if (nbColQ !== 0) return true
      else return false
    } else if (this.props.type === 'test') {
      return true
    } else {
      return false
    }
  }

  handleDownload () {
    const getTpSelect = () => {
      const Tps = this.props.tp
      const listIdTp = Tps.filter(tp => tp.afficher).map(tp => {
        return tp.id
      })
      console.log(listIdTp)
      return listIdTp
    }
    this.setState({loading: true})
    let header = new Headers() // eslint-disable-line
    header.append('Content-Type', 'application/json')
    const url = 'https://europe-west1-tpneerandais.cloudfunctions.net/createSheet?list=[' + getTpSelect() + ']'
    req.responseType = 'blob'
    req.open('GET', url)
    req.onload = () => {
      const body = req.response
      if (req.status === 500) {
        console.error('Erreur serveur')
      }
      if (req.status === 200) {
        getTpSelect()
        download(body, 'ListTP.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        this.setState({loading: false, finish: true})
      }
    }
    req.timeout = () => {
      console.error('Timeout')
    }
    req.onerror = () => {
      console.error('Error...')
    }
    req.send()
  }

  render () {
    const classes = this.props.classes
    const type = this.props.type
    // const level = this.props.level
    const buttonClassname = classNames({
      [classes.buttonSuccess]: this.props.aleatoire,
      [classes.button]: true
    })
    if (this.props.bottom) {
      return (
        <div className={classes.gridRoot}>
          <Grid container spacing={8} justify='flex-end'>
            <Grid item style={{display: type !== 'voir' ? 'flex' : 'none'}}>
              <div className={classes.grid}>
                <Button variant='raised' color='secondary' className={classes.button} id='correction' onClick={this.props.handleClick} disabled={!this.showCorRep()}>Correction</Button>
              </div>
            </Grid>
            <Grid item style={{display: type !== 'voir' ? 'flex' : 'none'}}>
              <div className={classes.grid}>
                <Button variant='raised' color='secondary' className={classes.button} id='reponse' onClick={this.props.handleAffReponse} disabled={!this.showCorRep()}>Réponse</Button>
              </div>
            </Grid>
          </Grid>
        </div>
      )
    } else {
      return (
        <div className={classes.gridRoot}>
          <Grid container spacing={8} justify='space-between'>
            <Grid item >
              <div className={classes.grid}>
                {/* <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='aleatoire' shrink>Aleatoire</InputLabel>
                  <Switch inputProps={{ id: 'aleatoire', tag: 'aleatoire', name: 'aleatoire', type: 'checkbox' }} classes= {{checked: classes.checked, bar: classes.bar}} checked={Boolean(this.props.aleatoire)} onChange={this.props.handleInputChange} />
                </FormControl> */}
                <Button id='aleatoire' name='aleatoire' color='secondary' className={buttonClassname} onClick={this.props.handleInputChange}>Aléatoire <Shuffle /> </Button>
              </div>
            </Grid>
            <Grid item >
              <div className={classes.grid}>
                <Button variant='raised' color='secondary' className={classes.button} onClick={this.props.handleClick} id='shuffle' disabled={!this.props.aleatoire} >Recharger  <Refresh /> </Button>
              </div>
            </Grid>
            <Grid item style={{display: this.props.listSelected ? 'flex' : 'flex'}} >
              <div className={classes.grid}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='selectNombre' shrink>Nombre</InputLabel>
                  <Select
                    native
                    onChange={this.props.handleSelectNombre}
                    inputProps={{ id: 'selectNombre' }} value={this.props.valueSelectTp}
                    style={{width: 75}}
                  >
                    <option key={'nb10'} value={10}>{10}</option>
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
              <div className={classes.grid}>
                <FormControl className={classes.formControl}>
                  <TextField
                    error={this.props.limite < 0}
                    id='limite'
                    label='limite'
                    name='limite'
                    value={this.props.limite}
                    onChange={this.props.handleInputChange}
                    type='number'
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin='dense'
                    disabled={!this.props.afficherNbTp}
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item style={{display: type === 'voir' ? 'flex' : 'none'}}>
              <div className={classes.grid}>
                <Button variant='outlined' color='secondary' className={classes.button} id='advanced' onClick={this.handleOpen}>télécharger <Download/></Button>
              </div>
            </Grid>
          </Grid>
          <Alert open={this.state.openAlert} loading={this.state.loading} finish={this.state.finish} handleClose={this.handleClose} handleDownload={this.handleDownload} classes={classes} />
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
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      scroll='body'
    >
      <DialogTitle id='alert-dialog-title'>Téléchargement</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
              Téléchargez votre liste de Temps primitifs!
        </DialogContentText>
        <div className={classes.gridRoot}>
          <Grid container spacing={8} >
            <Grid item >
              <div className={classes.grid}>
                <Button variant='raised' color='secondary' className={classes.button} id='advanced' onClick={props.handleDownload}>Télécharger <Download/></Button>
              </div>
            </Grid>
          </Grid>
        </div>
        <Fade in={props.loading}
          style={{
            transitionDelay: props.loading ? '800ms' : '0ms'
          }}
          unmountOnExit
        >
          <React.Fragment>
            <Typography variant='body 1'>Création du fichier en cours, veuillez patienter (cela peut prendre 30 sec)</Typography>
            <LinearProgress/>
          </React.Fragment>
        </Fade>
        {props.finish && <Typography variant='body1'>Votre fichier est prêt!</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color='primary' autoFocus>
              Fermer
        </Button>
      </DialogActions>
    </Dialog>
  )
}
