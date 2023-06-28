// 对axios进行二次封装
import axios from 'axios'

import nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' //引入进度条样式

// 创建一个axios实例
const requests = axios.create({
  // 基础路径
  baseURL: '/mock',
  // 代表请求超时的时间5s
  timeout: 5000
})
// 请求拦截器：请求之前可以检测到，可以请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  // config配置对象，对象里面有一个属性很重要，请求头
  // 进度条开始启动
  nprogress.start()
  return config
})
// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 进度条结束
    nprogress.done()
    // 成功的回调函数
    return res.data
  },
  (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'))
  }
)

export default requests
