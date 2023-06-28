import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
import store from './store' //引入仓库
// 三级联动组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
// 分页器
import Pagination from '@/components/pagination'
// 引入mock数据
import '@/mock/mockServe'
// 引入swiper
import 'swiper/css/swiper.css'
// 引入api
import * as API from '@/api'
// 引入element-ui
import { Button, MessageBox } from 'element-ui'
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
// 全局组件
Vue.component('TypeNav', TypeNav)
Vue.component('Pagination', Pagination)
Vue.config.productionTip = false
// 引入懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
new Vue({
  router,
  store, //注册仓库，组件实例身上$store属性
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API //全局接口挂载
  },
  render: (h) => h(App)
}).$mount('#app')
