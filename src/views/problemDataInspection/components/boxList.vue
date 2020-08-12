<template>
  <div v-loading="loadingBox" class="wrap">
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
          background:'linear-gradient(to right, #2ee1ed 0%, #2ee1ed 0%, #66befc 100%, #66befc 100%)'
        },
        {
          label: '累计治理问题量',
          value: '5890',
          time: '10分钟前',
          imgUrl: 'static/rule_img/testRule.png',
          background:'linear-gradient(to right, #ff748d 0%, #ff748d 0%, #ff7daf 100%, #ff7daf 100%)'

        },
        {
          label: '现有问题问题量',
          value: '6980',
          time: '5分钟前',
          imgUrl: 'static/rule_img/testRule.png',
          background:'linear-gradient(to right, #9f56cb 0%, #9f56cb 0%, #e85ad1 100%, #e85ad1 100%)'
        },
        {
          label: '昨日新增问题数据量',
          value: '208',
          time: '5分钟前',
          imgUrl: 'static/rule_img/testRule.png',
          background:'linear-gradient(to right, #e78607 0%, #e78607 0%, #fd644f 100%, #fd644f 100%)'
        },
        {
          label: '昨日治理数据问题量',
          value: '208',
          time: '5分钟前',
          imgUrl: 'static/rule_img/testRule.png',
          background:'linear-gradient(to right, #0fcf89 0%, #0fcf89 0%, #18a86b 100%, #18a86b 100%)'
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
.wrap{
  background:#fff;
  padding: 30px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
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