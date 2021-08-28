<template>
  <div class="file_main" style="background-color: #FFFFFF !important;">

    <div class="file_head">
      <div class="file_head_left" style="float:left ;margin-bottom: 25px">
        <a-input-search
          placeholder="搜索文件"
          style="width: 200px"
        />
        <!--        上传文件，以及上传的端口填写位置-->
        <a-upload
          class="upload_but"
          name="file"
          :multiple="true"
          action="/dev-api/cloudFile/upload"
          :data="uploadData"
          :beforeupload="uploadBeforeUpload"
          :show-upload-list="true"
          @change="uploadFileHandle"
        >
          <a-button type="primary"> <a-icon type="upload" />上传 </a-button>
        </a-upload>
        <a-button
          :disabled="isDirDisable || multiDirDisable"
          @click="downloadFile"
        >
          <a-icon type="download" />下载
        </a-button>
        <a-button>
          <a-icon type="folder-add" />新建文件夹
        </a-button>
        <a-button> <a-icon type="delete" />删除 </a-button>
        <a-button>
          <a-icon type="block" />移动
        </a-button>
        <a-button
          :disabled="isDirDisable || multiDirDisable"
          @click="shareFile"
        >
          <a-icon type="branches" />分享
        </a-button>
        <a-button>
          <a-icon type="delete" />清空回收站
        </a-button>
      </div>
      <div class="file_head_right" style="margin-left: 60vw;" />
      <br><br>
      <a-divider />
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item v-for="(item, index) in path" :key="index">
          <a-button
            class="breadcrumb_but"
            type="link"
          >{{ item }}</a-button>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="table">
      <a-table
        class="filesTable"
        :data-source="filesList"
        :pagination="false"
        :loading="skeleton_loading"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
      >

        <a-table-column key="name" title="文件名称" data-index="name">
          <template slot-scope="name">
            <span>
              <a-icon class="file_ico" :type="checkType(name)" />
              <a-button
                type="link"
                @click="
                  if (name.substr(name.length - 1) == '/') {
                    clickDir(name)
                  } else {
                    clickFile(name)
                  }
                "
              >{{ name }}</a-button>
            </span>
          </template>
        </a-table-column>
        <a-table-column key="size" title="文件大小" data-index="size">
          <template slot-scope="size">
            {{ updateFileSize(size) }}
          </template>
        </a-table-column>
        <a-table-column
          key="mimeType"
          title="文件类型"
          data-index="mimeType"
        >
          <template slot-scope="mimeType">
            <span>{{ mimeType }}</span>
          </template>
        </a-table-column>
        <a-table-column
          key="putTime"
          title="修改时间"
          data-index="putTime"
        >
          <template slot-scope="putTime">
            <span>{{ putTime }}</span>
          </template>
        </a-table-column>
      </a-table>
    </div>
    <el-dialog
      title="选择目标文件夹"
      :visible.sync="moveFileDialogVisible"
      width="40%"
    >
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        :bordered="true"
        sub-title="返回上一层"
        @back="moveClickUp"
      />
    </el-dialog>
    <!--    打开上传文件窗口-->
    <a-modal
      v-model="uploadFileVisible"
      title="上传文件"
      :mask-closable="false"
    >  <a-upload
      class="upload_but"
      name="file"
      :multiple="true"
      action="/dev-api/cloudFile/upload"
      :data="uploadData"
      :beforeupload="uploadBeforeUpload"
      :show-upload-list="true"
      @change="uploadFileHandle"
    >
      <a-button type="primary"> <a-icon type="upload" />上传 </a-button>
    </a-upload>

    </a-modal>

    <el-dialog
      title="预览"
      class="preView_diaglog"
      :visible.sync="preViewVisible"
      width="50%"
      top="5vh"
      :close-on-click-modal="false"
    >
      <a-textarea
        v-if="preViewType == 'txt'"
        v-model="preViewText"
        :disabled="true"
        :auto-size="{ minRows: 18 }"
        style="color: #000;background-color: #fff;height: 60vh;"
      />
      <img v-if="preViewType == 'img'" :src="previewSrc">
    </el-dialog>
    <a-modal
            v-model="shareFileDialogVisible"
            title="分享文件"
            @ok="shareFileDialogVisible = flase"
            okText="确定"
            cancelText="取消"
            :maskClosable="false"
    >
      <a-spin tip="正在生成分享秘钥..." :spinning="share_loading">
        <span>分享类型：</span>
        <a-radio-group
                default-value="private"
                button-style="solid"
                @change="shareTypeChange"
        >
          <a-radio-button value="private">
            私密
          </a-radio-button>
          <a-radio-button value="public">
            公开
          </a-radio-button>
        </a-radio-group>
        <br />
        <div class="share_text">
          <span>文件秘钥：</span>
          <a-input
                  class="share_input"
                  v-model="shareKey"
                  placeholder="秘钥"
                  style="margin-top: 10px;"
          >
            <a-tooltip slot="suffix" title="将这个发送给你的好友~">
              <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
            </a-tooltip>
          </a-input>
          <div class="share_private_pwd" v-if="shareIsPrivate">
            <span>提取密码：</span>
            <a-input
                    class="share_input_pwd"
                    v-model="sharePwd"
                    placeholder="提取码"
                    style="margin-top: 10px;"
            />
          </div>
        </div>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import utils from '../../js/utils'
import { list, uploadFiles, download } from '../../api/cloudDisk'

export default {

  name: 'Files',
  components: { },
  data() {
    return {
      isDirDisable: false,
      multiDirDisable: false,
      shareFileDialogVisible: false,
      preViewVisible: false,
      previewSrc: '',
      preViewType: 'txt',
      preViewText: '',
      uploadFileVisible: false,
      uploadData: {
        path: ''
      },
      filesList: [],
      skeleton_loading: false,
      selectedRowKeys: []
    }
  },
  watch: {
    path: {
      handler(newValue, oldValue) {
        if (newValue[newValue.length - 1] === '搜索到的文件') {
          return
        }
        let currentPath = ''
        for (let i = 1; i < newValue.length; i++) {
          currentPath += newValue[i] + '/'
        }
        // 此处理应使用 computed 去写..
        // console.log(currentPath)

        this.uploadData.path = '/' + currentPath
        this.currentPath = '/' + currentPath
        this.getFileList(this.currentPath)
        this.selectedRowKeys = []
      }
    }

  },

  created() { },
  mounted() {
    this.currentPath = '/'
    // 获取用户根目录内容
    this.getFileList(this.currentPath)
  },
  methods: {
    shareFile() {
      if (this.selectedRowKeys.length === 0) {
        return
      }
      this.shareFileDialogVisible = true
      this.shareFile_fun()
    },

    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    // 获取当前目录下文件列表
    getFileList(path) {
      this.skeleton_loading = true
      list({ path: path }).then(res => {
        const data = res.data
        this.setFileList(data)
        this.skeleton_loading = false
      })
    },
    // 设置文件列表内容
    setFileList(data) {
      this.filesList = []

      if (data === null) {
        return
      }

      const file_arr = []
      data.forEach(row => {
        if (row.size === 0) {
          return
        }
        // 为了保证文件列表中文件夹在文件上面，优先将「文件夹」push进文件列表。
        if (row.name.charAt(row.name.length - 1) === '/') {
          this.filesList.push(row)
          return
        }
        file_arr.push(row)
      })
      this.filesList = this.filesList.concat(file_arr)
    },
    // 上传文件
    uploadFiles(parm) {
      const param = {
        file: parm.file,
        path: parm.path
      }
      uploadFiles(param).then(res => {
        this.getFileList()
      })
    },
    // 下载文件
    downloadFile() {
      const len = this.selectedRowKeys.length
      if (len === 0 || len > 1) {
        return
      }
      const path = this.filesList[this.selectedRowKeys[0]].name

      download(path).then(res => {
        const fileJson = res.data
        this.downloadFile_fun(fileJson)
      })
    },
    downloadFile_fun(fileJson) {
      utils.downloadFile(fileJson)
    },
    // 计算文件大小
    updateFileSize(size) {
      if (size == null) {
        return '-'
      }
      let size_ = '0'
      let type = 'B'
      if (size < 1000) {
        size_ = size
      } else if (size > 1000 && size < 1000000) {
        size_ = size / 1000
        type = 'K'
      } else {
        size_ = size / 1000000
        type = 'M'
      }
      return Math.round(size_ * 10) / 10 + type
    },
    // 选择文件图标
    checkType(name) {
      // console.log(name.substr(name.indexOf('.') + 1))
      if (name.charAt(name.length - 1) === '/') {
        return 'folder'
      }
      if ((name.substr(name.indexOf('.') + 1)).indexOf('云端获取失败') != -1) {
        return 'exception'
      }
      switch (name.substr(name.indexOf('.') + 1)) {
        case 'txt':
          return 'file-text'
          break
        case 'pdf':
          return 'file-pdf'
          break
        case 'png':
          return 'file-image'
          break
        case 'jpg':
          return 'file-jpg'
          break
        case 'jpeg':
          return 'file-image'
          break
        case 'gif':
          return 'file-image'
          break
        case 'zip':
          return 'file-zip'
          break
        case 'doc':
          return 'file-word'
          break
        case 'docx':
          return 'file-word'
          break
        case 'rtf':
          return 'file-word'
          break
        case 'xlsx':
          return 'file-excel'
          break
        case 'ppt':
          return 'file-ppt'
          break
        case 'pptx':
          return 'file-ppt'
          break
        case 'md':
          return 'file-markdown'
          break
        case 'java':
          return 'code'
          break
        case 'class':
          return 'file-project'
          break
        case 'sql':
          return 'code'
          break
        case 'vue':
          return 'layout'
          break
        case 'html':
          return 'layout'
          break
        case 'py':
          return 'code'
          break
        case 'cpp':
          return 'code'
          break
        case 'c':
          return 'code'
          break

        default:
          return 'file'
          break
      }
    },
    // 判断文件上传是否成功
    uploadFileHandle(info) {
      const status = info.file.status
      if (status === 'done' || status === 'error') {
        if (status === 'done') {
          this.$message.success('上传成功！')
          // 更新当前地址文件
          this.getFileList(this.currentPath)
        } else if (status === 'error') {
          this.$message.warning('上传失败！文件大于2G或空间不足！')
        }
        this.$emit('changeUploadList', '0')
      }
    },
    // 上传文件中
    uploadBeforeUpload(file) {
      // console.log(file.name)
      let name = file.name
      if (name.length > 13) {
        name = name.substr(0, 10) + '...'
      }
      const param = {
        file: file,
        filePath: this.currentPath
      }
      uploadFiles(param).then(res => {
        if (res.code === 200) {
          this.$message.success('上传成功了哦！')
          this.getFileList()
        } else {
          this.$message.error('艹!失败了')
        }
      })
    },
    // 检查点击的是目录还是文件夹
    clickDir(name) {
      // 当点击的是文件夹时

      const currentPath1 = this.currentPath + name
      // 清空当前选中的文件。
      this.selectedRowKeys = []
      // 获取新的文件
      this.getFileList(currentPath1)
    },
    clickFile(name) {
      // 当点击的是文件时
      const type = name.substr(name.indexOf('.') + 1)
      this.previewSrc = ''
      if (
        type === 'jpg' ||
              type === 'png' ||
              type === 'bmp' ||
              type === 'gif' ||
              type === 'jpeg'
      ) {
        this.preViewType = 'img'
      } else if (type === 'txt') {
        this.preViewType = 'txt'
      } else {
        // 如果不是上述格式，则不允许预览
        return
      }
      download(name).then(res => {
        const data = res.data
        console.log(data)
        const url = res.data.fileUrl
        if (this.preViewType === 'img') {
          this.previewSrc = url
        } else {
          url = url.substr(47)
          // eslint-disable-next-line no-undef
          Axios.get(url).then(ress => {
            this.preViewText = ress.data
          })
        }

        this.preViewVisible = true
      })
    }

  }
}
</script>
<style scoped>
.filesTable {
  margin-top: 15px;
}
.breadcrumb_but {
  margin: 0px;
  padding: 0px;
}
.ant-btn-link {
  color: black;
}
.upload_but {
  margin-left: 10px;
  /* float: left; */
  margin-right: 5px;
}
.file_ico {
  position: relative;
  top: 3px;
  font-size: 2.5rem;
}

.moveFile_but {
  margin-top: 15px;
  margin-right: 5px;
  width: 150px;
}
.ant-page-header {
  border: 0px;
}
.ant-btn-link {
  color: black;
}
.ant-divider-horizontal {
  margin: 10px 0px;
}
.share_input {
  margin-top: 10px;
  max-width: 200px;
}
.share_input_pwd {
  margin-top: 10px;
  max-width: 100px;
}
.ant-table-body {
  max-height: 70vh;
  overflow: auto;
}

.preView_diaglog .el-dialog__body {
  padding: 0px;
}
.preView_diaglog .el-dialog__body iframe {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #606266;
}
.preView_diaglog .el-dialog__body img {
  width: 100%;
}

div.popContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}
</style>
