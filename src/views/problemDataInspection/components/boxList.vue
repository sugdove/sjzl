<template>
  <div v-loading="loadingBox">
    <el-row :gutter="20">
      <el-col style="width:20%" v-for="(item,index) in boxData" :key="index">
        <div class="box" :style="{background:item.background}">
          <div class="box-content">
            <div class="valContent">
              <div class="title">{{item.label}}</div>
              <div class="content">{{item.value}}</div>
            </div>
            <!-- <div class="timeContent">
              <span>{{item.time}}</span>
            </div> -->
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getDetailBox } from '@/api/problemDataInspection.js'
export default {
  data () {
    return {
      boxData: [
        {
          label: '累计数据问题量',
          value: '5682',
          time: '5分钟前',
          background:'linear-gradient(180deg, rgba(30, 198, 149, 1) 0%, rgba(30, 198, 149, 1) 0%, rgba(51, 204, 204, 1) 100%, rgba(51, 204, 204, 1) 100%)'
        },
        {
          label: '累计治理问题量',
          value: '5890',
          time: '10分钟前',
          imgUrl: 'static/rule_img/testRule.png',
          background:'linear-gradient(90deg, rgba(244, 174, 149, 1) 0%, rgba(244, 174, 149, 1) 0%, rgba(226, 113, 140, 1) 100%, rgba(226, 113, 140, 1) 100%)'

        },
        {
          label: '现有问题问题量',
          value: '6980',
          time: '5分钟前',
          imgUrl: 'static/rule_img/testRule.png',
          background:'linear-gradient(180deg, rgba(255, 153, 51, 1) 0%, rgba(255, 153, 51, 1) 0%, rgba(239, 203, 45, 1) 100%, rgba(239, 203, 45, 1) 100%)'
        },
        {
          label: '昨日新增问题数据量',
          value: '208',
          time: '5分钟前',
          imgUrl: 'static/rule_img/testRule.png',
          background:'linear-gradient(180deg, rgba(45, 169, 250, 1) 0%, rgba(45, 169, 250, 1) 0%, rgba(102, 204, 255, 1) 100%, rgba(102, 204, 255, 1) 100%)'
        },
        {
          label: '昨日治理数据问题量',
          value: '208',
          time: '5分钟前',
          imgUrl: 'static/rule_img/testRule.png',
          background:'#c084f7'
        },
      ],
      loadingBox:true
    }
  },
  methods: {
    getDetailBox () {
      getDetailBox().then(res => {
        const { data, code, msg } = res
        this.loadingBox = false
        if (code !== 0) {
          this.$message.error(msg)
        }
        else {
          // this.boxData[0].time = data.invalidTotal.time
          // this.boxData[1].time = data.rectification.time
          // this.boxData[2].time = data.invalid.time
          this.boxData[0].value = data.invalidTotal.number
          this.boxData[1].value = data.rectification.number
          this.boxData[2].value = data.invalid.number
          this.boxData[3].value = data.yesterdayInvalid.number
          this.boxData[4].value = data.yesterdayRectification.number
        }
      })
    }
  },
  mounted(){
    this.getDetailBox()
  }
}
</script>
<style lang="scss" scope>
.box {
  height: 120px;
  border-radius: 10px;
  // border: 1px blue solid;
  display: flex;
  color: white;
}
.box-content {
  height: 100%;
  width: 100%;
  display: flex;
  vertical-align: center;
  justify-content: center;
}
.valContent {
  width: 100%;
  text-align: center;
  .title {
    margin-top: 33px;
  }
  .content {
    font-weight: bold;
    font-size: 30px;
  }
}
.timeContent {
  width: 160px;
  margin-top: 47px;
}
.box-chart img {
  width: 50px;
  height: 50px;
}
</style>