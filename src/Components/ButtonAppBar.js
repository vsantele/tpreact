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
// eslint-disable-next-line
//import Auth from './Auth'

export default class ButtonAppBar extends Component {
  render () {
    const { classes } = this.props
    const open = Boolean(this.props.anchorEl)
    const _this = this
    function logout () {
      _this.props.logout()
      _this.props.handleClose()
    }
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Link
              to='/Bienvenue'
              onClick={() => { document.location.href === 'https://flamboyant-chandrasekhar-71d621.netlify.com/' ? window.scrollTo(0, 0) : window.scrollTo(0, 0) }}
              style={{
                color: 'white',
                textDecoration: 'none'
              }}
            >
              <Hidden xsDown>
                <Typography variant='title' color='inherit' className={classes.flex}>
                  Les verbes irréguliers en néérlandais
                </Typography>
              </Hidden>
              <Hidden smUp>
                <Typography variant='title' color='inherit' className={classes.flex}>
                  Verbes irréguliers en néérlandais
                </Typography>
              </Hidden>
              {process.env.NODE_ENV === 'test'
                ? (<Typography variant='caption' color='inherit' className={classes.flex}>
                  {this.props.page === '/Mobile' ? 'Smartphone' : 'Ordinateur'}
                </Typography>)
                : null}
            </Link>
            <div className={classes.accountIcon}>
              { this.props.user
                ? (
                  <div>
                    <IconButton
                      aria-owns={this.props.open ? 'menu-appbar' : null}
                      aria-haspopup='true'
                      onClick={this.props.handleMenu}
                      color='inherit'
                    >
                      {
                        <Avatar className={classes.avatar} alt={this.props.user.displayName || this.props.user.email} src={this.props.user.photoURL} /> ||
                        <AccountCircle />
                      }
                    </IconButton>
                    <Menu
                      id='menu-appbar'
                      anchorEl={this.props.anchorEl}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      open={open}
                      onClose={this.props.handleClose}
                    >
                      <MenuItem onClick={this.props.handleClose}><Link to='/Profile'>Profile</Link></MenuItem>
                      {
                        this.props.user
                          ? <MenuItem onClick={logout}>Déconnexion</MenuItem>
                          : <MenuItem onClick={this.props.handleClose}><Link to='/Auth'>Connection</Link></MenuItem>
                      }
                    </Menu>
                  </div>

                )
                : <Link to='/Auth'><Button className={classes.button} variant='raised' color='secondary' onClick={this.props.handleClose}>Connection</Button></Link>
              }
            </div>

          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
