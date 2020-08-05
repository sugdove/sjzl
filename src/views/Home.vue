<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data(){
    return{
      name:{
        table:{}
      }
    }
  },
  methods:{
    test(){
      console.log(this.name.table)
    }
  },
  mounted(){
    this.test()
  }
}
</script>
