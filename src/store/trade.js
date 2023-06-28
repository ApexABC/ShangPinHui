import { reqAddressInfo, reqTradeInfo } from '@/api'

const state = {
  addressInfo: [],
  tradeInfo: {}
}
const mutations = {
  GETADDRESSINFO(state, data) {
    state.addressInfo = data
  },
  GETTRADEINFO(state, data) {
    state.tradeInfo = data
  }
}
const actions = {
  // 获取用户地址
  async getAddressInfo({ commit }) {
    let result = await reqAddressInfo()
    if (result.code == 200) {
      commit('GETADDRESSINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取商品清单
  async getTradeInfo({ commit }) {
    let result = await reqTradeInfo()
    if (result.code == 200) {
      commit('GETTRADEINFO', result.data)
    }
  }
}
const getters = {
  // 商品信息
  detailArrayList() {
    return state.tradeInfo.detailArrayList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
