import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withTooltip, Tooltip } from '../tooltip'
import { localPoint } from '@vx/event';
import { Group } from '@vx/group'
import { Line } from '../shape'
import { bisector } from 'd3'

class Container extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.object
  }
  static defaultProps = {
    width: 1000,
    height: 200,
    padding: {
      top: 20,
      right: 20,
      left: 20,
      bottom: 20
    }
  }
  showLineTooltip = ({event, data, xScale}) => {
    const { showTooltip, x, padding } = this.props
    const { x: posX } = localPoint(event)
    const x0 = xScale.invert(posX)
    const bisect = bisector(x).left
    const index = bisect(data, x0)
    const d0 = data[index - 1];

    this.hasLine = true

    showTooltip({
      tooltipData: d0,
      tooltipLeft: posX - padding.left,
      tooltipTop: 20,
    });
  }
  showBasicTooltip = ({event, data}) => {
    const { showTooltip, padding } = this.props
    const { x, y } = localPoint(event)

    this.hasLine = false

    showTooltip({
      tooltipTop: y,
      tooltipLeft: x - padding.left,
      tooltipData: data
    })
  }
  /**
   * 获取去除边界后容器的宽高，以给坐标轴等留出距离
   */
  getContainerSize () {
    const { width, height, padding } = this.props

    return {
      width:  width - padding.left - padding.right,
      height: height - padding.top - padding.bottom
    }
  }
  render() {
    const { width, height, padding, tooltip,
      hideTooltip, tooltipData, tooltipTop, tooltipLeft,
      children } = this.props
    const size = this.getContainerSize()
    return (
      <div>
        <svg width={width} height={height}>
          <Group top={padding.top} left={padding.left}>
            {children({
              ...size,
              showBasicTooltip: this.showBasicTooltip,
              showLineTooltip: this.showLineTooltip,
              hideTooltip,
              tooltipData,
              tooltipTop,
              tooltipLeft
            })}
            {
              tooltipData && this.hasLine
                ? <Line
                  from={{ x: tooltipLeft - 1, y: 0 }}
                  to={{ x: tooltipLeft - 1, y: height }}
                />
                : ''
            }
          </Group>
        </svg>
        {
          tooltipData
            ? <Tooltip
              top={tooltipTop}
              left={tooltipLeft + 10 + padding.left}
            >
              <Fragment>
                {tooltip && tooltip(tooltipData)}
              </Fragment>
            </Tooltip>
            : ''
        }
      </div>
      
    )
  }
}

export default withTooltip(Container)
