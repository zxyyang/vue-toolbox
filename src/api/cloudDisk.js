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
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }

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
export function makeDir(params) {
  return request({
    url: '/cloudFile/makeDir',
    method: 'post',
    params
  })
}
export function deleteFile(params) {
  const param = {
    name: params.join(',')
  }
  return request({
    url: '/cloudFile/batchDelete',
    method: 'post',
    params: param
  })
}
export function selectByName(params) {
  return request({
    url: '/cloudFile/selectByName',
    method: 'GET',
    params
  })
}
