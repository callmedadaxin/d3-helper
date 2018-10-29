import React, { PureComponent, cloneElement } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { transformPosition, deepMerge } from '../utils';

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
    height: 100,
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
  render() {
    const { width, height, padding, data, children } = this.props
    const size = this.getContainerSize()
    const containerTransform = transformPosition(padding.left, padding.top)
    return (
      <div>
        <svg width={width} height={height} ref={target => (this.target = target)}>
          <g className="svg-container" transform={containerTransform}>
          {
            React.Children.map(children, child => cloneElement(child, {
              ...size,
              data: data,
              setSingleScale: this.setSingleScale
            }))
          }
          </g>
        </svg>
      </div>
    )
  }
}


// export default class Container {
//   constructor (target, config) {
//     this.renderContainer ()
//     this.scale = this.getScale()
//   }
  
//   render (data) {
//     const { xAxis, yAxis } = this.config
//     const xScale = this.getResultScaleByValue('x', xAxis, data)
//     const yScale = this.getResultScaleByValue('y', yAxis, data)

//     const x = new Axis(this.wrap, xAxis, {
//       type: 'x',
//       scale: xScale,
//       height: this.height,
//       width: this.width,
//       data
//     })
//     const y = new Axis(this.wrap, yAxis, {
//       type: 'y',
//       scale: yScale,
//       height: this.height,
//       width: this.width,
//       data
//     })
//     return {
//       width: this.width,
//       height: this.height,
//       xScale,
//       yScale
//     }
//   }
// }