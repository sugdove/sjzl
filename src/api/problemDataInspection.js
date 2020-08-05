import request from "@/utils/request";
const prefixUrl = ''
// 数据治理列表
export const getTable = params => {
  return request({
    // url: prefixUrl + '/curd_/dsgLable/lableList',
    url: prefixUrl + `/curd_/dsgDataGovern/query`,
    method: "get",
    params
  });
};

// 数据治理详情列表
export const getDetailTable = params => {
  return request({
    // url: prefixUrl + '/curd_/dsgLable/lableList',
    url: prefixUrl + `/curd_/dsgDataGovern/query/${params.id}`,
    method: "get",
    params
  });
};
// 数据治理字段列表
export const getFields = params => {
  return request({
    // url: prefixUrl + '/curd_/dsgLable/lableList',
    url: prefixUrl + `/curd_/dsgDataGovern/query/fields`,
    method: "get",
    params
  });
};
// 数据治理总数
export const getDetailNumber = params => {
  return request({
    // url: prefixUrl + '/curd_/dsgLable/lableList',
    url: prefixUrl + `/curd_/dsgDataGovern/query/total/${params.id}`,
    method: "get",
    params
  });
};

// 数据治理统计信息
export const getDetailBox = (params) => {
  return request({
    // url: prefixUrl + '/curd_/dsgLable/lableList',
    url: prefixUrl + `/curd_/dsgDataGovern/query/statistics`,
    method: "get",
    params:params
  });
};

//chart1统计信息
export const getChart1 = (params) => {
  return request({
    url: prefixUrl + `/curd_/dsgDataGovern/query/statistics/invalid`,
    method: "get",
    params:params
  });
};

//chart2统计信息
export const getChart2 = (params) => {
  return request({
    url: prefixUrl + `/curd_/dsgDataGovern/query/statistics/govern`,
    method: "get",
    params:params
  });
};

// 数据整改
export const updateErrorData = (params) => {
  return request({
    url: prefixUrl + `/curd_/dsgDataGovern/updateErrorData`,
    method: "post",
    data:params
  });
};