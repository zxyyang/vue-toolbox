import request from '@/utils/request'

export function listRemind(params) {
  return request({
    url: '/wx/listRemind',
    method: 'get',
    params
  })
}
export function deleteRemind(params) {
  return request({
    url: '/wx/deleteRemind',
    method: 'get',
    params
  })
}
export function addRemind(param) {
  // const params = {
  //   remindVo: param
  // }
  return request({
    url: '/wx/addRemind',
    method: 'post',
    data: param
  })
}
