<template>
  <div style="padding:20px">   
        <div style="height: 62px;
    color: #7f7f7f;
    font-size: 14px;">
          数据治理首页
        </div>
          <boxList></boxList>
          <chart1 style="padding: 20px 0px 20px 0px;"></chart1>
          <chart2></chart2>
  </div>
</template>
<script>
import boxList from './components/boxList.vue'
import chart1 from './components/chart1.vue'
import chart2 from './components/chart2.vue'
export default {
  components:{
     boxList,
     chart1,
     chart2
  },
  data(){
    return{
    }
  },
  methods: {
  },
}
</script>