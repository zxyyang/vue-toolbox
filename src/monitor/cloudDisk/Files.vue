<template>
  <div class="file_main" style="background-color: #FFFFFF !important;">

    <div class="file_head">
      <div class="file_head_left" style="float:left ;margin-bottom: 25px">
        <a-input-search
          v-model="searchFileText"
          placeholder="搜索文件"
          style="width: 200px"
          @search="searchFile"
        />
        <!--        上传文件，以及上传的端口填写位置-->
        <a-upload
          class="upload_but"
          name="file"
          :multiple="true"
          action="/api/cloudFile/upload"
          :data="{path: currentPath}"
          :before-upload="uploadBeforeUpload"
          :show-upload-list="true"
          @change="uploadFileHandle"
        >
          <a-button type="primary">
            <a-icon type="upload" />
            上传
          </a-button>
        </a-upload>
        <a-button
          @click="downloadFile"
        >
          <a-icon type="download" />
          下载
        </a-button>
        <a-button @click="mkDirDialogVisible_fun">
          <a-icon type="folder-add" />
          新建文件夹
        </a-button>
        <a-button @click="deleteFile">
          <a-icon type="delete" />
          删除
        </a-button>
        <a-button>
          <a-icon type="block" />
          移动
        </a-button>
        <a-button
          :disabled="isDirDisable || multiDirDisable"
          @click="shareFile"
        >
          <a-icon type="branches" />
          分享
        </a-button>
        <a-button>
          <a-icon type="delete" />
          清空回收站
        </a-button>
      </div>
      <div class="file_head_right" style="margin-left: 60vw;" />
      <br><br>
      <a-divider />
      <!--      目录结构面包屑-->
      <a-breadcrumb style="margin: 16px 0 ;margin-left: 15px; ">
        <a-breadcrumb-item v-for="(item, index) in path" :key="index">
          <a-button
            style="font-weight: 500;font-size: 15px"
            class="breadcrumb_but"
            type="link"
            @click="clickBreadcrumb(index)"
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
              <div>
                <div style=" margin-left: 10px">  <a-icon class="file_ico" style="font-size:30px;justify-content: center;" :type="checkType(name)" /></div>
                <div><a-button type="link" @click="if (name.substr(name.length - 1) === '/') {clickDir(name)} else {clickFile(name)}">{{ name.replace(/\/$/, '') }}</a-button></div>
              </div>
              <!--              name.charAt(name.length-1)=== '/' ? name.replace('/',''): name-->
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
    <!--    <el-dialog
      title="选择目标文件夹"
      :visible.sync="moveFileDialogVisible"
      width="40%"
    >
&lt;!&ndash;      <a-page-header&ndash;&gt;
&lt;!&ndash;        style="border: 1px solid rgb(235, 237, 240)"&ndash;&gt;
&lt;!&ndash;        :bordered="true"&ndash;&gt;
&lt;!&ndash;        sub-title="返回上一层"&ndash;&gt;
&lt;!&ndash;        @back="moveClickUp"&ndash;&gt;
&lt;!&ndash;      />&ndash;&gt;
    </el-dialog>-->
    <!--    打开上传文件窗口-->
    <a-modal
      v-model="uploadFileVisible"
      title="上传文件"
      :mask-closable="false"
    >
      <a-upload
        class="upload_but"
        name="file"
        :multiple="true"
        action="/api/cloudFile/upload"
        :data="uploadData"
        :before-upload="uploadBeforeUpload"
        :show-upload-list="true"
        @change="uploadFileHandle"
      >
        <a-button type="primary">
          <a-icon type="upload" />
          上传
        </a-button>
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
        v-if="preViewType === 'txt'"
        v-model="preViewText"
        :disabled="true"
        :auto-size="{ minRows: 18 }"
        style="color: #000;background-color: #fff;height: 60vh;"
      />
      <img v-if="preViewType === 'img'" :src="previewSrc">

      <iframe v-if="preViewType === 'video'" :src="previewSrc" style="height: 500px; " width="100%" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen />
      <!--      <d-player ref="player" class="dplayer-root" :options="options" />-->

    </el-dialog>
    <a-modal
      v-model="mkdirDialogVisible"
      title="新建文件夹"
      ok-text="确定"
      cancel-text="取消"
      :mask-closable="false"
      @ok="mkdir(mkdir_input)"
    >
      <p>文件夹会建立在当前目录下</p>
      <a-input
        v-model="mkdir_input"
        class="mkdir_input"
        placeholder="输入文件夹名称"
      />
    </a-modal>
    <a-modal
      v-model="deleteVisible"
      title="删除文件"
      ok-text="确定"
      :mask-closable="false"
      @ok="deleteVisible=false"
    >
      <a-table :data-source="deleteResultList">
        <a-table-column key="name" title="文件名称" data-index="name">
          <template slot-scope="name">
            <span>{{ name }}</span>
          </template>
        </a-table-column>
        <a-table-column key="result" title="删除结果" data-index="result">
          <template slot-scope="result">
            <span>{{ result }}</span>
          </template>
        </a-table-column>
      </a-table>
    </a-modal>

    <!--    <a-modal
      v-model="shareFileDialogVisible"
      title="分享文件"
      ok-text="确定"
      cancel-text="取消"
      :mask-closable="false"
      @ok="shareFileDialogVisible = flase"
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
        <br>
        <div class="share_text">
          <span>文件秘钥：</span>
          <a-input
            v-model="shareKey"
            class="share_input"
            placeholder="秘钥"
            style="margin-top: 10px;"
          >
            <a-tooltip slot="suffix" title="将这个发送给你的好友~">
              <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
            </a-tooltip>
          </a-input>
          <div v-if="shareIsPrivate" class="share_private_pwd">
            <span>提取密码：</span>
            <a-input
              v-model="sharePwd"
              class="share_input_pwd"
              placeholder="提取码"
              style="margin-top: 10px;"
            />
          </div>
        </div>
      </a-spin>
    </a-modal>-->
  </div>
</template>

<script>
import Axios from 'axios'
import utils from '../../js/utils'
import { download, list, makeDir, uploadFiles, deleteFile, selectByName } from '../../api/cloudDisk'
import ATableColumn from 'ant-design-vue/es/table/Column'

export default {
  name: 'Files',
  components: { ATableColumn },
  // eslint-disable-next-line vue/require-prop-types
  props: ['mess'],
  data() {
    return {
      path: ['根目录'],
      searchFileText: '',
      deleteVisible: false,
      mkdirDialogVisible: false,
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
      deleteResultList: [],
      filesList: [],
      skeleton_loading: false,
      selectedRowKeys: [],
      mkdir_input: '文件夹',
      currentPath: '/'
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
        console.log(currentPath)

        this.uploadData.path = '/' + currentPath
        this.currentPath = '/' + currentPath
        this.getFileList(this.currentPath)
        this.selectedRowKeys = []
      }
    }

  },

  created() {
  },
  mounted() {
    this.currentPath = '/'
    // 获取用户根目录内容
    this.getFileList(this.currentPath)
  },
  methods: {
    // 目录面包屑
    clickBreadcrumb(index) {
      if (this.path[index] === '搜索到的文件') {
        return
      }
      this.path.splice(index + 1, this.path.length + 1)
    },
    // 显示新建文件夹
    mkDirDialogVisible_fun() {
      this.mkdirDialogVisible = true
    },
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
    // 创建文件夹
    mkdir(mkdir_input) {
      this.$message.error(mkdir_input)
      const param = {
        name: mkdir_input + '/',
        path: this.currentPath
      }
      makeDir(param).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.mkdir_input = ''
          this.mkdirDialogVisible = false
        } else {
          this.$message.error(res.msg)
        }
        this.getFileList(this.currentPath)
      })
    },
    // 删除
    deleteFile() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error('请选择需要删除的文件！')
        return
      }
      this.$message.info('正在删除中..')
      const taget = []
      let skip = false
      for (let i = 0; i < this.selectedRowKeys.length; i++) {
        const temp = this.filesList[this.selectedRowKeys[i]].name
        if (temp.substr(temp.length - 1) === '/') {
          skip = true
        }

        taget.push(temp)
      }
      if (skip) {
        // this.$message.error('删除文件夹下所有内容正在开发中...')
        this.$confirm('删除将导致目录下所有文件被删除,是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteFile_fun(taget)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
        // this.$confirm({
        //   title: '你选择了文件夹，确定删除吗？',
        //   content: '删除将导致目录下所有文件被删除。',
        //   okText: '确定',
        //   okType: 'danger',
        //   cancelText: '取消',
        //   onOk() {
        //     this.deleteFile_fun(taget)
        //     return
        //   },
        //   onCancel() {
        //     return
        //   }
        // })
      } else {
        this.deleteFile_fun(taget)
      }
    },
    // deleteFile 方法需要处理相关事件，所以另外编写了 deleteFile_fun。
    deleteFile_fun(taget) {
      deleteFile(taget).then(res => {
        if (res.code === 200) {
          this.deleteResultList = this.deleteResultList.concat(res.data)

          // 更新文件列表，也可以直接去删除 filelist.
          this.getFileList(this.currentPath)
          this.deleteVisible = true
          // 更新文件选中列表.
          this.selectedRowKeys = []
          this.$emit('changeUploadList', '0')
          return
        }
        this.$message.warning('未知错误。请刷新重试..')
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
    // 搜索
    searchFile() {
      const name = this.searchFileText
      if (name.trim().length === 0) {
        this.$message.warning('搜索内容不得为空！')
        return
      }
      selectByName({ name: name }).then(res => {
        this.setFileList(res.data)
        this.path.splice(1, this.path.length)
        this.path.push('搜索到的文件')
      })
    },
    // 下载文件
    downloadFile() {
      // const name = this.filesList[this.selectedRowKeys[0]].name
      for (let i = 0; i < this.selectedRowKeys.length; i++) {
        const name = this.filesList[this.selectedRowKeys[i]].name
        if (name.charAt(name.length - 1) === '/') {
          this.$message.error('不支持文件夹下载！')
          return
        }
        download(name).then(res => {
          const fileJson = res.data
          this.downloadFile_fun(fileJson)
        })
        console.log(name)
      }
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
      if ((name.substr(name.indexOf('.') + 1)).indexOf('云端获取失败') !== -1) {
        return 'exception'
      }
      switch (name.substr(name.indexOf('.') + 1)) {
        case 'txt':
          return 'file-text'
        case 'pdf':
          return 'file-pdf'
        case 'png':
          return 'file-image'
        case 'jpg':
          return 'file-jpg'
        case 'jpeg':
          return 'file-image'
        case 'gif':
          return 'file-image'
        case 'zip':
          return 'file-zip'
        case 'doc':
          return 'file-word'
        case 'docx':
          return 'file-word'
        case 'rtf':
          return 'file-word'
        case 'xlsx':
          return 'file-excel'
        case 'ppt':
          return 'file-ppt'
        case 'pptx':
          return 'file-ppt'
        case 'md':
          return 'file-markdown'
        case 'java':
          return 'code'
        case 'class':
          return 'code'
        case 'sql':
          return 'code'
        case 'vue':
          return 'layout'
        case 'html':
          return 'layout'
        case 'py':
          return 'code'
        case 'cpp':
          return 'code'
        case 'c':
          return 'code'

        default:
          return 'file'
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
          // this.$message.success('上传成功了哦！')
          this.getFileList()
        } else {
          // this.$message.error('艹!失败了')
        }
      })
    },
    // 检查点击的是目录还是文件夹
    clickDir(name) {
      // 当点击的是文件夹时改变路径名字
      this.path.push(name.substr(0, name.length - 1))
      this.currentPath = this.currentPath + name
      // 清空当前选中的文件。
      this.selectedRowKeys = []
      // 获取新的文件
      this.getFileList(this.currentPath)
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
      } else if (type === 'mp4' ||
          type === 'avi' ||
          type === 'mp3' ||
          type === 'WMV' ||
          type === 'mov' ||
          type === 'MP4' ||
          type === 'AVI' ||
          type === 'MP3' ||
          type === 'wmv' ||
          type === 'MOV') {
        this.preViewType = 'video'
      } else {
        // 如果不是上述格式，则不允许预览
        return
      }
      download(name).then(res => {
        const data = res.data
        console.log(data)
        let url = res.data.fileUrl
        if (this.preViewType === 'img') {
          this.previewSrc = url
        } else if (this.preViewType === 'video') {
          this.previewSrc = url
        } else {
          // eslint-disable-next-line no-const-assign
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
    .preView_diaglog{
      -webkit-align-items: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .preView_diaglog .el-dialog__body {
        padding: 0px;

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
