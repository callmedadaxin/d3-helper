import React, { Component } from 'react';
import * as d3 from 'd3'
import './App.css';
import { Container } from './lib'

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
      show: true,
      ticks: {
        show: true,
        num: 3,
        size: 4,
        padding: 6
      },
      styles: {
        color: 'red'
      }
    },
    text: {
      show: true,
      formatter: d => d + '类',
      styles: {
        color: '#2d84e5',
        fontSize: 15
      }
    }
  },
  yAxis: {
    type: 'value',
    getter: d => d.value,
    line: {
      show: true,
      ticks: {
        show: true,
        size: 2,
        padding: 2
      }
    },
    text: {
      formatter: d => d
    }
  }
}

class App extends Component {
  componentDidMount = () => {
    const target = d3.select(this.graph)
    const container = new Container(target, {
      ...config
    })
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
      <svg width="1000" height="200" ref={graph => (this.graph = graph)}></svg>
    );
  }
}

export default App;
