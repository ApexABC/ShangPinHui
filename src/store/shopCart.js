import { reqCartList, reqCheckCart, reqDeleteCart } from '@/api/index'
import { Promise } from 'core-js'
const state = {
  shopCartList: []
}
const mutations = {
  GETSHOPCARTList(state, data) {
    state.shopCartList = data
  }
}
const actions = {
  async getShopCartList({ commit }) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit('GETSHOPCARTList', result.data)
    }
  },
  // 删除购物车商品
  async getDeleteCart(context, skuId) {
    let result = await reqDeleteCart(skuId)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 切换商品选择状态
  async getChangeCheck(context, { skuId, isChecked }) {
    let result = await reqCheckCart(skuId, isChecked)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除全部勾选商品
  deleteCheckAll({ dispatch, getters }) {
    let promiseAll = []
    getters.cartList.cartInfoList.forEach((item) => {
      let promise = item.isChecked == 1 ? dispatch('getDeleteCart', item.skuId) : ''
      // 将每一次返回的promise添加到数组中
      promiseAll.push(promise)
    })
    // 如果全部成功则返回成功，有一个失败就返回失败
    return Promise.all(promiseAll)
  },
  // 更改所有checked
  changeAllChecked({ dispatch, getters }, isChecked) {
    let promiseAll = []
    getters.cartList.cartInfoList.forEach((item) => {
      let promise = dispatch('getChangeCheck', { skuId: item.skuId, isChecked: isChecked })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}
const getters = {
  cartList(state) {
    return state.shopCartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
