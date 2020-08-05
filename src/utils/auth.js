/*
 * @Author: your name
 * @Date: 2019-06-19 18:53:43
 * @LastEditTime: 2020-05-10 10:56:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \data-management\src\utils\auth.js
 */
import Cookies from 'js-cookie'

const TokenKey = 'Authorization'
const TokenKeyForMenhu = 'JOYADATA-TOEKN'

// 删除所有的cookies
function clearAllCookie() {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i--;) {
      Cookies.remove(keys[i])
    }
  }
}
/**
 * @description: 获取token,如果Authorization存在就返回，否则去获取TokenKeyForMenhu 如果存在就如写入ckooie
 * @return: token
 */
export function getToken() {
  if (Cookies.get(TokenKey)) {
    return Cookies.get(TokenKey)
  } else {
    const jTOEKN = Cookies.get(TokenKeyForMenhu)
    if (jTOEKN) {
      return Cookies.set(TokenKey, jTOEKN, {
        expires: 1
      })
    }
    return Cookies.get(TokenKeyForMenhu)
  }
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {
    expires: 1
  })
}

export function removeToken() {
  clearAllCookie()
  return Cookies.remove(TokenKey)
}
export function removeTokenMh() {
  clearAllCookie()
  return Cookies.remove(TokenKeyForMenhu)
}
// 解析地址栏参数
// 获取地址栏参数
export function getQueryParams(variable) {
  // 判断地址栏是否有参数
  if (window.location.href.includes('?')) {
    const query = window.location.href.split('?')[1]
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return 'ZCGL';
  } else if (window.location.hash.includes('/subjectmsa')) { // 如果没有参数，判断是否为专题分析页面
    return 'ZTFX'
  }
  // 默认为ZCGL
  return 'ZCGL';
}
