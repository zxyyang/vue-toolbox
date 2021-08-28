import request from '@/utils/request'
export function list(params) {
  return request({
    url: '/cloudFile/listByPath',
    method: 'get',
    params
  })
}

export function uploadFiles(params) {
  return request({
    url: '/cloudFile/upload',
    method: 'post',
    params
  })
}

export function download(params) {
  const param = {
    fileName: params
  }
  return request({
    url: '/cloudFile/downLoad',
    method: 'get',
    params: param
  })
}

