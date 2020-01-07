/* eslint-disable */
import React, { Component } from 'react'
import Progress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from '@material-ui/core/Snackbar'
import {db} from '../firebase/firebase'
/* eslint-enable */
class ShowList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openSnackbar: false,
      msgSnackbar: ''
    }
    this.deleteList = this.deleteList.bind(this)
  }

  deleteList (id) {
    db
      .collection('users')
      .doc(this.props.user.uid)
      .collection('lists')
      .doc(id)
      .delete()
      .then(this.setState({openSnackbar: true, msgSnackbar: 'Liste supprimé avec succès'}))
      .catch(error => {
        console.error('erreur suppression liste: ', error)
        this.setState({openSnackbar: true, msgSnackbar: `Erreur: ${error}`})
      })
      .then(this.props.getList())
  }

  render () {
    // console.log(this.props.user)
    return (
      <div >
        {
          this.props.loading
            ? <Progress />
            : this.props.listName && <Grid container spacing={16} style={{margin: '0.5em'}}>
              {this.props.listName.length !== 0
                ? (this.props.listName.filter(list => list.lang === this.props.lang).map(list => (
                  <Grid item key={list.id}>
                    <Paper>
                      <Button color='secondary' className={this.props.classes.button} onClick={() => this.props.selectList(list.tps)}>
                        {list.name}
                      </Button>
                      <IconButton onClick={() => this.deleteList(list.id)}>
                        <DeleteIcon />
                      </IconButton>
                      <Typography variant='caption' style={{margin: '0.2em', textAlign: 'center'}} >{list.private ? 'privée' : 'public: ' + list.token}</Typography>
                    </Paper>
                  </Grid>
                )))
                : <Typography variant='body1'>Vous n'avez pas encore de listes enregistrées. Pour en ajouter une, sélectionnez les temps primitifs que vous voulez et appuyez sur "Sauvegarder liste" ou ajoutez en une avec un token</Typography>}
            </Grid>
        }
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={this.state.openSnackbar}
          autoHideDuration={6000}
          onClose={() => this.setState({openSnackbar: false})}
          message={<span id={this.state.msgSnackbar}>{this.state.msgSnackbar} </span>}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              className={this.props.classes.close}
              onClick={() => this.setState({openSnackbar: false})}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    )
  }
}

export default ShowList
