// 此模块对api进行统一管理
import requests from './request'
import mockRequest from './mockAjax'
// 三级联动的接口
export const reqCategoryList = () => {
  return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

// 获取banner
export const reqGetBannerList = () => mockRequest.get('/banner')
// 获取floor
export const reqFloorList = () => mockRequest.get('/floor')
// 获取搜索模块数据
export const reqGetSearchList = (params) =>
  requests({
    url: '/list',
    method: 'post',
    data: params
  })
// 获取商品详情
export const reqGetGoodsDetail = (skuId) => requests.get(`/item/${skuId}`)
// 将产品更新到购物车中，或者更新产品数量
export const reqAddToCart = (skuId, skuNum) =>
  requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
// 获取购物车数据
export const reqCartList = () => requests.get('/cart/cartList')
// 删除购物车商品
export const reqDeleteCart = (skuId) => requests.delete(`/cart/deleteCart/${skuId}`)
// 切换商品选择状态
export const reqCheckCart = (skuId, isChecked) => requests.get(`/cart/checkCart/${skuId}/${isChecked}`)
// 获取验证码
export const reqVerifyCode = (phone) => requests.get(`/user/passport/sendCode/${phone}`)
// 注册用户
export const reqRegister = (data) =>
  requests({
    url: '/user/passport/register',
    method: 'post',
    data
  })
// 登录
export const reqLogin = (data) =>
  requests({
    url: '/user/passport/login',
    method: 'post',
    data
  })
// 获取用户信息（需要token）
export const reqUserInfo = () => requests.get('/user/passport/auth/getUserInfo')
// 退出登录
export const reqLogout = () => requests.get('/user/passport/logout')
// 获取用户地址信息
export const reqAddressInfo = () => requests.get('/user/userAddress/auth/findUserAddressList')
// /order/auth/trade  /user/userAddress/auth/findUserAddressList
// 获取商品清单
export const reqTradeInfo = () => requests.get('/order/auth/trade')
// 提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })
// 获取订单支付信息
export const reqPayment = (orderId) => requests.get(`/payment/weixin/createNative/${orderId}`)
// 查询支付订单状态
export const reqPayStatus = (orderId) => requests.get(`/payment/weixin/queryPayStatus/${orderId}`)
// 获取订单列表
export const reqMyOrderList = (page, limit) => requests.get(`/order/auth/${page}/${limit}`)
