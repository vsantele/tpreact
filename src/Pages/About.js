import React, { Component } from 'react'

class About extends Component {
  render () {
    return (
      <div className={this.props.classes.content}>
        Site créé par Victor Santelé <br/>
        Technologie utilisée:
        <ul>
          <li><a href='https://reactjs.org/' >ReactJs</a></li>
          <li><a href='https://firebase.google.com/'>Firebase</a></li>
          <li><a href='https://cloudinary.com/'>Cloudinary</a></li>
          <li><a href='https://www.netlify.com/'>Netlify</a></li>
          <li><a href='https://github.com/'>Github</a></li>
        </ul>
      </div>
    )
  }
}

export default About
