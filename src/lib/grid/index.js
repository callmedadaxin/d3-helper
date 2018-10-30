import { Grid as G, GridRows as GR, GridColumns as GC } from '@vx/grid'
import { withConfig } from '../utils'

const config = {
  stroke: '#e6e6e6'
}

export const Grid = withConfig(config)(G)
export const GridRows = withConfig(config)(GR)
export const GridColumns = withConfig(config)(GC)

