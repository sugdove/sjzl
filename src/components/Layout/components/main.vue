<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <div class="box-item box1">
        <span class="box-item-title">
          Building
        </span>
          <i class="icon-cog icon-item"></i>
        <div class="box-item-num">
          3
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="box-item box2">
        <span class="box-item-title">
          ldle
        </span>
        <i class="icon-coffee icon-item"></i>
        <div class="box-item-num">
          5
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="box-item">
        <span class="box-item-title">
          ldle
        </span>
        <i class="icon-cog"></i>
        <div class="box-item-num">
          5
        </div>
      </div>
    </el-col>
  </el-row>


</template>
<script>
  export default {
    props:{
      agentsList:{
        type:Array,
        default:[],
      }
    },
    data(){
      return{
      }
    },
    mounted(){

    }
  }
</script>
<style scoped>
  .box-item{
    height: 150px;
    position: relative;
  }
  .box1{
    background-color:#FF9A2A;
  }
  .box2{
    background-color:#7FBC39;
  }
  .box-item-title{
    font-size: 18px;
    font-weight:bold;
    color: white;
    padding-left: 20px;
    line-height: 48px;
  }
  .box-item-num{
    font-size: 48px;
    color: white;
    position: absolute;
    right: 19px;
    bottom: 4px;
  }
  .icon-item{
    font-size: 144px;
    opacity: 0.2;
    position: absolute;
    top: 50%;
    margin-top: -72px;
    left: 50%;
    margin-left: -61.7px;
  }
</style>


