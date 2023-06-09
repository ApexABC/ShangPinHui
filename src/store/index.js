import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 引入小仓库
import home from '@/store/home'
import search from '@/store/search'
import detail from './detail'
import shopCart from './shopCart'
import register from './register'
import login from './login'
import trade from './trade'
export default new Vuex.Store({
  // 仓库模块化开发
  modules: {
    home,
    search,
    detail,
    shopCart,
    register,
    login,
    trade
  }
})
