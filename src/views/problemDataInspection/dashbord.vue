<template>
  <div style="padding:20px">   
        <div style="height: 62px;
    color: #7f7f7f;
    font-size: 14px;">
          <el-breadcrumb separator="/">
  <el-breadcrumb-item><a href="/admin/#/portal/index">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item><a @click="reload">数据治理</a></el-breadcrumb-item>
  <el-breadcrumb-item>治理总览</el-breadcrumb-item>
</el-breadcrumb>
        </div>
          <boxList></boxList>
          <line1></line1>
          <!--<chart1 style="padding: 20px 0px 20px 0px;"></chart1>-->
          <chart2></chart2>
  </div>
</template>
<script>
import boxList from './components/boxList.vue'
import chart1 from './components/chart1.vue'
import chart2 from './components/chart2.vue'
import line1 from './components/zztChart.vue'
export default {
  components:{
     boxList,
     chart1,
     chart2,
     line1
  },
  data(){
    return{
    }
  },
  methods: {
    reload(){
      location.reload()
    }
  },
}
</script>