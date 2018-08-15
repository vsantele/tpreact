/*eslint-disable */
import React, { Component } from 'react'
import OptionSelect from '../Components/OptionSelect'
import SelectionTp from '../Components/SelectionTp'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
/* eslint-enable */
export default class Selection extends Component {
  render () {
    const classes = this.props.classes
    return (
      <div className={classes.appFrame}>
        <main className={classes.content}>
          <Grid container direction='column' justify='flex-start' alignItems='center'>
            <Grid item xs={12}>
              <OptionSelect
                classes={classes}
                handleSelectionTpOpen={this.props.handleSelectionTpOpen}
                handleSelectionTpClose={this.props.handleSelectionTpClose}
                selectAll={this.props.selectAll}
                selectAllChbx={this.props.selectAllChbx}
                selectionPage={this.props.selectionPage}
                tp={this.props.tp}
                user={this.props.user}
                setListWithToken={this.props.setListWithToken}
              />
            </Grid>
            {
              !this.props.loading
                ? <Grid item>
                  <SelectionTp
                    tp={this.props.tp}
                    colonne={this.props.colonne}
                    handleCheck={this.props.handleCheck}
                    classes={classes}
                  />
                </Grid>
                : <div style={{width: `100%`}}><LinearProgress color='primary' variant='query' /></div>
            }
            <br />
          </Grid>
        </main>
      </div>
    )
  }
}
