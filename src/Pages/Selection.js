/*eslint-disable */
import React, { Component } from 'react'
import OptionSelect from '../Components/OptionSelect'
import SelectionTp from '../Components/SelectionTp'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import LinearProgress from '@material-ui/core/LinearProgress'
/* eslint-enable */
export default class Selection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filterStr: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
  }
  handleSearch (e) {
    let search = e.target.value
    this.setState({filterStr: search})
  }

  render () {
    const contient = e => {
      // console.log(colonne[0])
      return e[colonne[0].value].includes(filterStr) || e[colonne[1].value].includes(filterStr) || e[colonne[2].value].includes(filterStr) || e[colonne[3].value].includes(filterStr)
    }
    const classes = this.props.classes
    const { tp, colonne } = this.props
    const { filterStr } = this.state
    const filteredTp = tp.filter(e => contient(e))
    return (
      <div className={classes.appFrame}>
        <main className={classes.content}>
          <Grid container direction='column' justify='flex-start' alignItems='center' spacing={16}>
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
                lang={this.props.lang}
                setListWithToken={this.props.setListWithToken}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField id="searchTp" label="Rechercher" onChange={e => this.handleSearch(e)} variant="filled" fullWidth autoComplete={false}/>
            </Grid>
            {
              !this.props.loading
                ? <Grid item>
                  <SelectionTp
                    tp={filteredTp}
                    colonne={this.props.colonne}
                    handleCheck={this.props.handleCheck}
                    selectAll={this.props.selectAll}
                    selectAllChbx={this.props.selectAllChbx}
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
