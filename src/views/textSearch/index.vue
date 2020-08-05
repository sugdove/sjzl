<template>
  <div style="padding:20px">
    <div class="mainContainer">
      <div class="div2">
        <div class="justifyContent">
          <el-button>全文检索</el-button>
          <el-popover placement="bottom" width="600" trigger="manual" v-model="visible">
            <i class="el-icon-close closeIcon" @click.stop="visible = false"></i>
            <el-upload
              class="upload-demo"
              drag
              action
              :http-request="httpRequest"
              multiple
              :show-file-list="false"
              :on-change="onChangeFile"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
            <el-input style="width:600px" v-model="keyword" slot="reference">
              <i
                slot="suffix"
                v-popover:popover
                class="el-input__icon el-icon-upload"
                style="cursor:pointer;"
                @click.stop="iconClick"
              ></i>
            </el-input>
          </el-popover>
          <el-popover placement="bottom" ref="popover" trigger="hover" content="上传文件搜索"></el-popover>
          <el-button @click="getRecordCount()">搜索</el-button>
        </div>
        <div class="justifyContent">
          <div class="radioGroup">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              class="checkAllDiv"
              style=" float: left;margin: 0px 21px 0px 0px;"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <el-checkbox-group v-model="checkedTypes" @change="handlecheckedTypesChange">
              <el-checkbox
                v-for="(item,index) in typeList"
                :label="item.name"
                :value="item"
                :key="index"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="div4">
        <el-popover
          placement="right-start"
          title="单击选择类别"
          width="400"
          trigger="hover"
          v-for="(item,index) in typeList"
          :key="index"
          v-model="item.show"
        >
          <el-tag
            v-for="(item2,index2) in item.dsgMetaAsserts"
            :class="item2.priv ==1 ? 'clickTag' : 'disabledTag'"
            style="margin:5px 5px 0px 0px"
            @click.native="handleClickTag(item,item2)"
            :key="index2"
            :title="`${item2.size > 10000 ? item2.name + '(' + item2.size + ')' : ''}`"
          >{{`${item2.size!=undefined? `${item2.name}(${item2.size > 10000 ? '10000+' : item2.size})`:`${item2.name}` }`}}</el-tag>
          <el-button style="width:100px" slot="reference">{{item.name}}</el-button>
        </el-popover>
      </div>
      <div class="div5">
        <el-card class="box-card" :body-style="{'min-height':'400px'}">
          <div slot="header" class="clearfix">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>{{chooseMemberFatherObj.name}}</el-breadcrumb-item>
              <el-breadcrumb-item>
                <a href="/">{{chooseAsset ? chooseAsset.name : ''}}</a>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div>
            <el-table
              :data="tableRows"
              height="510px"
              v-loading="tableLoading"
              element-loading-text="加载中,请稍后"
            >
              <el-table-column
                v-for="(item,index) in tableColumns"
                :key="index"
                :label="item.columnNameCn"
                :prop="item.columnName"
              ></el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagination.page"
                :page-sizes="[10, 20,50, 100]"
                :page-size="pagination.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total"
              ></el-pagination>
            </div>
          </div>
        </el-card>
      </div>
      <div class="div6">
        <el-button
          style="width:180px;margin-left:0px"
          v-for="(item,index) in chooseMemberFatherObj.dsgMetaAsserts"
          :disabled="item.priv !=1"
          @click.native="handleClickTag2(item)"
          :key="index"
          :title="`${item.size > 10000 ? item.name + '(' + item.size + ')' : ''}`"
        >{{`${item.size!=undefined? `${item.name}(${item.size > 10000 ? '10000+' : item.size})`:`${item.name}` }`}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getList, getRecordCount, getAssetsDetails, upload } from '@/api/search.js'
export default {
  data () {
    return {
      radio: '',
      typeList: [
        {
          name: '人员',
          dsgMetaAsserts: [
            {
              label: '实有人口',
              size: 1
            },
            {
              label: '常口',
              size: 10
            },
            {
              label: '流动人口',
              size: 1000
            },
            {
              label: '其他人口',
              size: 50000
            }
          ]
        },
      ],
      chooseMemberFatherObj: [],
      chooseAsset: null,
      checkAll: true,
      checkedTypes: [],
      isIndeterminate: false,
      keyword: '',
      tableColumns: [],
      tableRows: [],
      tableLoading: false,
      pagination: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      visible: false,
      relation: 'and'
    }
  },
  methods: {
    handleCheckAllChange (val) {
      this.checkedTypes = val ? this.typeList.map(el => el.name) : [];
      this.isIndeterminate = false;
    },
    handlecheckedTypesChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.typeList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.typeList.length;
    },
    handleClickTag (item1, item2) {
      if (item2.priv != 1) return false
      item1.show = false
      this.chooseMemberFatherObj = item1
      this.pagination.page = 1
      this.getAssetsDetails(item2)
    },
    handleClickTag2(item2){
      this.pagination.page = 1
      this.getAssetsDetails(item2)
    },
    // 获取专题列表
    getList () {
      getList().then(res => {
        this.typeList = res.data
        this.checkedTypes = res.data.map(el=>el.name)
      })
    },
    // 获取记录数 点击搜索情况
    getRecordCount (relation = "and") {
      if (!this.keyword || this.checkedTypes.length === 0) return false
      this.relation = relation
      console.log(relation, 'relation')
      this.typeList.forEach(el => {
        this.checkedTypes.forEach(el2 => {
          if (el.name === el2) {
            el.dsgMetaAsserts.forEach(el3 => {
              let params = { relation: this.relation, index: el3.tableName, keyWord: this.keyword }
              getRecordCount(params).then(res => {
                if (res.code === 200) el3.size = res.data
              })
            })
          }
        })
      })
    },
    // 获取资产详情
    getAssetsDetails (item2) {
      this.tableLoading = true
      this.chooseAsset = item2
      if (item2.priv != 1) return false
      let params = { relation: this.relation, index: item2.tableName, keyWord: this.keyword, tableId: item2.tableId, pagesize: this.pagination.pagesize, page: this.pagination.page }
      getAssetsDetails(params).then(res => {
        this.tableLoading = false
        console.log(res, 'res')
        this.tableColumns = res.columns[0]
        this.tableRows = res.rows
        this.pagination.total = res.total
      })
    },
    //
    handleSizeChange (pagesize) {
      this.pagination.pagesize = pagesize
      this.getAssetsDetails(this.chooseAsset)
    },
    // 
    handleCurrentChange (page) {
      this.pagination.page = page
      this.getAssetsDetails(this.chooseAsset)
    },
    iconClick () {
      this.visible = true
    },
    onChangeFile (file, fileList) {
      console.log(file, 'file')
      const formData = new FormData();
      formData.append('fileUpload', file.raw);
      upload(formData).then(res => {
        if (res.code == 200) {
          this.$message.success('操作成功')
          this.keyword = res.msg
          this.getRecordCount('or')
        }
      })
    },
    // 屏蔽默认上传操作
    httpRequest () {
      return false
    },
  },
  mounted () {
    this.getList()
  }
}
</script>
<style>
.mainContainer {
  width: 99%;
  display: grid;
  grid-template-areas:
    "div1 div2 div3"
    "div4 div5 div6";
  grid-template-columns: 100px 1fr 180px;
  grid-template-rows: 100px 800px;
  grid-gap: 10px 10px;
}
.div2 {
  grid-area: div2;
}
.div4 {
  grid-area: div4;
}
.div5 {
  grid-area: div5;
}
.div6 {
  grid-area: div6;
}
.justifyContent {
  display: flex;
  justify-content: center;
}
.radioGroup {
  width: 600px;
  padding-left: 29px;
  padding: 10px 0px 10px 29px;
}
.el-button {
  border-radius: 0px !important;
}
.clickTag {
  cursor: pointer;
}
.clickTag:hover {
  background: #409eff !important;
  color: white;
}
.disabledTag {
  cursor: not-allowed;
  color: red;
}
.block {
  float: right;
  margin: 10px 0px 10px 0px;
}
.closeIcon {
  float: right;
  padding: 0px 0px 2px 0px;
  color: #909399;
  cursor: pointer;
}
.closeIcon:hover {
  color: #409eff;
}
.el-upload-dragger {
  width: 574px;
}
</style>