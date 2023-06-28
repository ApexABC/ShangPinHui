import { reqAddToCart, reqGetGoodsDetail } from '@/api'
import { getUUID } from '@/utils/uuid_token'
const state = {
  goodsDetailList: {},
  // 游客临时身份
  uuid_token: getUUID()
}
const mutations = {
  GETGOODSDETAIL(state, data) {
    state.goodsDetailList = data
  }
}
const actions = {
  async getGoodsDetail(context, skuId) {
    let result = await reqGetGoodsDetail(skuId)
    if (result.code == 200) {
      context.commit('GETGOODSDETAIL', result.data)
    }
  },
  // 添加到购物车
  async getAddToCart(context, { skuId, skuNum }) {
    let result = await reqAddToCart(skuId, skuNum)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {
  categoryView(state) {
    return state.goodsDetailList.categoryView || {}
  },
  skuInfo(state) {
    return state.goodsDetailList.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodsDetailList.spuSaleAttrList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
