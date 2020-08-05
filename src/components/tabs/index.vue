<template>
  <div class="tabs">
    <div class="tabs-header">
      <div
        v-for="(item,index) in tabList"
        @click="handleChange(item)"
        class="header-item"
        :class="compuActive(item)"
      >{{item.label}}</div>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tabs',
  props: {
    value: {
      type: [String, Number]
    }
  },
  data () {
    return {
      tabList: [],
      active: false,
      currentValue: '',
    }
  },
  watch: {
    value () {
      this.currentValue = value
    },
    currentValue (val) {
      this.updateStatus();
    }
  },
  methods: {
    updateStatus () {
       
    },
    handleChange (item) {
      this.currentValue = item.name
    },
    compuActive (item) {
      return {
        'active': item.name === this.currentValue
      }
    },
    getAllPane () {
      return this.$children.filter(one => {
        console.log(one)
        return one.$options.name === 'tabs-pane'
      })
    },
    updateTabList () {
      this.getAllPane().forEach((el, index) => {
        this.tabList.push({
          label: el.label,
          name: el.name || index
        })
      });
      console.log(this.tabList)
    }

  },
  mounted () {
    this.updateTabList()
  }
}
</script>
<style scope>
.tabs {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
.tabs-header {
  display: -webkit-flex;
  display: flex;
  background-color: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
  margin: 0;
}
.header-item {
  cursor: pointer;
  padding: 0 20px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: #909399;
  position: relative;
}
.header-item:hover {
  color: #409eff;
}
.active{
  color: #409eff;
}
</style>

  