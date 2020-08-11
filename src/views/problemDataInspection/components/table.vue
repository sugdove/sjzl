<template>
  <div >
    <div style="height: 62px;
    color: #7f7f7f;
    font-size: 14px;">
      <el-breadcrumb separator="/">
  <el-breadcrumb-item><a href="/admin/#/portal/index">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item><a @click="reload">数据治理</a></el-breadcrumb-item>
  <el-breadcrumb-item>治理问题列表</el-breadcrumb-item>
</el-breadcrumb>
      <el-select v-model="isMine" style="float:right">
        <el-option
          v-for="(item,index) in isMineList"
          :key="index"
          :label="`${item.label}`"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="search-box">
      <el-form
        style="display: flex;
    align-items: center;
    height: 83px;
    border: 1px solid rgba(242, 242, 242, 1);justify-content: center;"
        label-width="80px"
      >
        <el-row style="width: 100%;">
          <el-col :span="10">
            <el-form-item label="系统名称:">
              <el-input v-model="search.systemName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="业务名称:">
              <el-input v-model="search.businessName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="handleSearch" style="margin-left:10px">检索</el-button>
            <el-button type="warning" @click="handleReset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-tabs
      v-model="chooseTab"
      style="background: white;
    border-radius: 1px;margin-top:20px
    "
    >
      <el-tab-pane
        v-for="(item,index) in tabList"
        :key="index"
        :label="item.label"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" border v-loading="tableLoading" :header-cell-style="headClass">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="库名" width="200" prop="schemaName"></el-table-column>
      <el-table-column label="表名" width="200" prop="tableName"></el-table-column>
      <el-table-column label="系统名称" width="200" prop="systemName"></el-table-column>
      <el-table-column label="业务名称" width="200" prop="businessName"></el-table-column>
      <el-table-column label="治理数据量" width="200" prop="totalCount"></el-table-column>
      <el-table-column label="已整改" width="200" prop="rectificationCount"></el-table-column>
      <el-table-column label="待整改" width="200" prop="invalidCount"></el-table-column>

      <el-table-column label="更新时间" width="200" prop="updateTime">
        <template slot-scope="scope">{{new Date(scope.row.updateTime).toLocaleString()}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <div>
            <el-link type="primary" @click="handleDetail(scope.row)">详情</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="province" label="省份" width="120"></el-table-column>
      <el-table-column prop="city" label="市区" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" width="300"></el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>-->
    <pager
      :page="flowPage"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      style="background: white;padding:3px"
    ></pager>
  </div>
</template>
<script>
import { getTable } from "@/api/problemDataInspection.js";
export default {
  data() {
    return {
      chooseTab: "week",
      tabList: [
        {
          label: "近7天",
          name: "week",
        },
        {
          label: "近30天",
          name: "month",
        },
        {
          label: "近一季度",
          name: "quarter",
        },
        {
          label: "近一年",
          name: "year",
        },
      ],
      tableData: [],
      tableLoading: false,
      flowPage: {
        page: 1,
        size: 10,
        total: 1,
      },
      search: {
        businessName: "",
        systemName: "",
      },
      isMine: "unit",
      isMineList: [
        {
          label: "我管理的数据",
          value: "unit",
        },
        {
          label: "待我整改的数据",
          value: "mine",
        },
      ],
    };
  },
  watch: {
    chooseTab() {
      this.flowPage.page = 1;
      this.getTableList();
    },
    isMine() {
      this.getTableList();
    },
  },
  methods: {
    reload(){
      location.reload()
    },
    // 表头样式设置
    headClass() {
      return "background:#e1ebf9;";
    },
    getTableList() {
      this.tableLoading = true;
      const params = {
        page: this.flowPage.page,
        size: this.flowPage.size,
        statisticPeriod: this.chooseTab,
        businessName: this.search.businessName,
        systemName: this.search.systemName,
        isMine: this.isMine,
      };
      getTable(params).then((res) => {
        const { code, msg, data } = res;
        if (code !== 0) {
          this.$message.error(msg);
        } else {
          this.tableData = data.content;
          this.flowPage.total = data.totalCount;
        }
        this.tableLoading = false;
      });
    },
    handleSizeChange(size) {
      this.flowPage.size = size;
      this.getTableList();
    },
    handleCurrentChange(page) {
      this.flowPage.page = page;
      this.getTableList();
    },
    // 点击详情操作
    handleDetail(row) {
      this.$emit("showDetail", { row, isMine: this.isMine });
    },
    handleSearch() {
      this.getTableList();
    },
    handleReset() {
      this.search.businessName = "";
      this.search.systemName = "";
      this.getTableList();
    },
  },
  mounted() {
    this.getTableList();
  },
};
</script>
<style >
.el-form-item {
  margin-bottom: 0px !important;
}
/* 修改表格滚动条样式 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #3386f2;
  border-radius: 50px;
}
</style>