<template>
  <div style="display:-webkit-flex">
    <el-input :value="num" @input="changed($event)"></el-input>
    <el-button size="mini" type="default" @click="reduceNumber" style="margin-left:10px">-</el-button>
    <el-button size="mini" type="default" @click="addNumber">+</el-button>
  </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      num: 0
    }
  },
  methods: {
    changed (val) {
      const reg = /(^-?[1-9][0-9]*$)|(^-?[0-9]+\.{1}\d*$)|(^-{0,1}0{0,1}$)/
      console.log(reg.test(val))
      console.log(val)
      if (reg.test(val)) {
        this.num = val
        this.$emit('input', this.num)
      }
      else if (val === '') {
        this.num = ''
        this.$emit('input', this.num)
      }
      else if (val === '-') {
        this.num = ''
        this.$emit('input', this.num)
      }
      else {
        return false
      }
    },
    reduceNumber () {
      // this.num === 0 ? '' : this.num--
      this.num--
      this.$emit('input', String(this.num))
    },
    addNumber () {
      this.num++
      this.$emit('input', String(this.num))
    }
  }
}
</script>

