import { reqGetSearchList } from '@/api'
const state = {
  searchList: {}
}

const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}

const actions = {
  async getSearchList({ commit }, params = {}) {
    let result = await reqGetSearchList(params)
    if (result.code == 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}
// 理解为计算属性
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
