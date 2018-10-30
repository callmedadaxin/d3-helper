import React, { PureComponent } from 'react'
import * as d3 from 'd3'

export default class Graph extends PureComponent {
  componentDidMount = () => {
    this.renderGraph()
  }
  renderGraph () {
    const { data, height, scaleX, scaleY } = this.props

    this.wrap.selectAll(`g.bar`)
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bar')
      .append('rect')
      .attr('class', 'bar-rect')

    this.wrap.selectAll(`g.bar`)
      .data(data)
      .attr("transform", (d) => `translate(${scaleX(d.type || d.time)}, ${scaleY(d.value)})`)
      .select('rect')
      .style('height', d => {
        return height - scaleY(d.value)
      })
      .style('width', 10)

    this.wrap.selectAll(`g.bar`)
      .data(data)
      .exit()
      .remove()
  }
  render() {
    return (
      <g ref={wrap => (this.wrap = d3.select(wrap))} className="graph" />
    )
  }
}
