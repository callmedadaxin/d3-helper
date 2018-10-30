import React, { Component } from 'react';
import { Container } from '../lib'
import * as d3 from 'd3'
// import Graph from './graph'
// import { AxisBottom, AxisLeft } from '@vx/axis'
import { letterFrequency, appleStock } from '@vx/mock-data';
import { scaleBand, scaleLinear } from '@vx/scale'
import { Group } from '@vx/group'
import { withTooltip, Tooltip } from '@vx/tooltip'
import { AxisLeft, AxisBottom, AxisRight, AxisTop } from '../lib/axis'
import { Grid, GridRows } from '../lib/grid'
import { Bar, LinePath, AreaClosed } from '../lib/shape'

const x = d => d.letter;
const y = d => +d.frequency * 100;

// console.log(Grid)

class App extends Component {
  render() {
    return (
      <div style={{position: 'relative'}}>
        <h2>默认配置，坐标轴为category, value</h2>
        <Container x={x} y={y} tooltip={(data) => <div>{x(data)}: {y(data)}</div>}>
          {
            ({width, height, showBasicTooltip, showLineTooltip, hideTooltip }) => {
              const xScale = scaleBand({
                rangeRound: [0, width],
                domain: letterFrequency.map(x)
              })
              const yScale = scaleLinear({
                rangeRound: [height, 0],
                domain: [0, d3.max(letterFrequency, y)]
              })

              return <Group>
                <Grid width={width} height={height} xScale={xScale} yScale={yScale}/>
                {/* <GridRows width={width} scale={xScale} /> */}
                <AxisBottom top={height} scale={xScale}/>
                {/* <AxisTop scale={xScale}/> */}
                <AxisLeft scale={yScale} numTicks={2}/>
                {/* <AxisRight left={width} scale={yScale}/> */}
                {/* <Group className="graph">
                  {
                    letterFrequency.map(d => <Bar key={`bar-${x(d)}`} width={10}
                      height={height - yScale(y(d))}
                      data={d}
                      x={xScale(x(d))}
                      y={yScale(y(d))}
                      onMouseMove={d => e => showBasicTooltip({
                        event: e,
                        data: d,
                        xScale,
                        yScale
                      })}
                      onMouseLeave={d => e => hideTooltip()}
                    />)
                  }
                </Group> */}
                <LinePath data={appleStock}
                  xScale={xScale}
                  yScale={yScale}
                  x={x}
                  y={y} />
                <AreaClosed data={appleStock}
                  onMouseMove={d => e => showLineTooltip({
                    event: e,
                    data: d,
                    xScale,
                    yScale
                  })}
                  onMouseLeave={d => e => hideTooltip()}
                  xScale={xScale}
                  yScale={yScale}
                  x={x}
                  y={y} />
              </Group>
            }
          }
        </Container>
      </div>
    );
  }
}

export default App
