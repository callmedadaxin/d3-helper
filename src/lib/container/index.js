import React, { PureComponent, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { transformPosition, filterReactChildren } from '../utils';
import { Group } from '@vx/group'
import * as d3 from 'd3'

export default class Container extends PureComponent {
  state = {
    scaleX: null,
    scaleY: null
  }
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
  setSingleScale = (type, scale) => {
    this.setState({
      [`scale${type.toUpperCase()}`]: scale
    })
  }
  filterChildren (flag, props, show = true) {
    const { children } = this.props
    return show
      ? filterReactChildren(children, flag).map(child => cloneElement(child, props))
      : null
  }
  render() {
    const { width, height, padding, data, x, y, scaleX, scaleY, children } = this.props
    const size = this.getContainerSize()
    // const xScale = scaleX({
    //   rangeRound: [0, size.width],
    //   domain: data.map(x)
    // });
    // const yScale = scaleY({
    //   rangeRound: [size.height, 0],
    //   domain: [0, d3.max(data, y)]
    // });

    // const props = {
    //   ...size,
    //   data,
    //   xScale,
    //   yScale
    // }
    // const axis = this.filterChildren('axis', props)
    // const graph = this.filterChildren(undefined, props)

    return (
      <div>
        <svg width={width} height={height} ref={target => (this.target = target)}>
          <Group top={padding.top} left={padding.left}>
            {
              children(size)
            }
            {/* {axis}
            {graph} */}
          </Group>
        </svg>
      </div>
    )
  }
}
