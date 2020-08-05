<template>
  <div>
    <!-- <top-index></top-index>
      <nav-index></nav-index> -->
      <menhu-top></menhu-top>
    <!-- <div style="width: 100%;
    color: #ef9c20;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 150px;">
      头部预留...
    </div> -->
    <el-row>
      <el-col :offset="2" span="3">
        <div style="font-family: 'Arial-BoldMT', 'Arial Bold', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    text-align: left;
    color: rgb(188, 188, 188);
    display: flex;
    align-items: center;
    height: 56px;">
          数据治理<img src="@/assets/images/home.png" alt="" style="width: 15px;
    height: 15px;
    margin-left: 3px;">
        </div>
     <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      >
      <el-menu-item index="1" @click.native="active = '1'">
        <span slot="title">数据治理首页</span>
      </el-menu-item>
      <el-menu-item index="2"  @click.native="active = '2'">
        <span slot="title">问题数据列表</span>
      </el-menu-item>
      <!-- <el-menu-item index="3"  @click.native="active = '3'">
        <span slot="title">全文检索</span>
      </el-menu-item> -->
    </el-menu>
    </el-col>
    <el-col :span="17">
          <dashbord v-if=" active==='1' "></dashbord>
          <myProblem v-if=" active==='2'" ></myProblem>
          <!-- <textSearch v-if=" active==='3'"></textSearch> -->
    </el-col>
    </el-row>
  </div>
</template>  
<script>
import Cookies from 'js-cookie'
import TopIndex from '@/components/menhuHeader/TopIndex'
import NavIndex from '@/components/menhuHeader/NavIndex'
import menhuTop from '@/components/menhuHeader/index'
import dashbord from './problemDataInspection/dashbord'
import myProblem from './problemDataInspection/index'
import textSearch from './textSearch/index'
export default {
  components:{
    dashbord,
    myProblem,
    TopIndex,
    NavIndex,
    textSearch,
    menhuTop
  },
  data(){
    return{
    active:'1',
    }
  },
  methods:{
    getIframe(){
      return `${window.location.origin}/header/?token=${Cookies.get('Authorization')}`
    }
  }
}
</script>
<style >
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    border-right: none;
  }
  .pager-wrapper{
    float:right
  }
</style>