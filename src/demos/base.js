import React, { Component } from 'react';
import { Container, Axis } from '../lib'

const data = [{
  type: 'a',
  value: 111
}, {
  type: 'b',
  value: 66
}, {
  type: 'c',
  value: 188
}]

class App extends Component {
  render() {
    return (
      <div>
        <h2>默认配置，坐标轴为category, value</h2>
        <Container data={data} height={200}>
          <Axis position="x" type="category" getter={d => d.type}/>
          <Axis position="y" type="value" getter={d => d.value}/>
        </Container>
      </div>
    );
  }
}

export default App;
