/* eslint-disable */
import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link } from 'react-router-dom'
//import Auth from './Auth'
/* eslint-enable */
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
    this.logout = this.logout.bind(this)
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
        return 'https://res.cloudinary.com/wolfvic/image/upload/c_scale,f_auto,fl_png8,h_120,q_auto:eco,w_200/v1536609563/flag/Flag_of_the_United_Kingdom.svg'
    }
  }

  logout () {
    this.props.logout()
    this.handleClose('menuUser')
  }

  render () {
    const { classes } = this.props
    const lang = () => {
      switch (this.props.lang) {
        case 'neerlandais':
          return <span>Verbes irréguliers <span style={{fontFamily: 'Mathilde, Roboto', fontSize: '1.7em'}}>Néerlandais</span></span>
        case 'anglais':
          return <span>Verbes irréguliers <span style={{fontFamily: 'Mathilde, Roboto', fontSize: '1.7em'}}>Anglais</span></span>
        case 'allemand':
          return <span>Verbes irréguliers <span style={{fontFamily: 'Mathilde, Roboto', fontSize: '1.7em'}}>Allemand</span></span>
        case 'vocAnglais':
          return <span>Vocabulaire <span style={{fontFamily: 'Mathilde, Roboto', fontSize: '1.7em'}}>Anglais</span></span>
        default:
          return <span>NO <span style={{fontFamily: 'Mathilde, Roboto', fontSize: '1.7em'}}>LANG</span></span>
      }
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
              <Typography variant='h6' color='inherit' className={classes.flex} style={{fontFamily: 'Bahnschrift, Roboto'}}>
                {lang()}
              </Typography>
            </Link>
            <div style={{flexGrow: 1}} />
            <div>
              <IconButton style={{marginRight: '0.2em'}} onClick={(e) => this.handleMenu(e, 'menuLang')} >
                <img style={{height: '0.7em'}} src={this.whichLang()} alt="drapeau" />
              </IconButton>
              <Menu
                id='selectLang'
                anchorEl={this.state.anchorEl}
                open={this.state.menuLang}
                onClose={() => this.handleClose('menuLang')}
              >
                <MenuItem onClick={() => this.selectLang('neerlandais')}><img alt='néerlandais' style={{height: '1.1em'}} src='https://res.cloudinary.com/wolfvic/image/upload/c_scale,f_auto,fl_png8,h_120,q_auto:eco,w_200/v1536609563/flag/Flag_of_the_Netherlands.svg' /></MenuItem>
                <MenuItem onClick={() => this.selectLang('anglais')}><img alt='anglais' style={{height: '1.1em'}} src='https://res.cloudinary.com/wolfvic/image/upload/c_scale,f_auto,fl_png8,h_120,q_auto:eco,w_200/v1536609563/flag/Flag_of_the_United_Kingdom.svg' /></MenuItem>
                <MenuItem onClick={() => this.selectLang('vocAnglais')}><span>Voc Anglais</span></MenuItem>
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
                      <MenuItem onClick={() => this.logout()}>Déconnexion</MenuItem>
                    </Menu>
                  </div>

                )
                : <Link to='/Auth'><Button className={classes.button} variant='contained' color='secondary' onClick={() => this.handleClose('menuUser')}>Connexion</Button></Link>
              }
            </div>

          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
