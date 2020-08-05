/*
 * @Author: liyue
 * @Date: 2020-04-22 14:06:15
 * @LastEditTime: 2020-04-22 14:08:27
 * @LastEditors: Please set LastEditors
 * @Description: 请求门户
 * @FilePath: \data-management\src\utils\request_mh.js
 */
import axios from 'axios';
import { Notification, MessageBox } from 'element-ui';
import { getToken } from '@/utils/auth';
// 创建axios实例
const service = axios.create({

  // baseURL: server, // api 的 base_url
  // headers: { 'Access-Control-Allow-Origin': '*' },
  // withCredentials: true,
  timeout: 50000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    console.log(getToken())
    if (getToken()) {
      config.headers.Authorization = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.status
    if (code < 200 || code > 300) {
      Notification.error({
        title: response.message
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    let code = 0
    try {
      code = error.response.data.status
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        Notification.error({
          title: '网络请求超时',
          duration: 2500
        })
        return Promise.reject(error)
      }
      if (error.toString().indexOf('Error: Network Error') !== -1) {
        Notification.error({
          title: '网络请求错误',
          duration: 2500
        })
        return Promise.reject(error)
      }
    }
    if (code === 401) {
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {

      })
    } else if (code === 403) {
    } else {
      const errorMsg = error.response.data.message
      if (errorMsg !== undefined) {
        Notification.error({
          title: errorMsg,
          duration: 3000
        })
      }
    }
    return Promise.reject(error)
  }
)
export default service
