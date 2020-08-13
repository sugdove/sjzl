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
    <el-row style="background:#f3f8f9;padding: 20px 80px 0;margin: 0 auto;">
      <div class='CatalogueList'>
        <!-- <div style="font-family: 'Arial-BoldMT', 'Arial Bold', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    text-align: left;
    background:'red'!important;
    color: #fff;
    display: flex;
    align-items: center;
    height: 56px;">
          数据治理<img src="@/assets/images/home.png" alt="" style="width: 15px;
    height: 15px;
    margin-left: 3px;">
        </div> -->
        <div class="treeBox">
               <div class="tree">数据治理</div>
     <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      active-text-color="#ea991b"
      >
      <el-menu-item index="1" @click.native="active = '1'" style="background:#fff">
        <span slot="title" class="tree1"><img src="./problemDataInspection/img/fireProtect.png" class="imgTitle"></img>治理总览</span>
      </el-menu-item>
      <el-menu-item index="2"  @click.native="active = '2'" style="background:#fff">
        <span slot="title" class="tree1"><img src="./problemDataInspection/img/service.png" class="imgTitle"></img>治理问题列表</span>
      </el-menu-item>
      <!-- <el-menu-item index="3"  @click.native="active = '3'">
        <span slot="title">全文检索</span>
      </el-menu-item> -->
    </el-menu>

        </div>
     
    </div>
    <div class="CatalogueTable">
          <dashbord v-if=" active==='1' "></dashbord>
          <myProblem v-if=" active==='2'" ></myProblem>
          <!-- <textSearch v-if=" active==='3'"></textSearch> -->
    </div>
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
<style lang='scss'>
.CatalogueTable {
    width: calc(100% - 260px);
    float: left;
    margin-top: 10px;
    min-height: calc(100vh - 182px);
}
   .CatalogueList{
     float: left;
    width: 260px;
    min-height: 400px;
   }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 700px;
    border: 1px solid #dae2ee;
    background:rgb(243, 248, 249);
        padding: 2px;
   
  }
  .el-menu-item *{
    margin-left:-6px
  }
  .pager-wrapper{
    float:right
  }
  
  .tree{
    width: 100%;
    height: 60px;
    line-height: 60px;
    color: #fff;
    margin-top: 20px;
    text-align: center;
    background-image: url('./problemDataInspection/img/bg.png');
    background-size: 100% 100% ;
    letter-spacing: 8px;
    font-size: 25px;
    font-weight: 400;
  }
  .el-menu-vertical-demo{
     border:1px solid #eee;
     padding-top:0 ;
     border-top:none;
    /deep/
    .el-menu-item{
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size:18px;
    margin-top: 3px;
    background:#fff;
     padding-left:30px;
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     color: #265aa3;
  }
  }
  .imgTitle{
        width: 20px;
    height: 20px;
    color: #265aa3;
    padding-right: 8px;
    margin-top: -3px;
  }
  
</style>