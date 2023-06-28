import { reqLogin, reqLogout, reqUserInfo } from '@/api'
import { setToken } from '@/utils/token'
const state = {
  token: '',
  userInfo: ''
}
const mutations = {
  GETLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  }
}
const actions = {
  // 登录
  async getLogin({ commit }, data) {
    let result = await reqLogin(data)
    if (result.code == 200) {
      commit('GETLOGIN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async getLogout({ commit }) {
    let result = await reqLogout()
    if (result.code == 200) {
      localStorage.removeItem('TOKEN')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
