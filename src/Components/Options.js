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
/* eslint-enable */

export default withMobileDialog()(class Options extends Component {
  constructor () {
    super()
    this.state = {
      openAlert: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen () {
    this.setState({openAlert: true})
  }

  handleClose () {
    this.setState({openAlert: false})
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
            {/* <Grid item style={{display: type === 'voir' ? 'none' : 'flex'}}>
              <div className={classes.grid}>
                <Button variant='raised' color='secondary' className={classes.button} id='advanced' onClick={this.handleOpen}>Plus</Button>
              </div>
            </Grid> */}
          </Grid>
          <Alert open={this.state.openAlert} handleClose={this.handleClose} handleAdvanced={this.props.handleAdvanced} classes={classes} />
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
      <DialogTitle id='alert-dialog-title'>{'Options Supplémentaire'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
              Ajout d'options supplémentaires
        </DialogContentText>
        <div className={classes.gridRoot}>
          <Grid container spacing={8} >
            <Grid item >
              <div className={classes.grid}>
                <Button variant='raised' color='secondary' className={classes.button} id='advanced' onClick={props.handleAdvanced}>Advanced</Button>
              </div>
            </Grid>
            <Grid item />
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color='primary' autoFocus>
              Fermer
        </Button>
      </DialogActions>
    </Dialog>
  )
}
