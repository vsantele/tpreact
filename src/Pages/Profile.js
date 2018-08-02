/*eslint-disable */
import React, {Component} from 'react'
//import {Paper, Typography, Avatar, Button, TextField, Chip, Select, FormControl, InputLabel, Input, MenuItem} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import { Link, Redirect } from 'react-router-dom'
import theme from '../config/theme'
import { auth, provider, db } from '../firebase/firebase.js'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
/*eslint-enable */
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}
const names = [
  'Saint Charles Dottignies',
  'Saint Charles Luingne'
]

export default class Profile extends Component {
  constructor () {
    super()
    this.state = {
      name: [],
      ecoles: [],
      ecolesSelected: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  handleChange (event, name) {
    this.setState({
      [name]: event.target.value
    })
  }
  componentDidMount () {
    db
      .collection('ecoles')
      .get()
      .then(collection => {
        const ecoles = collection.docs.map(doc => doc.data())
        this.setState({ecoles: ecoles})
      })
    setTimeout(() => {
      this.setState({loading: true})
    }, 1000, this.props.user !== null)
  }

  render () {
    const classes = this.props.classes
    const user = this.props.user
    return (
      <div className={classes.appFrame}>
        <div className={classes.content}>
          <Paper className={classes.paper}>
            WORK IN PROGRESS...
            {
              this.props.user
                ? <div><Connected user = {user} classes = {classes} /> {/* <EditProfil names={names} name= {this.state.name} ecoles = {this.state.ecoles} ecolesSelected = {this.state.ecolesSelected} classes = {classes} user = {user} handleChange = {this.handleChange}/> */} </div>
                : <NoConnected classes = {classes} />
            }
          </Paper>
        </div>
      </div>
    )
  }
}

// eslint-disable-next-line
function NoConnected (props) {
  const classes = props.classes
  return (
    <div className={classes.margin}>
      <Typography variant='headline'>Vous n'êtes pas encore connecter...</Typography>
      <Link to='Auth'><Button variant='raised' color='secondary' className={classes.button}>Connection</Button></Link>
    </div>
  )
}

// eslint-disable-next-line
function Connected (props) {
  const user = props.user
  const classes = props.classes
  return (
    <div className={classes.margin}>
      <Typography variant='headline'>Profile de {user.displayName}</Typography>
      <div>
        <Typography variant='title'>Infos:</Typography>
        <div>
          <Typography variant='body2'>Nom: {user.displayName} </Typography>
          <div><Typography variant='body2'>Avatar: <span style={{display: 'inline'}}> <Avatar className={classes.avatar} alt={user.displayName || user.email} src={user.photoURL}/></span></Typography></div>
          {/* <Typography variant='body2'>Email: {user.email}</Typography>
          <Typography variant='body2'>Role: {user.role}</Typography>
          <Typography variant='body2'>Ecole: {user.ecoles}</Typography>
          <Typography variant='body2'>Classe: {user.classes}</Typography> */}
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line
function EditProfil (props) {
  const classes = props.classes
  var user = props.user
  const names = props.names
  return (
    <div className={classes.margin}>
      Inutile pour le moment ^^
      <form noValidate autoComplete="off">
        <TextField
          id='role1'
          label='role1'
          className={classes.textFieldProfil}
          value={user.role}
          onChange={(e) => props.handleChange(e, 'role1')}
          margin='normal'
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="ecoles">Ecoles</InputLabel>
          <Select
            multiple
            value={props.ecolesSelected}
            onChange={(e) => props.handleChange(e, 'ecoles')}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => <Chip key={value} label={value} className={classes.chip} />)}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {props.ecoles.map(ecole => (
              <MenuItem
                key={ecole}
                value={ecole}
                style={{
                  fontWeight:
                    props.ecolesSelected.indexOf(ecole) === -1
                      ? theme.typography.fontWeightRegular
                      : theme.typography.fontWeightMedium
                }}
              >
                {ecole.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id='classes'
          label='classes'
          className={classes.textFieldProfil}
          value={user.role}
          onChange={(e) => props.handleChange(e, 'classes')}
          margin='normal'
        />
      </form>
    </div>
  )
}
