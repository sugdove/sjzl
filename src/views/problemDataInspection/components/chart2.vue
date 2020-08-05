<template>
  <div :id="id" :style="chartStyle" v-loading="loadingChart"></div>
</template>
<script>
import { getChart2 } from "@/api/problemDataInspection.js"
export default {
  props: {
    id: {
      type: String,
      default: 'chart2'
    },
    chartStyle: {
      type: Object,
      default:() => {
        return { height: '400px', width: '100%' }
      }
    }
  },
  data () {
    return {
      option: {
        color: ["rgb(45, 169, 250)", "#fcdb5b", "#1cc59c"],
        title: {
          text: '数据治理问题情况统计图',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // data: ['问题总量', '待整改', '已整改'],
          data:[],
          bottom: '0px'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '30px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
          data:[]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '问题总量',
            type: 'line',
            // data: [120, 132, 101, 134, 90, 230, 210],
            data:[]
          },
          {
            name: '待整改',
            type: 'line',
            // data: [220, 182, 191, 234, 290, 330, 310]
            data:[]
          },
          {
            name: '已整改',
            type: 'line',
            // data: [150, 232, 201, 154, 190, 330, 410]
            data:[]
          }
        ]
      },
      chart: null,
      loadingChart:true
    }
  },
  methods: {
    // 获取chart数据
    getChart2 () {
      getChart2().then(res => {
        const { code, data, msg } = res
        this.loadingChart = false
        if (res.code !== 0) {
          this.$message.error(msg)
        }
        else {
          if(JSON.stringify(data) === '{}'){
            this.chartInit()
            return false
          }
          this.option.xAxis.data = Object.keys(data)
          this.option.legend.data = Object.keys(Object.values(data)[0])
          this.option.series = this.getSeries(data)
          this.chartInit()
        }
      })
    },
    getSeries (data) {
      const obj = {}
      Object.values(data).forEach(el => {
        for (let key in el) {
          if (obj[key]) {
            obj[key].push(el[key])
          }
          else {
            obj[key] = [el[key]]
          }
        }
      })
      console.log(obj, 'obj')
      const arr = []
      for(let key in obj){
        const resObj = {
          name:key,
          data:obj[key],
          type:'line'
        }
        arr.push(resObj)
      }
      return arr
    },
    chartInit () {
      this.chart = this.$echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.option)
      window.onresize = () => {
        this.chart.resize()
      }
    }
  },
  mounted () {
    this.getChart2()
  }
}
</script>