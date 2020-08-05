import axios from 'axios'
import {
  Message,
  MessageBox,
  Notification
} from 'element-ui'

// create an axios instance
const service = axios.create({
  // baseURL: apiUrl, // api的base_url-打包上线用
  timeout: 500000 // request timeout
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status !== 200 && res.status !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    const response = error.response
    if (response === undefined) {
      Message({
        message: '服务请求超时！',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
    if (response.status === 400) {
      Message({
        message: '账户或密码错误！',
        type: 'warning'
      })
      return Promise.reject('error')
    }
    const info = response.data
    if (response.status === 401 && info.status === 40101) {
      cookie.remove('Authorization')
      location.reload() // 为了重新实例化vue-router对象 避免bug
      /* store.dispatch('LogOut').then(() => {

        })*/
    }
    if (response.status === 401 && info.status === 40001) {
      Notification.warning({
        title: '禁止',
        message: info.message,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject('error')
    }
    if (response.status === 403) {
      Notification.warning({
        title: '禁止',
        message: info.message,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject('error')
    }
    if (info.status === 30101) {
      Notification.warning({
        title: '失败',
        message: info.message,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject('error')
    }
    if (response.status === 504) {
      Message({
        message: '后端服务异常，请联系管理员！',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default service
