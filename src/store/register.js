import { reqRegister, reqVerifyCode } from '@/api'

const state = {
  code: ''
}
const mutations = {
  GETVERIFYCODE(state, data) {
    state.code = data
  }
}
const actions = {
  // 获取验证码
  async getVerifyCode({ commit }, phone) {
    let result = await reqVerifyCode(phone)
    if (result.code == 200) {
      commit('GETVERIFYCODE', result.data)
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async getUserRegitser({ commit }, data) {
    let result = await reqRegister(data)
    if (result.code == 200) {
      console.log('注册成功')
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
