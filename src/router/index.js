import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入store
import store from '@/store'
// 使用插件
Vue.use(VueRouter)
// 引入路由组件
import Login from '@/pages/Login'
// 重写push和replace方法,声明式导航没有这样的问题
// 先保存VurRouter原型对象的push
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
const router = new VueRouter({
  routes: [
    { path: '', redirect: '/home' },
    { path: '/home', component: () => import('@/pages/Home'), meta: { show: true } },
    { path: '/login', component: Login, meta: { show: false } },
    { path: '/register', component: () => import('@/pages/Register'), meta: { show: false } },
    {
      name: 'search',
      path: '/search/:keyword?',
      component: () => import('@/pages/Search'),
      meta: { show: true },
      props: (route) => ({ keyword: route.params.keyword, k: route.query.k })
    },
    { path: '/detail/:skuId', component: () => import('@/pages/Detail'), meta: { show: true } },
    { name: 'addcartsuccess', path: '/addcartsuccess', component: () => import('@/pages/AddCartSuccess'), meta: { show: true } },
    { path: '/shopcart', component: () => import('@/pages/ShopCart'), meta: { show: true } },
    {
      path: '/trade',
      component: () => import('@/pages/Trade'),
      meta: { show: false },
      //路由独享守卫
      beforeEnter(to, from, next) {
        if (from.path == '/shopcart') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/pay',
      component: () => import('@/pages/Pay'),
      meta: { show: false },
      //路由独享守卫
      beforeEnter(to, from, next) {
        if (from.path == '/trade') {
          next()
        } else {
          next(false)
        }
      }
    },
    { path: '/paysuccess', component: () => import('@/pages/PaySuccess'), meta: { show: false } },
    {
      path: '/center',
      component: () => import('@/pages/Center'),
      meta: { show: true },
      children: [
        { path: '', redirect: 'myorder' },
        { path: 'myorder', component: () => import('@/pages/Center/myOrder') },
        { path: 'grouporder', component: () => import('@/pages/Center/groupOrder') }
      ]
    }
  ],
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.login.token
  let name = store.state.login.userInfo.name
  if (token) {
    if (to.path == '/login' || to.path == '/register') {
      next('/')
    } else {
      if (name) {
        next()
      } else {
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          await store.dispatch('getLogout')
          next('/login')
        }
      }
    }
  } else {
    // 用户未登录
    let toPath = to.path
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      next(`/login?redirect=${toPath}`)
    } else {
      next()
    }
  }
})
export default router
