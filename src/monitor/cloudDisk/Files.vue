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
        <a-upload
          class="upload_but"
          name="file"
          :multiple="true"
          :data="uploadData"
          action="/api/oss/upload"
          :headers="headers"
          :before-upload="uploadBeforeUpload"
          :show-upload-list="false"
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
        <a-button @click="mkDirDialogVisible_fun">
          <a-icon type="folder-add" />新建文件夹
        </a-button>
        <a-button @click="deleteFile"> <a-icon type="delete" />删除 </a-button>
        <a-button :disabled="isDirDisable" @click="moveFileDialogVisible_fun">
          <a-icon type="block" />移动
        </a-button>
        <a-button
          :disabled="isDirDisable || multiDirDisable"
          @click="shareFile"
        >
          <a-icon type="branches" />分享
        </a-button>
        <a-button v-if="isRecycle" @click="deleteRecycle">
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
            @click="clickBreadcrumb(index)"
          >{{ item }}</a-button>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="table">
      <div>
        <a-breadcrumb>
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
          <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
          <a-breadcrumb-item>An Application</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <a-table
        class="filesTable"
        :data-source="filesList"
        :pagination="false"
        :loading="skeleton_loading"
        :row-selection="{
          // selectedRowKeys: selectedRowKeys,
          // onChange: onSelectChange
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
            {{ updataFileSize(size) }}
          </template>
        </a-table-column>
        <a-table-column
          key="lastModified"
          title="修改时间"
          data-index="lastModified"
        >
          <template slot-scope="lastModified">
            <span>{{ timestampToTime(lastModified) }}</span>
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
      <a-table :data-source="dirsList" :show-header="false" :pagination="false">
        <a-table-column key="name" title="" data-index="name">
          <template slot-scope="name">
            <span>
              <a-icon class="file_ico" :type="checkDir_Ico(name)" />
              <a-button type="link" @click="moveClickDir(name)">{{
                name
              }}</a-button>
            </span>
          </template>
        </a-table-column>
      </a-table>
      <a-button
        type="primary"
        class="moveFile_but"
        @click="moveClickOk"
      >确定</a-button>
      <a-button
        class="moveFile_but"
        @click="moveFileDialogVisible = false"
      >取消</a-button>
    </el-dialog>
    <a-modal
      v-model="mkdirDialogVisible"
      title="新建文件夹"
      ok-text="确定"
      cancel-text="取消"
      :mask-closable="false"
      @ok="mkdir()"
    >
      <p>文件夹会建立在当前目录下</p>
      <a-input
        v-model="dirName"
        class="mkdir_input"
        placeholder="输入文件夹名称"
      />
    </a-modal>
    <a-modal
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
  </div>
</template>

<script>
export default {
  name: 'CloudDisk',
  methods: {

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
  font-size: 1.5rem;
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
</style>
