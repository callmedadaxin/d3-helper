import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTooltip, Tooltip } from '../tooltip'
import { localPoint } from '@vx/event';
import { Group } from '@vx/group'
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
    const { showTooltip, x } = this.props
    const { x: posX } = localPoint(event)
    const x0 = xScale.invert(posX)
    const bisect = bisector(x).left
    const index = bisect(data, x0, 1)
    const d0 = data[index - 1];

    showTooltip({
      tooltipData: d0,
      tooltipLeft: x + 10,
      tooltipTop: 20,
    });
  }
  showBasicTooltip = ({event, data}) => {
    const { showTooltip } = this.props
    const { x, y } = localPoint(event)
    showTooltip({
      tooltipTop: y,
      tooltipLeft: x + 10,
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
              hideTooltip
            })}
          </Group>
        </svg>
        {
          tooltipData
            ? <Tooltip
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
            >
              {tooltip && tooltip(tooltipData)}
            </Tooltip>
            : ''
        }
      </div>
      
    )
  }
}

export default withTooltip(Container)
