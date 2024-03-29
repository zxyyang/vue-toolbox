
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
export function add(param) {
  return request({
    url: '/note/add',
    method: 'post',
    data: param
  })
}
export function update(params) {
  return request({
    url: '/note/update',
    method: 'POST',
    data: params
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

export function uploadFiles(params) {
  return request({
    url: '/cloudFile/noteAddImage',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function deleteFiles(params) {
  return request({
    url: '/cloudFile/noteDeleteImage',
    method: 'post',
    params

  })
}
