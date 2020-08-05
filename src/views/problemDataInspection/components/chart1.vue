<template>
  <div :id="id" :style="chartStyle" v-loading="loadingChart">
  </div>
</template>
<script>
import { getChart1 } from "@/api/problemDataInspection.js"
export default {
  props: {
    id: {
      type: String,
      default: 'chart1'
    },
    chartStyle: {
      type: Object,
      default: () => {
        return { height: '400px', width: '100%' }
      }
    }
  },
  data () {
    return {
      option: {
        title: {
          text: '数据问题统计图',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        color: ["#1cc59c", "#fcdb5b","rgb(60, 141, 188)","rgb(45, 169, 250)"],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '30px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // data: ['接处警系统', '高层建筑系统', '被装管理系统', '警务管理系统', '机关管理系统', '火灾管理系统', '接处警系统']
          data:[]
        },
        legend: {
          // data: ["数据置空", "填报错误"],
          data:[],
          bottom: '0px'
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: "数据置空",
          // data: [120, 200, 150, 80, 70, 110, 130],
          data:[],
          type: 'bar',
        },
        {
          name: "填报错误",
          // data: [120, 200, 150, 80, 70, 110, 130],
          data:[],
          type: 'bar',
        }
        ]
      },
      chart: null,
      loadingChart:true
    }
  },
  methods: {
    // 获取chart数据
    getChart1 () {
      getChart1().then(res => {
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
          const arr = []
           Object.values(data).forEach(el=>{
             for(let key in el){
                arr.push(key)
             }
          })
          this.option.legend.data = Array.from(new Set(arr))
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
        console.log(key,'key')
        console.log(obj,'obj')
        const resObj = {
          name:key,
          data:obj[key],
          type:'bar'
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
    this.getChart1()
  }
}
</script>