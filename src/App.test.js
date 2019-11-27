import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  if (div.hasChildNodes()) {
    ReactDOM.hydrate(<BrowserRouter><App /></BrowserRouter>, div)
  } else {
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div)
  }
});
