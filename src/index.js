/*eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import {render} from 'react-snapshot'
import './index.css'
import App from './App'
import 'raf/polyfill';
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Log, VisualizerProvider, resetInstanceIdCounters } from 'react-lifecycle-visualizer';
/*eslint-enable */

const rootElement = document.getElementById('root')
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<BrowserRouter><App /></BrowserRouter>, rootElement)
} else {
  render(<BrowserRouter><App /></BrowserRouter>, rootElement)
}
// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React, { groupByComponent: true, collapseComponentGroups: false });
// }
// resetInstanceIdCounters()
// render(
//   <BrowserRouter><App /></BrowserRouter>,
//   document.getElementById('root')
// );
registerServiceWorker()
