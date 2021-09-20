import request from '@/utils/request'

export function saveUploadFiles(params) {
  return request({
    url: '/upload/saveFileData',
    method: 'post',
    data: params
  })
}

