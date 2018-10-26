import React, { Component } from 'react';
import * as d3 from 'd3'
import { Container } from '../lib'

const config = {
  width: 1000,
  height: 200,
  padding: {
    top: 10,
    right: 10,
    left: 50,
    bottom: 30
  },
  xAxis: {
    type: 'category',
    getter: d => d.type
  },
  yAxis: {
    type: 'value',
    getter: d => d.value
  }
}

class App extends Component {
  componentDidMount = () => {
    const target = d3.select(this.graph)
    const container = new Container(target, config)
    container.render([{
      type: 'a',
      value: 100
    }, {
      type: 'b',
      value: 200
    }, {
      type: 'c',
      value: 150
    }])
  }
  render() {
    return (
      <div>
        <h2>默认配置，坐标轴为category, value</h2>
        <svg width="1000" height="200" ref={graph => (this.graph = graph)}></svg>
      </div>
    );
  }
}

export default App;
