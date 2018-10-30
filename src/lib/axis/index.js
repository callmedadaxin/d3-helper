import { AxisLeft as Left, AxisBottom as Bottom, AxisTop as Top, AxisRight as Right } from '@vx/axis'
import { withConfig } from '../utils'

// 基础颜色
const basicColor = '#e6e6e6'
const textColor = '#999'

const config = {
  stroke: basicColor,
  tickStroke: basicColor,
  tickLength: 4,
  hideTicks: true
}

const textConfig = {
  fill: textColor,
  fontFamily: 'Arial',
  fontSize: 12
}

export const AxisLeft = withConfig({
  ...config,
  tickLabelProps: ({ tick, index }) => ({
    dx: -2,
    dy: 4,
    ...textConfig,
    textAnchor: 'end'
  })
})(Left)

export const AxisBottom = withConfig({
  ...config,
  tickLabelProps: ({ tick, index }) => ({
    dx: 0,
    dy: 0,
    ...textConfig,
    textAnchor: 'middle'
  })
})(Bottom)

export const AxisTop = withConfig({
  ...config,
  tickLabelProps: ({ tick, index }) => ({
    dx: 0,
    dy: -2,
    ...textConfig,
    textAnchor: 'middle'
  })
})(Top)

export const AxisRight = withConfig({
  ...config,
  tickLabelProps: ({ tick, index }) => ({
    dx: 2,
    dy: 4,
    ...textConfig,
    textAnchor: 'start'
  })
})(Right)
