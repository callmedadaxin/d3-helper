import _ from 'lodash'

export const transformPosition = (x, y) => {
  return `translate(${x}, ${y})`
}

export const isFunction = item => typeof item === 'function'

export const isNumber = item => typeof item === 'number'

export const deepMerge = (base, next) => {
  return _.mergeWith({}, base, next, mergeCustomizer)
}

function mergeCustomizer (res, obj, src, a, b, c) {
  if (_.isObject(src)) {
    return deepMerge(obj, src)
  }
}

// 固定展示轴的内容
export const tickValues = (num, range) => {
  const min = range[0]
  const max = range[1]
  const n = (max - min) / (num - 1)
  const result = []
  for (let i = 1; i < num; i++) {
    result.push(min + i * n)
  }
  return [min, ...result, max]
}
