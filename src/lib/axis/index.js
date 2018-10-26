import * as d3 from 'd3'
import { transformPosition, deepMerge, tickValues } from '../utils';
import baseConfig from './config'

export default class Axis {
  constructor(target, config, others) {
    this.target = target
    this.config = deepMerge(baseConfig, config)
    this.others = others

    this.render()
  }
  getTickValues (tickNum) {
    const { type, getter, line } = this.config
    const { data } = this.others
    const ticks = tickNum || line.ticks.num

    if (type === 'category' || ticks === null) {
      return null
    }
    return tickValues(ticks, d3.extent(data, getter), getter)
  }
  customLineStyle (axis) {
    const { line, text } = this.config
    const { type } = this.others

    const { styles: lineStyles } = line
    const { styles: textStyles } = text

    return g => {
      g.call(axis)

      if (line.show) {
        g.select('path').style('stroke', lineStyles.color)
          .classed(`axis-${type}-line`, true)
          .style(lineStyles)
      } else {
        g.select('path').remove()
        g.selectAll('.tick line').remove()
      }
      
      if (text.show) {
        g.selectAll('.tick text')
          .style('stroke', textStyles.color)
        .classed(`axis-${type}-text`, true)
      } else {
        g.selectAll('.tick text').remove()
      }
    }
  }
  renderLine () {
    const { line, text } = this.config
    const { height, type, scale } = this.others

    const { ticks } = line

    const axisFn = type === 'x' ? d3.axisBottom : d3.axisLeft
    const transfrom = type === 'x' ? transformPosition(0, height) : ''

    const axis = axisFn(scale)
      .tickSize(ticks.show ? ticks.size : 0)
      .tickFormat(text.formatter)
      .tickValues(this.getTickValues(ticks.num))
      .tickPadding(ticks.padding)

    this.target.append('g')
      .classed('axis-' + type, true)
      .attr('transform', transfrom)
      .call(this.customLineStyle(axis))
  }
  customSplitlineStyle (axis, styles) {
    const { type: axisType, line } = this.config
    const { type } = this.others

    return g => {
      g.call(axis)
      g.select('path').remove()
      g.selectAll('.tick text').remove()
      g.selectAll('.tick line')
        .style('stroke', styles.color)
        .classed(`axis-${type}-split-line`, true)
      
      // 单独对category做处理
      if (axisType !== 'category' && line.show) {
        g.select('.tick:last-of-type line').remove()
      }
    }
  }
  renderSplit () {
    const { styles, ticks } = this.config.splitLine
    const { width, height, type, scale } = this.others
    const isX = type === 'x'

    const axisFn = isX ? d3.axisBottom : d3.axisLeft
    const transfrom = isX ? '' : transformPosition(width, 0)

    const axis = axisFn(scale)
      .tickSize(isX ? height : width)
      .tickValues(this.getTickValues(ticks))

    this.target.append('g')
      .classed(`axis-${type}-split`, true)
      .attr('transform', transfrom)
      .call(this.customSplitlineStyle(axis, styles))
  }
  render () {
    const { show } = this.config

    if (show) {
      this.renderLine()
      this.config.splitLine.show && this.renderSplit()
    }
  }
}