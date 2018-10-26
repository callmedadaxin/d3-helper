# d3-helper
d3辅助工具库，用于生成常用的坐标轴，tooltip等

## Why
在使用d3进行数据可视化操作时，已经非常方便了，直接使用d3的各种shape可直接生成折线，柱形图等等等等。直接使用d3操作，既方便又灵活。
但是我们往往需要重复几个类似的动作：

- 渲染容器
- 计算横纵坐标的scale
- 渲染坐标轴,并对其进行样式，格式调整
- 添加tooltip事件及样式

对于这些重复且相对复杂的动作，我们更希望对其进行一键输出，让我们的更专注与图形上去，因此就有了这个工具库。
工具库后续还会不断的进行扩展。

## demos
[部分案例代码](https://github.com/callmedadaxin/d3-helper/tree/master/src/demos)

## Container
通过配置快速生成容器及坐标轴坐标轴，可定义各种样式

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

### 使用方式
``` js
componentDidMount = () => {
  const target = d3.select(this.graph)
  const container = new Container(target, config)

  // 通过render渲染容器，并可获取容器内部的数据结果
  const {
    width, // 容器内部宽高，计算数据对应的长度时，请用此值进行计算
    height,
    xScale, // 数据的scale, 用于计算宽高
    yScale
  } = container.render([{
    type: 'a',
    value: 100
  }, {
    type: 'b',
    value: 200
  }, {
    type: 'c',
    value: 150
  }])
}
```

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