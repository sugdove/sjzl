<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-col :span="7" :offset="7">
      <input-number @input="getNumber"></input-number>
      <p>传值为:{{number}}</p>
    </el-col>
  </div>
</template>
<script>
import inputNumber from '@/components/InputNumber'
export default {
  data () {
    return {
      number:0,
    }
  },
  components: {
    inputNumber
  },
  methods: {
    getNumber (data) {
      this.number = data
    }
  }
}
</script>

