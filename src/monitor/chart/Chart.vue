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

export default {

  data() {
    return {
      showList: false,
      recording: {},
      options: {
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
        target: 'http://localhost:8888/api/upload/upload',
        testChunks: false, // 不校验
        chunkSize: '10240000'
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
      this.showList =true
    })
  },
  methods: {
    // 上传成功的事件
    fileSuccess(rootFile, file, message, chunk) {
      console.log(message)
      // 将面试邀请code和文件路径去保存到数据库中
      var href = location.href
      var split = href.split('?')
      var invCode = split[1]
      this.recording.invCode = invCode
      this.recording.recordingUrl = message
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
