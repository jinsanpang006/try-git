import Vue from 'vue'
import VueRouter from 'vue-router'
// index要写成小写  这样写了login就会自动跳转到里面的index.vue
// @ 就直接代表src目录
import layout from '@/views/layout'
import login from '@/views/login'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: layout },
    { path: '/login', component: login }
  ]
})

export default router
