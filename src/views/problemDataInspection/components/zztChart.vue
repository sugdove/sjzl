<template>
  <div class="wraps">
    <div class="tit">
      <div>
        <span></span>
        问题单位对比
      </div>
      <div>
        <el-select v-model="value" placeholder="请选择" size='mini'>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="tit1">
      <span></span>
      问题数据分类
    </div>
    <div class="box">
      <div class="line"></div>
      <div class="line1"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
     data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
  mounted() {
    this.getZzt();
    this.getPie();
  },
  methods: {
    getZzt() {
      var dom = document.getElementsByClassName("line")[0];
      var echartCon = echarts.init(dom);
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          max: 400,
        },
        yAxis: {
          type: "category",
          data: [
            "单位名称1",
            "单位名称2",
            "单位名称3",
            "单位名称4",
            "单位名称15",
          ],
        },
        series: [
          {
            name: "A级门店",
            type: "bar",
            stack: "总量",
            barWidth: 30,
            itemStyle: {
              normal: {
                color: "#06d3cd",
                barBorderRadius: [20, 20, 20, 20],
              },
            },
            label: {
              normal: {
                show: true,
                position: "insideRight",
              },
            },
            z: 10,
            data: [320, 302, 301, 330, 320],
          },

          {
            // 灰色背景柱状图
            type: "bar",
            barGap: "-100%",
            barWidth: 30,
            itemStyle: {
              normal: {
                color: "#ccc",
                barBorderRadius: [20, 20, 20, 20],
              },
            },
            z: -10,
            data: ["1000", "1000", "1000", "1000", "1000"],
          },
        ],
      };
      echartCon.setOption(option, true);
    },

    getPie() {
      var dom = document.getElementsByClassName("line1")[0];
      var echartCon = echarts.init(dom);
      var option = {
        title: {
          //   text: "某站点用户访问来源",
          //   subtext: "纯属虚构",
          //   left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "right",
          top: "bottom",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              {
                value: 335,
                name: "直接访问",
                itemStyle: {
                  color: "#ffa800",
                },
              },
              {
                value: 310,
                name: "邮件营销",
                itemStyle: {
                  color: "#b250ff",
                },
              },
              {
                value: 234,
                name: "联盟广告",
                itemStyle: {
                  color: "#4f9aff",
                },
              },
              {
                value: 135,
                name: "视频广告",
                itemStyle: {
                  color: "#4bf3ff",
                },
              },
              {
                value: 1548,
                name: "搜索引擎",
                itemStyle: {
                  color: "#ee6378",
                },
              },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      echartCon.setOption(option, true);
    },
  },
};
</script>
<style lang="scss" scoped>
.wraps {
  width: 100%;
  height: 400px;
  margin-top: 20px;
  margin-bottom: 50px;
  .box {
    width: 100%;
    height: 400px;
    display: flex;
  }
  .line {
    flex: 1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding: 10px;
  }
  .line1 {
    flex: 1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    margin-left: 20px;
    padding: 10px;
  }
  .tit {
    width: 50%;
    height: 40px;
    line-height: 40px;
    float: left;
    padding-left: 10px;
    padding-right:30px;
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
        top:2px;
      }
    }
  }
  .tit1 {
    width: 50%;
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
        top:2px;
    }
  }
}
</style>