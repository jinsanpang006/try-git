import Vue from 'vue'
import VueRouter from 'vue-router'
// index要写成小写  这样写了login就会自动跳转到里面的index.vue
// @ 就直接代表src目录
import layout from '@/views/layout'
import articles from '@/views/articles'
import home from '@/views/home'
import pictures from '@/views/pictures'
import Page404 from '@/views/Page404'
import login from '@/views/login'
import { getUser } from '@/utils/storage.js'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: layout,
      children: [
        { path: '/', component: home },
        { path: '/articles', component: articles },
        { path: '/pictures', component: pictures }
      ]
    },
    { path: '/login', component: login },
    { path: '*', component: Page404 }
  ]
})
// 全局前置守卫: 所有路由的跳转, 都会先经过全局前置守卫, 只有全局前置守卫放行了, 才会真正显示路由匹配的内容
// vuerouter官网的进阶的导航守卫
// 1. 去登录页面 放行   2.有token 放行
router.beforeEach((to, from, next) => {
  const userInfo = getUser()
  if (to.path === '/login' || userInfo.token) {
    next()
  } else {
    next('/login')
  }
})

export default router
