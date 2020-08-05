<template>
  <el-container style="height: 100%;">
    <el-header>
      <header-content></header-content>
      </el-header>
    <el-container>
      <el-aside width="13%">
        <sidebar-content :agentsList="agentsList"></sidebar-content>
      </el-aside>
      <el-container>
        <el-main>
          <main-content :agentsList="agentsList"></main-content>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import headerContent from './components/header'
import sidebarContent from './components/sidebar'
import mainContent from './components/main'
import {getAgentsList } from '@/api/agents'
export default {
  components: {
    headerContent,
    sidebarContent,
    mainContent
  },
  data () {
    return {
      agentsList:[]
    }
  },
  methods:{
    getAgentsList(){
      getAgentsList().then(res=>{
          this.agentsList = res
      })
    }
  },
  mounted(){
    this.getAgentsList()
  }
}
</script>
<style scope>
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
  box-shadow: 0px 3px 0px #E1E4E6;
}

.el-aside {
  background-color: #2D4054;
  width:13%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.el-main {
  background-color: #F3F3F3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

