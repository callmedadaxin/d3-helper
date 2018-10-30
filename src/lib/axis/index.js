import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { transformPosition, deepMerge, tickValues } from '../utils';
// import baseConfig from './config'
import { AxisLeft, AxisBottom } from '@vx/axis'

export default class index extends PureComponent {
  static elementType = 'axis'
  static propTypes = {
    /** 坐标轴位置，x轴还是y轴 */
    position: PropTypes.oneOf(['x', 'y']),
    /** 坐标轴类型，对应于不同的scale */
    type: PropTypes.oneOf(['value', 'time', 'category']),
    /** 取值方法, 用于获取数据中的值 如: d => d.type */
    getter: PropTypes.func,
    config: PropTypes.object
  }
  static defaultProps = {
    position: 'x',
    type: 'value'
  }
  // constructor({config}) {
  //   super()
  //   // this.config = deepMerge(baseConfig, config)
  // }
  // componentDidMount = () => {
  //   const scale = this.getResultScale()
  //   this.renderLine(scale)
  //   this.renderSplit(scale)
  //   this.props.setSingleScale(this.props.position, scale)
  // }
  // getTickValues (tickNum) {
  //   const { ticks } = this.config
  //   const { type, data, getter } = this.props
  //   const resultTicks = tickNum || ticks.num

  //   if (type === 'category' || resultTicks === null) {
  //     return null
  //   }
  //   return tickValues(resultTicks, d3.extent(data, getter), getter)
  // }
  // /**
  //  * 格式化坐标轴样式
  //  */
  // customLineStyle (axis) {
  //   const { line, text } = this.config
  //   const { position } = this.props

  //   return g => {
  //     g.call(axis)

  //     if (line.show) {
  //       g.select('path').classed(`axis-${position}-line`, true)
  //     } else {
  //       g.select('path').remove()
  //       g.selectAll('.tick line').remove()
  //     }
      
  //     if (text.show) {
  //       g.selectAll('.tick text').classed(`axis-${position}-text`, true)
  //     } else {
  //       g.selectAll('.tick text').remove()
  //     }
  //   }
  // }
  // /**
  //  * 格式化坐标轴分割线样式
  //  */
  // customSplitlineStyle (axis) {
  //   const { line } = this.config
  //   const { type } = this.props

  //   return g => {
  //     g.call(axis)
  //     g.select('path').remove()
  //     g.selectAll('.tick text').remove()
  //     g.selectAll('.tick line')
  //       .classed('split-line', true)
      
  //     // 单独对category做处理
  //     if (type !== 'category' && line.show) {
  //       g.select('.tick:last-of-type line').remove()
  //     }
  //   }
  // }
  // renderLine (scale) {
  //   const { text, ticks } = this.config
  //   const { position } = this.props
  //   const axisFn = position === 'x' ? d3.axisBottom : d3.axisLeft

  //   const axis = axisFn(scale)
  //     .tickSize(ticks.show ? ticks.size : 0)
  //     .tickFormat(text.formatter)
  //     .tickValues(this.getTickValues(ticks.num))
  //     .tickPadding(ticks.padding)

  //   d3.select(this.axis)
  //     .call(this.customLineStyle(axis))
  // }
  // renderSplit (scale) {
  //   const { ticks, show } = this.config.splitLine

  //   if (!show) return

  //   const { width, height, position } = this.props
  //   const isX = position === 'x'

  //   const axisFn = isX ? d3.axisBottom : d3.axisLeft

  //   const axis = axisFn(scale)
  //     .tickSize(isX ? height : width)
  //     .tickValues(this.getTickValues(ticks))

  //   d3.select(this.split).call(this.customSplitlineStyle(axis))
  // }
  render() {
    const { type, width, height, xScale, yScale } = this.props
    const isX = type === 'x'
    const Axis = isX ? AxisBottom : AxisLeft
    return (
      <Fragment>
        <Axis scale={isX ? xScale : yScale}
          top={isX ? height : 0}
          left={0}
          label=""/>
        {/* <g ref={axis => (this.axis = axis)}
          transform={transfrom}
          className={`axis-${position}`} />
        <g ref={axis => (this.split = axis)}
          transform={transfromSplit}
          className={`axis-${position}-split`} /> */}
      </Fragment>
    )
  }
}