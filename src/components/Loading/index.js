import tabs from '@/components/tabs'
import inputNumber from '@/components/InputNumber'
import tabsPane from '@/components/tabs/tabs-pane'
import pager from '@/components/pager/index'

const Loading = {
  install:function(Vue){
    Vue.component('tabs',tabs)
    Vue.component('inputNumber',inputNumber)
    Vue.component('tabsPane',tabsPane)
    Vue.component('pager',pager)
  }
}

export default Loading