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
    getter: d => d.type,
    line: {
      show: false
    },
    splitLine: {
      show: false
    },
    text: {
      formatter: d => d + '类',
      styles: {
        color: 'red'
      }
    }
  },
  yAxis: {
    type: 'value',
    getter: d => d.value,
    line: {
      show: false,
      ticks: {
        num: 4
      }
    },
    text: {
      formatter: d => Number(d).toFixed(0) + '%'
    }
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
        <h2>格式化样式， 只有splitLine</h2>
        <svg width="1000" height="200" ref={graph => (this.graph = graph)}></svg>
      </div>
    );
  }
}

export default App;
