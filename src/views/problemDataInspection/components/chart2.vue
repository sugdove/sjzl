<template>
<div class="wraps">
    <div class="box">
      <div class="cardBox">
        <div class="tit1">
      <span></span>
      数据治理趋势（近30天）
    </div>
      <div class="line1" :id="id" :style="chartStyle" v-loading="loadingChart"></div>
      </div>
    </div>
  </div>
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
          left: 'center'
        },
        tooltip: {
          },
        legend: {
          // data: ['问题总量', '待整改', '已整改'],
          data:[],
          bottom: '0px'
        },
        grid: {
            top:"2%",
            left: "3%",
            right: "4%",
            bottom: "5%",
            containLabel: true,
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
<style lang="scss" scoped>
.wraps {
  width: 100%;
  height: 400px;
  margin-top: 20px;
  .box {
    width: 100%;
    height: 400px;
    display: flex;
  }
  .cardBox{
    background:#fff;
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
     flex-direction: column;
      width: 100%;
    height: 400px;
    display: flex;
    
  }
  .line {
    flex: 1;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding: 10px;
  }
  .line1 {
    flex: 1;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    margin-left: 20px;
    padding: 10px;
  }
  .tit {
    color:black;
    width: 100%;
    height: 40px;
    line-height: 40px;
    float: left;
    padding-left: 10px;
    padding-right: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    div {
      span {
        width: 4px;
        height: 16px;
        background: #15a1fa;
        display: inline-block;
        margin-right: 5px;
        position: relative;
        top: 2px;
      }
    }
  }
  .tit1 {
    color:black;
    width: 100%;
    height: 40px;
    line-height: 40px;
    float: left;
    padding-left: 10px;
    box-sizing: border-box;
    span {
      width: 4px;
      height: 16px;
      background: #15a1fa;
      display: inline-block;
      margin-right: 5px;
      position: relative;
      top: 2px;
    }
  }
}
</style>