import * as d3 from 'd3'
import { transformPosition } from '../utils';

export default class Axis {
  constructor(target, config) {
    this.target = target
    this.config = config
    this.render()
  }
  customLineStyle (axis) {
    const { type, line = {}, text = {} } = this.config

    const { styles: lineStyles = {} } = line
    const { styles: textStyles = {} } = text

    return g => {
      g.call(axis)
      g.select('path').style('stroke', lineStyles.color)
        .classed(`axis-${type}-line`, true)
        .style(lineStyles)
      g.selectAll('.tick text').style('stroke', textStyles.color)
        .classed(`axis-${type}-text`, true)
        .style(textStyles)
    }
  }
  renderLine () {
    const { width, height, type, scale, line, text } = this.config
    console.log(this.config)

    const { ticks, styles: lineStyles } = line
    const axisFn = type === 'x' ? d3.axisBottom : d3.axisLeft
    const transfrom = type === 'x' ? transformPosition(0, height) : ''

    const axis = axisFn(scale)
      .tickSize(ticks.size)
      .tickFormat(text.formatter)
      .ticks(ticks.num)
      .tickPadding(ticks.padding)

    this.target.append('g')
      .classed('axis-' + type, true)
      .attr('transform', transfrom)
      .call(this.customLineStyle(axis))

    function customYAixs (g) {
      
    }
  }
  renderSplit () {

  }
  render () {
    this.renderLine()
  }
}