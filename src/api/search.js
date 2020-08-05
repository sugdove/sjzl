import request from '@/utils/request'

// 获取专题及其下面的资产列表
export function getList() {
  return request({
    url: '/metadata/label/getAllLabelAndAssert',
    method: 'get',
  })
}
// 搜索获取资产信息条数
export function getRecordCount(params) {
  return request({
    url: '/es/getMatchDataCountByKeyword',
    method: 'post',
    data:params
  })
}
// 通过资产信息获取其详情
export function getAssetsDetails(params) {
  return request({
    url: '/es/searchDataByKeywordAndPage',
    method: 'post',
    data:params
  })
}
// 通过上传文件获取信息
export function upload(params) {
  return request({
    url: '/es/extractNumberFromUploadFile ',
    method: 'post',
    data:params
  })
}