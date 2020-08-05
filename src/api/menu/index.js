/*
 * @Author: liyue
 * @Date: 2020-04-22 11:57:58
 * @LastEditTime: 2020-05-19 15:28:10
 * @LastEditors: Please set LastEditors
 * @Description: 门户接口
 * @FilePath: \data-management\src\api\menHu\index.js
 */
import request_mh from '@/utils/request_mh'
/**
 *
 * @param {*} params
 * portal = 0  0代表 后台菜单 1代表 面板展示
 * type = 2  1代表 菜单添加的菜单 2代表菜单授权的菜单
 */
export function buildMenus(params) {
  return request_mh({
    url: '/menhu/api/menus/build',
    method: 'get',
    params
  })
}
export function homeHeader(params) {
  return request_mh({
    url: '/menhu/api/menus/head',
    method: 'get',
    params
  })
}
export function msgStatus(params) {
  return request_mh({
    url: '/menhu/api/msg/total',
    method: 'get',
    params
  })
}
// 获取头像
export function getAvatar(query) {
  return request_mh({
    url: '/menhu/auth/info',
    method: 'get',
    params: query
  })
}
