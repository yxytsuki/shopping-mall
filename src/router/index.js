import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
// import Search from '@/views/search/index'
import Search from '@/views/search/index.vue'
import SearchList from '@/views/search/list'
import ProDetail from '@/views/prodetail'
import Pay from '@/views/pay'
import MyOrder from '@/views/myorder'
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/searchlist',
      component: SearchList
    },
    {
      // 动态路由传参，确认将来是哪个商品，路由参数携带id
      path: '/prodetail/:id',
      component: ProDetail
    },
    {
      path: '/pay',
      component: Pay
    },
    {
      path: '/myorder',
      component: MyOrder
    }
  ]
})

// 全局前置导航守卫
// to 到哪儿去，到哪去的完整路由信息对象
// from从哪儿来的完整路由信息对象
// next()是否放行
const authUrl = ['/pay', 'myorder']
router.beforeEach((to, from, next) => {
  // console.log(to, from, next())
  if (!authUrl.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
