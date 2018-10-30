import { Bar as B, LinePath as L, AreaClosed as AC, Line as Li } from '@vx/shape'
import { withConfig } from '../utils'
export { AreaStack, BarGroup, Pie  } from '@vx/shape'

export const Line = withConfig({
  stroke: '#e6e6e6'
})(Li)
export const Bar = withConfig({
  fill: '#2d84e5'
})(B)
export const LinePath = withConfig({
  stroke: '#2d84e5'
})(L)
export const AreaClosed = withConfig({
  stroke: 'none',
  fill: '#2d84e5',
  fillOpacity: 0.3
})(AC)

