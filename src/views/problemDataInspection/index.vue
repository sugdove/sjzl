<template>
  <div>
    <div style="padding:20px">
      <my-table v-show="!showDetail" @showDetail="showDetailMes"></my-table>
      <detail-table v-if="showDetail" :isMine="isMine" :chooseRow="chooseRow" @closeDetail="closeDetail"></detail-table>
      </div>
  </div>
</template>
<script>
import boxList from './components/boxList.vue'
import myTable from './components/table.vue'
import detailTable from './components/detailTab.vue'
export default {
  components:{
     boxList,
     myTable,
     detailTable
  },
  data(){
    return{
      showDetail: false,
      chooseRow:'',
      isMine:''
    }
  },
  methods: {
    showDetailMes(chooseRow){
      this.chooseRow = chooseRow.row
      this.isMine = chooseRow.isMine
      this.showDetail = true
    },
    closeDetail(){
      this.showDetail = false
    }
  },
}
</script>