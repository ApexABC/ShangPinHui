// home模块仓库
import { reqCategoryList, reqFloorList, reqGetBannerList } from '@/api/index'

const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}

const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, BannerList) {
    state.bannerList = BannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}

const actions = {
  // 通过api里面的接口函数调用，向服务器发起请求
  async categoryList({ commit }) {
    let result = await reqCategoryList()
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList()
    if (result.code == 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  // 获取floor的数据
  async getFloorList({ commit }) {
    let result = await reqFloorList()
    if (result.code === 200) {
      commit('GETFLOORLIST', result.data)
    }
  }
}
// 理解为计算属性
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
