<template>
  <el-button type="primary" @click="promiseOne">执行promise</el-button>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    axiosz (thenMes) {
      const promise1 = new Promise((resolve, reject) => {
        console.log('resolve or reject')
        thenMes ? resolve(thenMes) : reject(thenMes)
      })
      return promise1
    },
    promiseOne () {
      this.axiosz(false).then(res => {
        console.log('成功！' + res)
      }).catch(rej => {
        console.log('失败！' + rej)
      })
    }
  }
}
</script>