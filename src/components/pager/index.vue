<!--
 * @Description: 分页组件
 * @Author: liyue
 * @Date: 2019-09-16 10:31:10
 * @LastEditTime: 2019-12-04 11:20:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="pager-wrapper" v-if="page.total>0">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    page: {
      type: Object,
      required: true,
      default: () => ({ page: 1, size: 10, total: 0 })
    }
  },
  components: {},
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {
    handleSizeChange(val) {
      this.$emit('sizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('currentChange', val)
    }

  },
  created() {

  },
  mounted() {

  }
}
</script>
<style lang='scss' scoped>
// @import '样式文件'
</style>
