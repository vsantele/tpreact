/*eslint-disable */
import React, {Component} from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Collapse from '@material-ui/core/Collapse'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Auth from '../Components/Auth'
import AddAlert from '../Components/AddAlert'
import ShowListTp from '../Components/ShowList'
import Dialog from '@material-ui/core/Dialog'
import {db} from '../firebase/firebase'
import Progress from '@material-ui/core/LinearProgress'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import ButtonBase from '@material-ui/core/ButtonBase'
import cerveauVelo from '../Images/cerveauVelo.png'
import cerveauBoxe from '../Images/cerveauBoxe.png'
import VerIrrNdls from '../Images/Les verbes irréguliers Néerlandais.png'
/*esling-enable*/

export default withMobileDialog()(class Bienvenue extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showList: false,
      addAlert: false,
      loadingGetList: false,
      openListTp: false,
      redirectListe: false
    }
    this.showList = this.showList.bind(this)
    this.showCreate =this.showCreate.bind(this)
    this.closeAddAlert = this.closeAddAlert.bind(this)
    this.closeListAlert= this.closeListAlert.bind(this)
    this.getList = this.getList.bind(this)
    this.redirectList = this.redirectList.bind(this)
    this.clickMesList = this.clickMesList.bind(this)
  }

  showList () {
    this.setState({showList: !this.state.showList})
  }

  showCreate () {
    this.setState({showCreate: !this.state.showCreate})
  }

  closeAddAlert () {
    this.setState({addAlert: false})
  }
  closeListAlert () {
    this.setState({openListTp: false})
  }

  getList () {
    db
      .collection('users')
      .doc(this.props.user.uid)
      .collection('lists')
      .get()
      .then(collection => {
        const listName = collection.docs.map(doc => { return {name: doc.data().name, id: doc.data().id, tps: doc.data().tps, token: doc.data().token, private: doc.data().private} })
        this.setState({listName: listName, loadingGetList: false})
      })
      .catch((error) => {
        console.error('erreur getList', error)
      })
  }

  redirectList (tps) {
    this.props.selectTp(tps)
    this.setState({redirectListe: true})
  }

  clickMesList () {
    if (this.props.user !== null) {
      this.getList()  
      this.setState({openListTp: true, loadingGetList: true})
    } else {
      this.setState({openListTp: true})
    }
  }

  render () {
    const classes = this.props.classes
    if (this.state.redirectListe) return <Redirect to={{pathname:'/Liste', state:{}}} />
    return (
      <div className={classes.affFrame}>
        <div className={classes.content}>
        <Grid container spacing={40} direction='column' justify='center' alignItems='center'>
            <Grid item>
              <img src={VerIrrNdls} />
            </Grid>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Grid item container spacing={40} direction="row" justify="center" alignItems="baseline" >
              <Grid item>
                <ButtonBase
                  focusRipple
                  className={classes.image}
                  focusVisibleClassName={classes.focusVisible}
                  style={{width: '250px', 'height': '250px'}}
                  onClick={this.showList}
                >
                  <span
                    className={classes.imageSrc}
                    // src={cerveauCourse}
                    style={{
                      backgroundImage: `url(${cerveauVelo})`
                    }}
                  />
                  <span className={classes.imageButton}>
                    <Typography
                      component="span"
                      variant="button"
                      color="inherit"
                      className={classes.imageTitle}
                    >
                      voir les listes
                      <span className={classes.imageMarked} />
                    </Typography>
                  </span>
                </ButtonBase>
                <Collapse in={this.state.showList} >
                  <MenuList >
                    <Link to={{pathname:'/Liste', state:{all: true}}}>
                      <MenuItem >
                        Liste complète
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={this.clickMesList}>
                      Mes listes
                    </MenuItem>
                  </MenuList>
                </Collapse>
              </Grid>
              <Grid item>
                <ButtonBase
                  focusRipple
                  className={classes.image}
                  focusVisibleClassName={classes.focusVisible}
                  style={{width: '250px', 'height': '250px'}}
                  onClick={this.showCreate}
                >
                  <span
                    className={classes.imageSrc}
                    // src={cerveauCourse}
                    style={{
                      backgroundImage: `url(${cerveauBoxe})`
                    }}
                  />
                  
                  <span className={classes.imageButton}>
                    <Typography
                      component="span"
                      variant="button"
                      color="inherit"
                      className={classes.imageTitle}
                    >
                      gérer les listes
                      <span className={classes.imageMarked} />
                    </Typography>
                  </span>
                </ButtonBase>
                <Collapse in={this.state.showCreate}>
                  <MenuList>
                    <Link to='/Selection'>
                      <MenuItem>
                        Créer une nouvelle liste
                      </MenuItem>
                    </Link>
                    <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='blank'>
                      <MenuItem>
                        Modifier une liste (soon)
                      </MenuItem>
                    </a>
                    <MenuItem onClick={() => this.setState({addAlert: true})}>
                      Ajouter une liste
                    </MenuItem>
                  </MenuList>
                </Collapse>
              </Grid>
            </Grid>
            <AddAlert open={this.state.addAlert} setListWithToken={this.props.setListWithToken} handleChange={this.handleChange} addList={this.addList} tokenSwitch={this.tokenSwitch} user={this.props.user} closeAddAlert={this.closeAddAlert} classes={classes}/>
            <List open={this.state.openListTp} loading={this.state.loadingGetList} listName={this.state.listName} classes = {classes} selectList={this.redirectList} user={this.props.user} fullScreen={this.props.fullScreen} getList={this.getList} closeListAlert={this.closeListAlert}/>
          </div>
          </Grid>
        </div>
      </div>
    )
  }
})

function List (props) {
  if (props.user !== null) {
    return (
      <Dialog open={props.open} fullScreen={props.fullScreen} onClose={props.closeListAlert} onBackdropClick={props.closeListAlert} scroll='body' maxWidth='md' >
        <DialogTitle>Listes de temps primitifs enregistrées</DialogTitle>
        <DialogContent>
          <ShowListTp loading={props.loading} getList={props.getList} listName={props.listName} classes={props.classes} selectList={props.selectList} user = {props.user} />
        </DialogContent>
        <DialogActions>
        <Button onClick={props.closeListAlert} color='primary' autoFocus>
          Fermer
        </Button>
        </DialogActions>
      </Dialog>
    )
  } else {
    return(
      <Dialog open={props.open} fullScreen={props.fullScreen} onClose={props.closeListAlert} onBackdropClick={props.closeListAlert} scroll='body' maxWidth='md' >
        <DialogTitle>Listes de temps primitifs enregistrées</DialogTitle>
        <DialogContent>
          Vous devez être connecté pour accéder à vos listes.
        </DialogContent>
        <DialogActions>
        <Button onClick={props.closeListAlert} color='primary' autoFocus>
          Fermer
        </Button>
        </DialogActions>
      </Dialog>
    )
  }
}