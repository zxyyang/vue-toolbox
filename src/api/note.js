
import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/note/list',
    method: 'get',
    params
  })
}
export function getContent(id) {
  const param = {
    id: id
  }
  return request({
    url: '/note/selectById',
    method: 'get',
    params: param
  })
}
export function add(params) {
  return request({
    url: '/note/add',
    method: 'post',
    params
  })
}
export function update(params) {
  return request({
    url: '/note/update',
    method: 'POST',
    params
  })
}
export function selectByName(params) {
  return request({
    url: '/note/selectByName',
    method: 'get',
    params
  })
}
export function deleteNote(params) {
  return request({
    url: '/note/delete',
    method: 'post',
    params
  })
}
