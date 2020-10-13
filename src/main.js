import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './utils/request'

Vue.use(ElementUI)// 一般基于vue的第三方插件 都需要vue一下   eg: vue-router ElementUI

Vue.prototype.$axios = http// 为了不用每次使用时都引入  挂载到vue实例上   因为后面使用的文件 实例基本上都是vue  直接this.axios就行

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
