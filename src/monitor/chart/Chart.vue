<template>
  <div>

    <div>
      <uploader
        ref="uploader"
        :options="options"
        :file-status-text="statusText"
        class="uploader-example"
        style="width: 100%;"
        @file-success="fileSuccess"
      >
        <uploader-unsupport />
        <uploader-drop>
          <p>大文件秒传测试</p>
          <uploader-btn>选择文件</uploader-btn>

        </uploader-drop>
        <div v-if="showList">
          <uploader-list />
        </div>
      </uploader>
    </div>
  </div>
</template>

<script>

// import { saveUploadFiles } from '@/api/upload'

export default {

  data() {
    return {
      showList: false,
      recording: {},
      options: {
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
        target: 'http://localhost:8888/api/upload/upload',
        testChunks: false, // 不校验
        chunkSize: '102400000',
        maxChunkRetries: 5, // 最大自动失败重试上传次数
        singleFile: true, // 单文件上传,
        simultaneousUploads: 1
        // processParams(params) { // 每一次分片传给后台的参数，params是该方法返回的形参，包含分片信息
        //   return { // 返回一个对象，会添加到每一个分片的请求参数里面
        //     name: params.filename,
        //     code: params.identifier,
        //     total: params.totalChunks,
        //     index: params.chunkNumber,
        //   }
        // }
      },
      statusText: {
        success: '上传成功',
        error: '上传失败',
        uploading: '上传中',
        paused: '暂停中',
        waiting: '等待中'
      }
    }
  },
  mounted() {
    // 获取uploader对象
    this.$nextTick(() => {
      window.uploader = this.$refs.uploader.uploader
      this.showList = true
    })
  },
  methods: {

    // 上传成功的事件
    fileSuccess(rootFile, file, message, chunk) {
      // 将面试邀请code和文件路径去保存到数据库中
      // var fileName = rootFile.file.name
      // const param = {
      //   fileName: fileName,
      //   path: 'Ceshimul'
      // }
      // saveUploadFiles(param).then(res => {
      //   if (res.code === 200) {
      //     this.$message.success(res.msg)
      //   } else {
      //     alert(res.msg)
      //     this.$message.error(res.msg)
      //   }
      // }).catch(function(error) {
      //   alert('上传失败')
      //   this.$message.success(error)
      // })
    }
  }
}
</script>

<style>
.uploader-example {
  width: 100%;
  padding: 15px;
  margin: 50px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
