import React, { Component } from 'react';
import { Container } from '../lib'
import * as d3 from 'd3'
// import Graph from './graph'
// import { AxisBottom, AxisLeft } from '@vx/axis'
import { letterFrequency, appleStock } from '@vx/mock-data';
import { scaleBand, scaleLinear, scaleTime } from '@vx/scale'
import { Group } from '@vx/group'
import { AxisLeft, AxisBottom, AxisRight, AxisTop } from '../lib/axis'
import { Grid, GridRows } from '../lib/grid'
import { Bar, LinePath, AreaClosed } from '../lib/shape'

const x = d => new Date(d.date);
const y = d => +d.close;

const padding = {
  top: 20,
  left: 40,
  bottom: 20,
  right: 20
}
class App extends Component {
  render() {
    const data = appleStock.slice(0, 20)

    return (
      <div style={{position: 'relative'}}>
        <h2>默认配置，坐标轴为category, value</h2>
        <Container padding={padding} x={x} y={y} tooltip={(data) => <div>{String(x(data))}: {y(data)}</div>}>
          {
            ({width, height, showBasicTooltip, showLineTooltip, hideTooltip }) => {
              const xScale = scaleTime({
                rangeRound: [0, width],
                domain: d3.extent(data, x)
              })
              const yScale = scaleLinear({
                rangeRound: [height, 0],
                domain: d3.extent(data, y)
              })

              return <Group>
                <Grid width={width} height={height} xScale={xScale} yScale={yScale}/>
                <AxisBottom top={height} scale={xScale}/>
                <AxisLeft scale={yScale}/>
                {/* <Group className="bar-graph">
                  {
                    data.map(d => <Bar key={`bar-${x(d)}`} width={10}
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
                <Group className="line-graph">
                  <LinePath data={data}
                    xScale={xScale}
                    yScale={yScale}
                    x={x}
                    y={y} />
                  <AreaClosed data={data}
                    xScale={xScale}
                    yScale={yScale}
                    x={x}
                    y={y} />
                  <Bar x={0}
                    y={0}
                    width={width}
                    height={height}
                    fill="transparent"
                    data={data}
                    onMouseMove={d => e => showLineTooltip({
                      event: e,
                      data: d,
                      xScale,
                      yScale
                    })}
                    onMouseLeave={d => e => hideTooltip()}/>
                </Group>
              </Group>
            }
          }
        </Container>
      </div>
    );
  }
}

export default App
