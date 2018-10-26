export default {
  type: 'value',
  getter: d => d,
  show: true,
  line: {
    show: true,
    ticks: {
      show: true,
      num: null,
      size: 3,
      padding: 3
    },
    styles: {
      color: null,
    }
  },
  splitLine: {
    show: true,
    ticks: null,
    styles: {
      color: '#ccc'
    }
  },
  text: {
    show: true,
    formatter: d => d,
    styles: {
      color: null,
      fontSize: null
    }
  }
}