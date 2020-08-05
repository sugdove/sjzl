<template>
  <div>
    <div style="height: 35px;
    color: #7f7f7f;
    font-size: 14px;">
          数据治理>问题数据列表>问题数据清单
            <el-button @click="closeDetail" type="primary" size='mini' style="float:right;margin-top: -3px;">返回</el-button>
        </div>
        <div style="color:#c084f7;font-size: 18px;font-family: 'Arial-BoldMT', 'Arial Bold', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal">
           {{`${chooseRow.systemName ? chooseRow.systemName : '未指定'} > ${chooseRow.businessName ? chooseRow.businessName : '未指定'}`}}
          <a :href="`/curd_/dsgDataGovern/exportProblemData?metadataId=${chooseRow.hashedName}&orgId=1&entityId=${chooseRow.entityId}&isMine=${isMine}`">
           <el-button type='primary' style="margin-left:10px">导出</el-button></a>
           <el-button type='warning' style="margin-left:10px" v-if="!modifyBtnStatus && chooseTab == 'invalid'" @click="handleModify">整改</el-button>
           <el-button type='danger' style="margin-left:10px" v-if="modifyBtnStatus" @click="modifyBtnStatus = !modifyBtnStatus">取消</el-button>
           <el-button type='success' style="margin-left:10px" v-if="modifyBtnStatus" @click="handleSave">保存</el-button>
           <div style="float:right">
          <el-select v-model="searchfield" placeholder="字段名" style="width:100px;margin:0px 10px" clearable>
            <el-option
            v-for="(item,index) in searchfieldList"
            :key="index"
            :value="item"
            :label="item"
            ></el-option>
          </el-select>
          <el-input style="width:200px" v-model="searchkey" placeholder="问题规则"></el-input>
          </div>
        </div>
        
    <!-- <div class="titleBar">
      <span style="color:#3a8ee6;cursor:pointer" @click="closeDetail">数据治理</span>
      <span style="color:#303133">> 详情</span>
    </div> -->
    <!-- <div class="search-box">
      <el-form inline>
        <el-form-item label="社会单位编码:">
          <el-input v-model="search.businessName"></el-input>
        </el-form-item>
        <el-form-item label="单位名称:">
          <el-input v-model="search.systemName"></el-input>
        </el-form-item>
        <el-button type="primary" @click="handleSearch">检索</el-button>
        <el-button type="warning" @click="handleReset">重置</el-button>
      </el-form>
    </div>-->
    <el-tabs v-model="chooseTab" style="background: white;
    border-radius: 1px;">
      <!-- padding: 13px 13px 0px 13px; -->
      <el-tab-pane
        v-for="(item,index) in tabList"
        :key="index"
        :label="`${item.label}(${countRes(item)})`"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
    <div>
      <!-- <el-select v-model="isMine">
        <el-option
          v-for="(item,index) in isMineList"
          :key="index"
          :label="`${item.label}`"
          :value="item.value"
        ></el-option>
      </el-select>-->
      <!-- chooseTab==='invalid' && tableData.length>0 -->
      <!-- <el-link
        type="primary"
        v-if="chooseTab==='invalid' && tableData.length>0"
        style="margin-left:20px"
        :href="`/curd_/dsgDataGovern/exportProblemData?metadataId=${chooseRow.hashedName}&orgId=1&entityId=${chooseRow.entityId}&isMine=${isMine}`"
      >导出待整改数据</el-link> -->
    </div>
    <el-table :data="tableData" v-loading="tableLoading" style="padding: 0px 13px 0px 13px;width:100%" border>
      <el-table-column type="index" label="序号" width="50" v-if="tableData[0]"></el-table-column>
      <el-table-column
        v-for="(value,key,index) in tableData[0]"
        :label="key"
        :key="index"
        :prop="key"
        v-if="key!=='dlp_reject_reason' && key!=='dsg_rowid'"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div>{{scope.row[key].value}}</div>
          <div v-if="scope.row[key].sourceInfo">{{scope.row[key].sourceInfo}}</div>
          <div v-if="reasonMes(scope.row[key].field,scope.row) && !modifyBtnStatus" style="color:red">{{reasonMes(scope.row[key].field,scope.row)}}</div>
          <el-input v-model="modifyForm[scope.$index][value.field]"  v-if="reasonMes(scope.row[key].field,scope.row) && modifyBtnStatus && value.type==='string'"></el-input>
          <el-input type="number" v-model.number="modifyForm[scope.$index][value.field]"  v-if="reasonMes(scope.row[key].field,scope.row) && modifyBtnStatus && value.type==='int'"></el-input>
          <el-date-picker value-format="yyyy-MM-dd" v-model="modifyForm[scope.$index][value.field]" type="date"  v-if="reasonMes(scope.row[key].field,scope.row) && modifyBtnStatus && value.type==='date'"></el-date-picker>
        </template>
      </el-table-column>
    </el-table>
    <pager
      :page="flowPage"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      style="background: white;padding:3px"
    ></pager>
  </div>
</template>
<script>
import { getDetailTable, getDetailNumber,getFields,updateErrorData } from '@/api/problemDataInspection.js'
export default {
  props: {
    chooseRow: {
      type: Object,
      default: () => { }
    },
    isMine:{
      type:String,
      default:''
    }
  },
  data () {
    return {
      chooseTab: 'invalid',
      tabList: [
        // {
        //  label: '整改总数',
        //  name: 'total'
        // },
        {
          label: '待整改数',
          name: 'invalid'
        },
        {
          label: '已整改数',
          name: 'rectification'
        },
        {
          label: '整改中',
          name: 'modify'
        },
      ],
      tableData: [],
      validCount: '',
      invalidCount: '',
      modityCount:'',
      tableLoading: false,
      flowPage: {
        page: 1,
        size: 10,
        total: 1
      },
      search: {
        businessName: '',
        systemName: ''
      },
      // isMine: 'unit',
      isMineList: [
        {
          label: '我管理的数据',
          value: 'unit'
        },
        {
          label: '待我整改的数据',
          value: 'mine'
        }
      ],
      searchfieldList:[],
      searchfield:'',
      searchkey:'',
      modifyBtnStatus:false,
      modifyFormStart:[],
      modifyForm:[]
    }
  },
  watch: {
    searchfield(val){
     this.getTableList()
    },
    searchkey(val){
      this.getTableList()
    },
    "chooseRow.entityId" () {
      this.chooseTab = 'invalid'
      this.flowPage.page = 1
      this.getFields()
      this.getTableList()
      this.getDetailNumber()
    },
    chooseTab (val) {
      if (val !== 'total') {
        this.flowPage.page = 1
        this.getTableList()
      }
    },
    isMine () {
      this.flowPage.page = 1
      this.getTableList()
    }
  },
  methods: {
    getTableList () {
      this.tableLoading = true
      const params = {
        page: this.flowPage.page,
        size: this.flowPage.size,
        validator: this.chooseTab === 'modify' ? 'invalid' : this.chooseTab,
        isMine: this.isMine,
        id: this.chooseRow.entityId,
        searchkey:this.searchkey,
        searchfield:this.searchfield,
        modifyFlag: this.chooseTab === 'modify' ? '0' : '1'
        // orgId: 1
      }
      getDetailTable(params).then(res => {
        const { code, msg, data } = res
        if (code !== 0) {
          this.$message.error(msg)
        }
        else {
          this.tableData = data.content
          this.flowPage.total = data.totalCount
        }
        this.modifyBtnStatus = false
        this.tableLoading = false
      })
    },
    // 获取fields列表
    getFields(){
      const params = {
        validator: this.chooseTab,
        isMine: this.isMine,
        id: this.chooseRow.entityId,
      }
      getFields(params).then(res=>{
         this.searchfieldList = res.data
      })
    },
    getDetailNumber () {
      getDetailNumber({        id: this.chooseRow.entityId,
        orgId: 1, isMine: this.isMine      }).then(res => {
        const { data, code, msg } = res
        if (code !== 0) {
          this.$message.error(msg)
        }
        else {
          this.validCount = data.validCount
          this.invalidCount = data.invalidCount
          this.modityCount = data.modityCount
        }
      })
    },
    handleSizeChange (size) {
      this.flowPage.size = size
      this.getTableList()
    },
    handleCurrentChange (page) {
      this.flowPage.page = page
      this.getTableList()
    },
    // 返回列表
    closeDetail () {
      this.$emit('closeDetail')
    },
    // 处理reason
    reasonMes (key, row) {
      if (!row.dlp_reject_reason) return ''
      const objArr = row.dlp_reject_reason
      let reason = ''
      objArr.forEach(el => {
        // 此处排除了下后台的返回错误
        if(el.scope !== 'field'){
        }
        else{
           if (el[el.scope].toLowerCase() === key) {
          reason = el.rule
        }
        }
      })
      return reason
    },
    // 点击整改时组装对象
    getModifyForm(){
      const tableData = JSON.parse(JSON.stringify(this.tableData))
      const arrObj = []
      tableData.forEach(el=>{
        const arrObj2 = {}
        // dsg_rowid存在则取dsg_rowid对象下的value值 否则为空字符串
        if(el.dsg_rowid){
          arrObj2['dsg_rowid'] = el.dsg_rowid.value
        }
        else{
          arrObj2['dsg_rowid'] = ''
        }
        el.dlp_reject_reason.forEach(el2=>{
          // 此处排除了下后台的返回错误
          if(el2.scope == 'field'){
            for(let key in el){
              if(el[key].field == el2.field){
                 arrObj2[el2.field] = el[key].value
              }
            }
          }
        })
        arrObj.push(arrObj2)
      })
      console.log(arrObj,'arrobj')
      this.modifyFormStart = JSON.parse(JSON.stringify(arrObj)) // 初始不改变的对象
      this.modifyForm = JSON.parse(JSON.stringify(arrObj)) // 用于整改的对象
    },
    // 对比对象进行传参组装
    getComparedParams(){
      const startArrobj = this.modifyFormStart
      const endArrObj = this.modifyForm
      console.log(startArrobj,'startArrobj')
      console.log(endArrObj,'endArrObj')
      const changeArrObj = []
      for(let i = 0;i<startArrobj.length;i++){
        if(JSON.stringify(Object.values(startArrobj[i])) !== JSON.stringify(Object.values(endArrObj[i]))){
          changeArrObj.push(endArrObj[i])
        }
      }
      console.log(changeArrObj,'changeArrObj')
      // 将changeArrObj组装为后台需要的传参
      const comparedParams = []
      for(let i = 0;i<changeArrObj.length;i++){
        let inArr = []
        for(let j in changeArrObj[i]){
          // 如果dsg_rowid的值为空字符串的情况下则不push最后传参进去
          if(!(j === 'dsg_rowid' && changeArrObj[i][j] === '')){
            let inArrObj = {field:j,value:changeArrObj[i][j]}
            inArr.push(inArrObj)
          }
        }
        comparedParams.push(inArr)
      }
      const conparedJson = {
        hashedName:this.chooseRow.hashedName,
        configId:this.chooseRow.configId,
        fields:comparedParams
      }
      return conparedJson
    },
    countRes (item) {
      if (item.name === 'total') {
        return this.validCount + this.invalidCount
      }
      else if (item.name === 'invalid') {
        return this.invalidCount
      }
      else if (item.name === 'rectification') {
        return this.validCount
      }
      else if(item.name === 'modify'){
        return this.modityCount
      }
    },
    handleSearch () { },
    handleReset () { },
    // 点击整改
    handleModify(){
      // 判断table下数据是否有问题判断规则:取content下第一行数据是否存在dsg_rowid属性或者采集时间下对应的value为null满足其一则不能整改
      if(!this.tableData[0].hasOwnProperty('dsg_rowid') || this.tableData[0]['采集时间'].value === null){
       this.$message.error('该表数据不符合规范,不能进行整改')
       return false
      }
      this.modifyBtnStatus = true
      this.getModifyForm()
    },
   // 点击保存
    handleSave(){
      this.modifyBtnStatus = false
      updateErrorData(this.getComparedParams()).then(res=>{
        if(res.code == 0){
          this.$message.success('整改成功!')
          this.getTableList()
          this.getDetailNumber()
        }
        else{
           this.$message.error(res.msg)
        }
      })
    }
  },
  mounted () {
    this.getFields()
    this.getTableList()
    this.getDetailNumber()
  },
}
</script>
<style lang="scss" scope>
.titleBar {
  height: 44px;
  margin-bottom: 20px;
  background: white;
  padding: 13px 13px 0px 13px;
  border-radius: 8px;
  border: 1px #eee solid;
  line-height: 32px;
}
</style>