import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Loading from '@/components/Loading'
import echarts from 'echarts'
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(Loading)
Vue.use(Element)
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
