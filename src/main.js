import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './utils/request'
import MyBreadcrumb from '@/components/my-breadcrumb'

Vue.use(ElementUI)// 一般基于vue的第三方插件 都需要vue一下   eg: vue-router ElementUI

Vue.prototype.$axios = http// 为了不用每次使用时都引入  挂载到vue实例上   因为后面使用的文件 实例基本上都是vue  直接this.axios就行

Vue.component('my-breadcrumb', MyBreadcrumb)// 全局面包屑组件

// 创建一个都能访问到的时间总线
const Bus = new Vue()
// 想要都访问到 所以要挂到vue的原型上
Vue.prototype.$eventBus = Bus

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
