# d3-helper
d3图形库，在[vx](https://github.com/hshoff/vx)上的二次封装

***更多的是对于图形库复用的思考***
***核心：基础图形的复用及拼接***

## Why
1. 使用d3以命令式的方式来进行图形的书写，不太便于图形的复用，往往需要通过函数抽象以及一大堆参数来重用
2. 使用d3来进行图形的渲染已经非常方便，再抽象成echart那种根据配置进行渲染的方式没有太大必要，费时费力且效果差不多。
3. vx以单元拼接的方式来进行书写，非常满足我们的要求
4. vx默认样式并不符合我们的要求，重复的设置各种props时，跟我们使用d3的过程其实类似，依旧复杂
5. 我们需要一种可变的复用单元。

## API
其他请直接从@vx中引用

- Container
- AxisLeft, AxisBottom, AxisTop, AxisRight
- Grid, GridRows, GridColumns
- Line, Bar, LinePath, AreaClosed
- withTooltip, Tooltip
- tickValues, withConfig
- Group
- scaleBand, scalePoint, scaleLinear, scaleTime, scaleLog, scalePower

## 使用方式
vx非常巧妙的定义了各种图形单元，支持以声明式使用图形单元进行拼接，
我们对vx的默认样式进行了重置，并且添加了Container元素，用于定义图形容器

``` js
npm i d3-vx-helper
```

``` js
import { appleStock } from '@vx/mock-data'
import { scaleLinear, scaleTime } from '@vx/scale'

import { Group } from 'lib/Group'
import { AxisLeft, AxisBottom } from 'lib/axis'
import { Grid } from 'lib/grid'
import { Bar, LinePath, AreaClosed } from 'lib/shape'

// 定义getter
const x = d => new Date(d.date);
const y = d => +d.close;

// 定义容器配置
const padding = {
  top: 20,
  left: 40,
  bottom: 20,
  right: 20
}

export default class LineGraph {
  render () {
    return (
      <Container width={1000} height={200}
        padding={padding}
        x={x} y={y}>
          {
            ({width, height }) => {
              // 根据数据定义x,y轴的scale
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
                <AreaClosed data={data}
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
```

## withConfig
很多时候，我们更希望重用自定义单元，比如我的系统里有两种通用的折线样式，提供该方法进行封装，
我们可以在基础单元上不断的进行上层封装，以便灵活快速的使用。

``` js
import { LinePath } from 'lib/shape'
import { withConfig } from 'lib/util'

export const DashedRedLine = withConfig({
  stroke: 'red',
  strokeWidth: 1,
  strokeDasharray
})(LinePath)

export const BoldBlueLine = withConfig({
  stroke: 'green',
  strokeWidth: 4
})(LinePath)
```

## tooltip
在进行tooltip提示时，往往会比较吃力，我们也在配合vx/shape进行统新的封装,
提供两种tooltip类型，baseTooltip, lineTooltip

``` js
return <Container padding={padding}
  x={x} y={y}
  // 定义tooltip格式
  tooltip={(data) => <div>{String(x(data))}: {y(data)}</div>}>
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
        <Group className="line-graph">
          <AreaClosed data={data}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={y} />
          // 定义整个图形触发区间
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
```

## withTooltip
对于复杂的tooltip，或者多个tooltip,可以用withTooltip装饰器来实现:

```
@withTooltip
class Area {
  render () {
    const {
      showTooltip,
      hideTooltip,
      tooltipData,
      tooltipTop,
      tooltipLeft
    } = this.props

    return <div>
      <Graph>
      <Tooltip ...>
    <div>
  }
}
```

## tickValues
我们使用axis.ticks设置坐标的刻度是，往往产生的刻度数量是不准确的。
我们可以使用axis.tickValues使用指定的数组作为刻度。在这里我们提供一个方法，来自动获取精准数量的指定数组。

``` js
import { tickValues } from 'lib/util'

<AxisBottom tickValues={tickValues(4, [0, d3.max(data)])}>
```
