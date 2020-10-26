import axios from 'axios'
import { getUser } from '@/utils/storage.js'
import JSONbig from 'json-bigint'

const http = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function (data) {
    // console.log(data)// 这里的data是字符串，在这个字符串的是没有丢失精度的，所以需要在这里先把精度调好
    try {
      // 作用1：把json字符串转为js对象
      // 作用2：把里面的大数字做安全处理
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

// 添加请求拦截器(所有axios请求 在发送之前 都会先经过这个请求拦截器)
http.interceptors.request.use(function (config) {
  const userInfo = getUser()
  // console.log(config)   打印config  中 有headers 这个项 所以   在这的拦截器设置了 每次请求前经过这里时  就给请求的带上token了
  config.headers.Authorization = `Bearer ${userInfo.token}`
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default http
