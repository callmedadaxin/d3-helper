import * as d3 from 'd3'
import { transformPosition, deepMerge } from '../utils';
import Axis from '../axis'
import baseConfig from './config'

export default class Container {
  constructor (target, config) {
    this.target = target
    this.config = deepMerge(baseConfig, config)
    this.renderContainer ()
    this.scale = this.getScale()
  }
  /**
   * 渲染基本的wrap
   */
  renderContainer() {
    const { width, height, padding } = this.config
    this.height = height - padding.top - padding.bottom
    this.width = width - padding.left - padding.right

    this.wrap = this.target.append('g')
      .classed('svg-container', true)
      .attr('transform', transformPosition(padding.left, padding.top))
  }
  getSingleScale (axis) {
    const { type } = axis
    
    return {
      time: d3.scaleTime(),
      category: d3.scaleBand(),
      value: d3.scaleLinear()
    }[type] || d3.scaleLinear
  }
  getScale () {
    const { xAxis, yAxis } = this.config
    
    return {
      x: this.getSingleScale(xAxis).range([0, this.width]),
      y: this.getSingleScale(yAxis).range([0, this.height])
    }
  }
  /**
   * 根据传入的值，来确定具体的scale,以备后续使用
   * @param {*} scale 
   * @param {*} axis 
   * @param {*} value 
   */
  getResultScaleByValue (scaleType, axis, datas) {
    const { type, getter } = axis
    const items = datas.map(getter)
    const { scale } = this

    if (['time', 'value'].includes(type)) {
      const min = d3.min(items)
      const max = d3.max(items)
      const domain = scaleType === 'x' ? [min, max] : [max, min]
      return scale[scaleType].domain(domain)
    } else {
      return scale[scaleType].domain(items)
    }
  }
  render (data) {
    const { xAxis, yAxis } = this.config
    const xScale = this.getResultScaleByValue('x', xAxis, data)
    const yScale = this.getResultScaleByValue('y', yAxis, data)

    const x = new Axis(this.wrap, xAxis, {
      type: 'x',
      scale: xScale,
      height: this.height,
      width: this.width,
      data
    })
    const y = new Axis(this.wrap, yAxis, {
      type: 'y',
      scale: yScale,
      height: this.height,
      width: this.width,
      data
    })
  }
}