import React, { Component } from 'react';
import * as d3 from 'd3'
import { Container, Axis } from '../lib'
import Graph from './graph'

const config = {
  padding: {
    top: 10,
    right: 10,
    left: 50,
    bottom: 30
  },
  xAxis: {
    ticks: {
      num: 2
    },
    text: {
      formatter: d => new Date(d).getDate() + '日'
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    getter: d => d.value,
    splitLine: {
      show: true,
      ticks: 4
    }
  }
}

class App extends Component {
  render() {
    const dayTime = 24 * 3600 * 1000
    const data = [{
      time: Date.now() - dayTime * 3,
      value: 100
    }, {
      time: Date.now() - dayTime * 2,
      value: 100
    }, {
      time: Date.now() - dayTime,
      value: 200
    }, {
      time: Date.now(),
      value: 150
    }]
    return (
      <div>
        <h2>坐标轴为时间</h2>
        <Container data={data} padding={config.padding}>
          <Axis type="time" position="x" getter={d => d.time} config={config.xAxis}/>
          <Axis type="value" range={[50, 300]} position="y" getter={d => d.value} config={config.yAxis}/>
          <Graph />
        </Container>
      </div>
    );
  }
}

export default App;
