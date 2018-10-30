import React from 'react'

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

export const withConfig = config => (WrappedComponent) => (props) => {
  return <WrappedComponent {...config} {...props}/>
}
