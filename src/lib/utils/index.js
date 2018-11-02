import React from 'react'

// 固定展示轴的内容
export const tickValues = (num, range) => {
  const min = +range[0]
  const max = +range[1]
  const n = (max - min) / (num - 1)
  const result = []
  const map = range[0] instanceof Date ? d => new Date(d) : d => d
  for (let i = 1; i < num - 1; i++) {
    result.push(min + i * n)
  }
  return [min, ...result, max].map(map)
}

export const withConfig = config => (WrappedComponent) => (props) => {
  return <WrappedComponent {...config} {...props}/>
}
