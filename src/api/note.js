
import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/note/list',
    method: 'get',
    params
  })
}
export function getContent(params) {
  return request({
    url: '/note/selectById',
    method: 'get',
    params
  })
}
