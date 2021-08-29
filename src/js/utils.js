/**
 *
 * 时间戳 to 时间
 */
const timestampToTime = timestamp => {
  console.log(timestamp)

  const date = new Date(timestamp)

  const Y = date.getFullYear() + '-'
  const M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  const D = date.getDate() + ' '
  const h = date.getHours() + ':'
  const m = date.getMinutes() + ':'
  const s = date.getSeconds()

  return Y + M + D + h + m + s
}
const downloadFile = (fileJson) => {
  const data = fileJson

  const url = data.fileUrl
  const name = data.fileName
  if (url.indexOf('.txt') !== -1) {
    downloadFile_txt_getUrl(url, name)
    return
  }

  if (url.indexOf('.bmp') !== -1 || url.indexOf('.jpg') !== -1 || url.indexOf('.png') !== -1 || url.indexOf('.tif') !== -1 || url.indexOf('.gif') !== -1 || url.indexOf('.psd') !== -1 || url.indexOf('.svg') !== -1) {
    console.log(name)
    downloadIamge(url, name)
    return
  }
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  document.body.appendChild(link)
  link.click()
}

const downloadIamge = (imgsrc, name) => { // 下载图片地址和图片名
  var image = new Image()
  // 解决跨域 Canvas 污染问题
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = function() {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    const url = canvas.toDataURL('image/png')
    // 得到图片的base64编码数据

    const a = document.createElement('a') // 生成一个a元素
    const event = new MouseEvent('click') // 创建一个单击事件
    a.download = name || 'photo' // 设置图片名称
    a.href = url // 将生成的URL设置为a.href属性
    a.dispatchEvent(event) // 触发a的单击事件
  }
  image.src = imgsrc
}

// 如果下载的文件是 txt，浏览器会自动打开而不是下载。
const downloadFile_txt_getUrl = (url, name) => {
  url = url.replace('http://webdisk-kum.oss-cn-shanghai.aliyuncs.com/', '/aly/')
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open('get', url, true)
  xmlHttp.send()
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4) {
      // 4表示执行完成
      if (xmlHttp.status === 200) {
        var aLink = document.createElement('a')
        aLink.download = name // 设置a标签的下载名字
        aLink.style.display = 'none'
        // 字符内容转变成blob地址
        var blob = new Blob([xmlHttp.responseText])
        aLink.href = URL.createObjectURL(blob)
        // 触发点击
        document.body.appendChild(aLink)
        aLink.click()
        // 然后移除
        document.body.removeChild(aLink)
      }
    }
  }
}

export default {
  timestampToTime,
  downloadFile
}
