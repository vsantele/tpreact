import React, { Component } from 'react'
import './App.css'
import Firebase from 'firebase'
import 'bootstrap/dist/css/bootstrap.css'
import { Table } from 'reactstrap'
import config from './config'
// import Tableau from './components/Table'
import Row from './components/Row'
import ReactLoading from 'react-loading'

class App extends Component {
  constructor (props) {
    super(props)
    Firebase.initializeApp(config)
    this.state = {
      loading: true,
      key: 0.1,
      random: [0, 1, 2]
    }
    // this.random = this.random.bind(this)
  }

  componentWillMount () {
    const ref = Firebase.database().ref('tp')
    ref.on('value', snapshot => {
      this.setState({
        tp: snapshot.val(),
        loading: false
      })
    })
    // console.log(this.state.random)
  }
  /* random () {
    let lengthArray = this.state.tp.length
    var random = []
    for (let x = 0; x < lengthArray; x++) {
      var randomNb = Math.floor(Math.random() * 4)
      random.push(randomNb)
    }
    this.setState({
      random: randomNb
    })
  } */
  handleSubmit () {
    console.log('coucou handle')
    // console.log(ReactDOM.findDOMNode("#word0") ) 
  }
  render () {
    if (this.state.loading) {
      return <div container><ReactLoading color={'#ff00ff'} type={'spin'} /></div>
    }
    // this.random()
    return (
      <div className="container">
        <h1 className="center">Tps</h1>
        <button className="btn btn-block btn-primary" onClick={() => this.handleSubmit()} >VERIF</button>
        <Table striped bordered>
          <thead>
            <tr>
              <th>
                Français
              </th>
              <th>
                Neerlandais
              </th>
              <th>
                OVT
              </th>
              <th>
                Participe Passé
              </th>
              <th>
                Submit
              </th>
            </tr>
          </thead>
          <Row keyRow={this.state.key} random={this.state.random} tp = {this.state.tp}/>
        </Table>
      </div>
    )
  }
  /* componentDidMount () {
    this.random()
  } */
}

export default App
