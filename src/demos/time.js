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
    type: 'time',
    getter: d => d.time,
    line: {
      ticks: {
        num: 3
      }
    },
    text: {
      formatter: d => new Date(d).getDate() + '日'
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    getter: d => d.value,
    splitLine: {
      show: false
    }
  }
}

class App extends Component {
  componentDidMount = () => {
    const target = d3.select(this.graph)
    const container = new Container(target, config)
    const dayTime = 24 * 3600 * 1000
    container.render([{
      time: Date.now() - dayTime * 3,
      value: 100
    }, {
      time: Date.now() - dayTime * 2,
      value: 100
    }, {
      time: Date.now() - dayTime,
      value: 200
    }, {
      type: Date.now(),
      value: 150
    }])
  }
  render() {
    return (
      <div>
        <h2>坐标轴为时间</h2>
        <svg width="1000" height="200" ref={graph => (this.graph = graph)}></svg>
      </div>
    );
  }
}

export default App;
