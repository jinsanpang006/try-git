import Vue from 'vue'
import VueRouter from 'vue-router'
// index要写成小写  这样写了login就会自动跳转到里面的index.vue
// @ 就直接代表src目录
import layout from '@/views/layout'
import Articles from '@/views/articles'
import AddArticles from '@/views/articles/add-articles'
import EditArticles from '@/views/articles/edit-articles'
import Home from '@/views/home'
import Pictures from '@/views/pictures'
import Comment from '@/views/comment'
import Fans from '@/views/fans'
// import Settings from '@/views/settings'
import Settings from '@/views/settings'
import Page404 from '@/views/Page404'
import login from '@/views/login'
import { getUser } from '@/utils/storage.js'
Vue.use(VueRouter)

console.log(Settings, 'ss')

// const router = new VueRouter({
//   routes: [
//     {
//       path: '/',
//       component: layout,
//       children: [
//         { path: '', component: home },
//         { path: '/articles', component: articles }, // 文章列表
//         { path: '/add-article', component: AddArticles },
//         { path: '/edit-article/:id', component: EditArticles },
//         { path: '/pictures', component: pictures },
//         { path: '/comment', component: comment },
//         { path: '/fans', component: fans },
//         { path: '/settings', component: Settings }
//       ]
//     },
//     { path: '/login', component: login },
//     // 404也是一级路由, 整个页面, 都换成404
//     // 一般在路由的配置最后, path: '*' 可以处理没被处理其他路由情况, 一般用于实现404
//     { path: '*', component: Page404 }
//   ]
// })
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: layout,
      children: [
        { path: '', component: Home },
        { path: '/articles', component: Articles },
        { path: '/add-article', component: AddArticles },
        { path: '/edit-articles/:id', component: EditArticles },
        { path: '/pictures', component: Pictures },
        { path: '/comment', component: Comment },
        { path: '/fans', component: Fans },
        { path: '/settings', component: Settings }
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
