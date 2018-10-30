import React, { Component } from 'react';
import { Container, Axis } from '../lib'
import * as d3 from 'd3'
// import Graph from './graph'
// import { AxisBottom, AxisLeft } from '@vx/axis'
import { letterFrequency } from '@vx/mock-data';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { scaleBand, scaleLinear } from '@vx/scale'
import { Group } from '@vx/group'
import { Bar } from '@vx/shape'
import { withTooltip, Tooltip } from '@vx/tooltip'

const x = d => d.letter;
const y = d => +d.frequency * 100;

@withTooltip
class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h2>默认配置，坐标轴为category, value</h2>
        <Container x={x} y={y} data={letterFrequency}>
          {
            ({width, height}) => {
              const xScale = scaleBand({
                rangeRound: [0, width],
                domain: letterFrequency.map(x)
              })
              const yScale = scaleLinear({
                rangeRound: [height, 0],
                domain: [0, d3.max(letterFrequency, y)]
              })

              console.log(xScale)

              return <Group>
                <AxisBottom top={height} left={0} scale={xScale}/>
                <AxisLeft top={0} left={0} scale={yScale}/>
                <Group className="graph">
                  {
                    letterFrequency.map(d => <Bar key={`bar-${x(d)}`} width={10}
                      height={height - yScale(y(d))}
                      data={d}
                      x={xScale(x(d))}
                      y={yScale(y(d))}
                    />)
                  }
                </Group>
              </Group>
            }
          }
        </Container>
      </div>
    );
  }
}

export default App;
