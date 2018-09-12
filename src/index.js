import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('root')
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<BrowserRouter><App /></BrowserRouter>, rootElement)
} else {
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, rootElement)
}
registerServiceWorker()
