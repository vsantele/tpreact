// eslint-disable-next-line
import React, {Component} from 'react'
// eslint-disable-next-line
import {FormControl, InputLabel, Switch as SwitchButton, Button, Grid, Select, TextField} from 'material-ui'
// eslint-disable-next-line
import { Link } from 'react-router-dom'

export default class Options extends Component {
  render () {
    const classes = this.props.classes
    if (this.props.selectionPage) {
      return (
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='selectAll' shrink>Tout les TP</InputLabel>
            <SwitchButton onClick={this.props.selectAll} id='selectAll' classes= {{checked: classes.checked, bar: classes.bar}} checked = {Boolean(this.props.selectAllChbx)}></SwitchButton>
          </FormControl>
          <Button variant="raised" color="secondary" className={classes.button} onClick={this.props.handleSelectionTpClose} id="selectionTpClose"> Valider! </Button>
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
                  <SwitchButton inputProps={{ id: 'aleatoire', tag: 'aleatoire', name: 'aleatoire', type: 'checkbox' }} classes= {{checked: classes.checked, bar: classes.bar}} checked={Boolean(this.props.aleatoire)} onChange={this.props.handleInputChange} />
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
                  <SwitchButton inputProps={{ id: 'affReponse', name: 'affReponse', type: 'checkbox' }} classes={{checked: classes.checked, bar: classes.bar}}checked={this.props.afficherReponse} onChange={ this.props.handleAffReponse} />
                </FormControl>
              </div>
            </Grid>
            <Grid item >
              <div className={classes.grid}>
                <Link to='/Mobile' className={classes.link} onClick={() => this.props.changePage('/Mobile')}><Button variant="raised" color="secondary" className={classes.button}> Vers Mobile</Button></Link>
              </div>
            </Grid>
          </Grid>
        </div>
      )
    }
  }
}
