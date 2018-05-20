import React from 'react';
import  ReactDOM  from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import App from './Components/appComponent';

class BaseComponent extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  }
}


ReactDOM.render(<BaseComponent />, document.getElementById('main'));