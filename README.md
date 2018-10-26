# d3-helper
d3辅助工具库，用于生成常用的坐标轴，tooltip等

## Aixs
通过配置快速生成坐标轴，可定义各种样式

### 简介
1.每个坐标轴主要有以下元素：

- line 坐标轴线
- splitLine 分割线
- text 文字标签

2.每个元素都可通过以下字段来控制

- show 显示隐藏
- styles 控制样式
- class 控制class

3.ticks可以控制每个坐标轴展示的数量
这里对d3.ticks做了改进，可以精确按照设置的梳理进行展示


### 全部配置
``` js
export default {
  width: 1000, // 图的宽度
  height: 100, // 图的高度
  padding: {  // padding, 用于给坐标轴等留出空间
    top: 20,
    right: 20,
    left: 20,
    bottom: 20
  },
  xAxis: {
    type: 'value', // 坐标轴类型，对应到d3的scale, 目前有三种： value, time, category
    getter: d => d, // 根据数据获取值的getter, 如 d => d.time
    show: true, // 是否展示
    line: { // 坐标轴线的控制
      show: true,
      ticks: { // 坐标轴tick的控制
        show: true,
        num: null,
        size: 3,
        padding: 3
      },
      styles: {
        color: null,
      }
    },
    splitLine: { // 坐标轴分割线的控制
      show: true,
      ticks: null,
      styles: {
        color: '#ccc'
      }
    },
    text: { // 坐标轴标签文字的控制
      show: true,
      formatter: d => d,
      styles: {
        color: null,
        fontSize: null
      }
    }
  },
  xAxis: {}
}
```