// eslint-disable-next-line
import React, {Component} from 'react'
// eslint-disable-next-line
import {AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Hidden, Button} from 'material-ui'
// eslint-disable-next-line
import AccountCircle from 'material-ui-icons/AccountCircle'
// eslint-disable-next-line
import { Link } from 'react-router-dom'
import Auth from './Auth'

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
              to='/'
              onClick={() => { document.location.href === 'https://flamboyant-chandrasekhar-71d621.netlify.com/' ? window.scrollTo(0, 0) : window.scrollTo(0, 0) }}
              style={{
                color: 'white',
                textDecoration: 'none'
              }}
            >
              <Hidden xsDown>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  Temps Primitifs en Néérlandais
                </Typography>
              </Hidden>
              <Hidden smUp>
                <Typography variant='title' color='inherit' className={classes.flex}>
                  Tp en Néérlandais
                </Typography>
              </Hidden>
              <Typography variant="caption" color="inherit" className={classes.flex}>
                {this.props.page === '/' ? 'Ordinateur' : 'Smartphone'}
              </Typography>
            </Link>
            <div className={classes.accountIcon}>
              { this.props.user
                ? (
                  <div>
                    <IconButton
                      aria-owns={this.props.open ? 'menu-appbar' : null}
                      aria-haspopup="true"
                      onClick={this.props.handleMenu}
                      color="inherit"
                    >
                      {
                        <Avatar className={classes.avatar} alt={this.props.user.displayName || this.props.user.email} src={this.props.user.photoURL} /> ||
                      <AccountCircle />
                      }
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={this.props.anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      open={open}
                      onClose={this.props.handleClose}
                    >
                      <Link to='/profil'><MenuItem onClick={this.props.handleClose}>Profile</MenuItem> </Link>
                      {
                        this.props.user
                          ? <MenuItem onClick={logout}>Déconnexion</MenuItem>
                          : <Link to='/Auth'><MenuItem onClick={this.props.handleClose}>Connection</MenuItem></Link>
                      }
                    </Menu>
                  </div>

                )
                : <Link to='/Auth'><Button className={classes.button} variant="raised" color='secondary' onClick={this.props.handleClose}>Connection</Button></Link>
              }
            </div>

          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
