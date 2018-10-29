import React, { Component} from 'react'

class Tooltip extends Component {
  render() {
    const { position, show, children, className } = this.props
    return (
      <div styleName={`tooltip ${!show ? 'hide' : ''}`}
        className={className}
        style={{
          left: position + 5
        }}>
        {children}
      </div>
    )
  }
}

const renderCustomToolTip = ({
  wrap,
  data,
  xScale,
  xFormatter = d => d,
  width,
  height,
  onShow,
  onHide
}) => {
  // hover触发区域
  const target = wrap
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'none')

  // tooltip组
  const focus = wrap.append('g')
    .style('display', 'none')

  // 展示的竖线
  const hoverline = focus.append('line')
    .attr("class", 'hover-line')
    .attr("y1", 0)
    .attr("y2", height)

  wrap.on('mouseover', () => {
    focus.style("display", "block")
  }).on("mouseout", () => {
    focus.style("display", "none")
    onHide && onHide()
  }).on("mousemove", onMouseMove, 200)

  function onMouseMove() {
    const index = getIndexByPosition({
      data,
      scale: xScale,
      position: d3.mouse(this)[0],
      formatter: xFormatter
    })
    const curData = data[index]
    const left = xScale(xFormatter(curData))
    focus.attr('transform', `translate(${left}, 0)`)
    onShow && onShow(left, curData, data)
  }
}
