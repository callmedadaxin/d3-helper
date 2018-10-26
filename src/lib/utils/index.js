export const transformPosition = (x, y) => {
  return `translate(${x}, ${y})`
}

export const isFunction = item => typeof item === 'function'

export const isNumber = item => typeof item === 'number'