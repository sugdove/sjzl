/**
 * Created by user on 2019/4/3.
 */
import request from '@/lib/utils/request'
//获取Agent列表
export const getAgentsList  = () =>{
  return request({
    url:'http://localhost:3001/agents',
    method:'get'
  })
}

//通过ID获取Agent
export const getAgentById = (id) => {
  return request({
    url: `http://localhost:3001/agents/${id}`,
    method: 'get'
  })
}

// 修改agent
export const changeAgent = params => {
  return request({
    url: `http://localhost:3001/agents/${params.id}`,
    method: 'put',
    data: {body:params}
  })
}
