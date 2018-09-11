// eslint-disable-next-line
import React, {Component} from 'react'
// eslint-disable-next-line
import AppBar from '@material-ui/core/AppBar'
// eslint-disable-next-line
import Toolbar from '@material-ui/core/Toolbar'
// eslint-disable-next-line
import Typography from '@material-ui/core/Typography'
// eslint-disable-next-line
import IconButton from '@material-ui/core/IconButton'
// eslint-disable-next-line
import Avatar from '@material-ui/core/Avatar'
// eslint-disable-next-line
import Menu from '@material-ui/core/Menu'
// eslint-disable-next-line
import MenuItem from '@material-ui/core/MenuItem'
// eslint-disable-next-line
import Hidden from '@material-ui/core/Hidden'
// eslint-disable-next-line
import Button from '@material-ui/core/Button'
// eslint-disable-next-line
import AccountCircle from '@material-ui/icons/AccountCircle'
// eslint-disable-next-line
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
// eslint-disable-next-line
//import Auth from './Auth'

export default class ButtonAppBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      anchorEl: null,
      menuUser: false,
      menuLang: false
    }
    this.handleMenu = this.handleMenu.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.selectLang = this.selectLang.bind(this)
  }

  handleMenu (event, menu) {
    this.setState({ anchorEl: event.currentTarget, [menu]: true })
  }
  handleClose (menu) {
    this.setState({ anchorEl: null, [menu]: false })
  }
  selectLang (lang) {
    this.props.selectLang(lang)
    this.handleClose('menuLang')
  }
  whichLang () {
    switch (this.props.lang) {
      case 'neerlandais':
        return 'https://res.cloudinary.com/wolfvic/image/upload/c_scale,f_auto,fl_png8,h_120,q_auto:eco,w_200/v1536609563/flag/Flag_of_the_Netherlands.svg'
      case 'anglais':
        return 'https://res.cloudinary.com/wolfvic/image/upload/c_scale,f_auto,fl_png8,h_120,q_auto:eco,w_200/v1536609563/flag/Flag_of_the_United_Kingdom.svg'
      case 'allemand':
        return 'https://res.cloudinary.com/wolfvic/image/upload/c_scale,f_auto,fl_png8,h_120,q_auto:eco,w_200/v1536609563/flag/Flag_of_Germany.svg'
      default:
        return 'https://res.cloudinary.com/wolfvic/image/upload/c_scale,f_auto,fl_png8,h_120,q_auto:eco,w_200/v1536609563/flag/Flag_of_the_Netherlands.svg'
    }
  }
  render () {
    const { classes } = this.props
    const _this = this
    function logout () {
      _this.props.logout()
      _this.props.handleClose('menuUser')
    }
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position='fixed'>
          <Toolbar>
            <Link
              to='/Bienvenue'
              style={{
                color: 'white',
                textDecoration: 'none'
              }}
            >
              <Hidden xsDown>
                <Typography variant='title' color='inherit' className={classes.flex} style={{fontFamily: 'Bahnschrift, Roboto'}}>
                  Les verbes irréguliers <span style={{fontFamily: 'Mathilde, Roboto', fontSize: '1.7em'}}>Néerlandais</span>
                </Typography>
              </Hidden>
              <Hidden smUp>
                <Typography variant='title' color='inherit' className={classes.flex} style={{fontFamily: 'Bahnschrift, Roboto'}}>
                  Verbes irréguliers <span style={{fontFamily: 'Mathilde, Roboto', fontSize: '1.7em'}}>Néerlandais</span>
                </Typography>
              </Hidden>
            </Link>
            <div style={{flexGrow: 1}} />
            <div>
              <IconButton style={{marginRight: '0.2em'}} onClick={(e) => this.handleMenu(e, 'menuLang')} >
                <img style={{height: '0.7em'}} src={this.whichLang()} />
              </IconButton>
              <Menu
                id='selectLang'
                anchorEl={this.state.anchorEl}
                open={this.state.menuLang}
                onClose={() => this.handleClose('menuLang')}
              >
                <MenuItem onClick={() => this.selectLang('neerlandais')}><img alt='néerlandais' style={{height: '1.1em'}} src='https://res.cloudinary.com/wolfvic/image/upload/c_scale,f_auto,fl_png8,h_120,q_auto:eco,w_200/v1536609563/flag/Flag_of_the_Netherlands.svg' /></MenuItem>
                <MenuItem disabled onClick={() => this.selectLang('anglais')}><img alt='anglais' style={{height: '1.1em'}} src='https://res.cloudinary.com/wolfvic/image/upload/c_scale,f_auto,fl_png8,h_120,q_auto:eco,w_200/v1536609563/flag/Flag_of_the_United_Kingdom.svg' /></MenuItem>
                <MenuItem disabled onClick={() => this.selectLang('allemand')}><img alt='allemand' style={{height: '1em'}} src='https://res.cloudinary.com/wolfvic/image/upload/c_scale,f_auto,fl_png8,h_120,q_auto:eco,w_200/v1536609563/flag/Flag_of_Germany.svg' /></MenuItem>
              </Menu>
            </div>

            <div className={classes.accountIcon}>
              { this.props.user
                ? (
                  <div>
                    <IconButton
                      aria-owns={this.props.open ? 'menu-appbar' : null}
                      aria-haspopup='true'
                      onClick={(e) => this.handleMenu(e, 'menuUser')}
                      color='inherit'
                    >
                      {
                        <Avatar className={classes.avatar} alt={this.props.user.displayName || this.props.user.email} src={this.props.user.photoURL} /> ||
                        <AccountCircle />
                      }
                    </IconButton>
                    <Menu
                      id='menu-appbar'
                      anchorEl={this.state.anchorEl}
                      open={this.state.menuUser}
                      onClose={() => this.handleClose('menuUser')}
                    >
                      {/* <MenuItem onClick={this.handleClose}><Link to='/Profile'>Profile</Link></MenuItem> */}
                      {
                        this.props.user
                          ? <MenuItem onClick={logout}>Déconnexion</MenuItem>
                          : <MenuItem onClick={() => this.handleClose('menuUser')}><Link to='/Auth'>Connexion</Link></MenuItem>
                      }
                    </Menu>
                  </div>

                )
                : <Link to='/Auth'><Button className={classes.button} variant='raised' color='secondary' onClick={() => this.handleClose('menuUser')}>Connexion</Button></Link>
              }
            </div>

          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
