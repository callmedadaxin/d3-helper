import React, { Component, Fragment } from 'react';
import './App.css';
import Base from './demos/base'
import Time from './demos/time'
import Style1 from './demos/style1'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Base />
        {/* <Time /> */}
        {/* <Style1 /> */}
      </Fragment>
    );
  }
}

export default App;
