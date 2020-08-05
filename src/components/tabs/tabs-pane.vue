<template>
  <div class="tab-pane" v-show="isShow">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:'tabs-pane',
  props: {
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isShow:true
    }
  },
}
</script>
<style scope>
.tab-pane{
  padding: 15px;
  text-align: left
}
</style>


