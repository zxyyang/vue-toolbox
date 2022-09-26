<template>
  <a-layout id="components-layout-demo-top-side-2" class="content">
    <a-layout>
<!--      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :default-selected-keys="navigationDef"
          :default-open-keys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <span slot="title"> <a-icon type="appstore" />我的文件 </span>
            <a-menu-item
              key="0"
              @click="updateFileType('file')"
            >文件</a-menu-item>
            <a-menu-item
              key="1"
              @click="updateFileType('image')"
            >图片</a-menu-item>
            <a-menu-item
              key="2"
              @click="updateFileType('text')"
            >文档</a-menu-item>
            <a-menu-item
              key="3"
              @click="updateFileType('mp4')"
            >视频</a-menu-item>
            <a-menu-item
              key="4"
              @click="updateFileType('mp3')"
            >音乐</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="5" @click="updateFileType('隐私空间')">
            <a-icon type="safety-certificate" />隐私空间
          </a-menu-item>
          <a-menu-item key="myShare" @click="menu_item_click">
            <a-icon type="branches" />我的分享
          </a-menu-item>
          <a-menu-item key="7" @click="updateFileType('回收站')">
            <a-icon type="delete" />回收站
          </a-menu-item>
          <a-menu-item key="8">
            <a-tooltip placement="top">
              <template slot="title">
                <span>已使用：{{ spaceSize }}MB,剩余空间：{{ levelSpace }}MB</span>
              </template>
              <a-progress
                :percent="progress"
                :status="progress_status"
                :show-info="false"
              />
            </a-tooltip>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>-->
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px'
          }"
        >
          <!--          <router-view-->
          <!--            :file-type="fileType"-->
          <!--            :upload-list="uploadList"-->
          <!--            :is-recycle="isRecycle"-->
          <!--            @changeUploadList="changeUploadList"-->
          <!--          />-->
          <Files />
<!--          <div class="side_button_group">
            <a-button
              icon="plus-circle"
              class="side_button_item"
              @click="updateShareDiaglogVis(true)"
            /><br>
            <a-popover placement="leftTop" :visible="ongoingVisible">
              <template slot="content">
                <ongoing :upload-list="uploadList" />
              </template>
              <template slot="title">
                <span>现在上传的任务</span>
              </template>
              <a-button icon="info-circle" class="side_button_item" /><br>
            </a-popover>
          </div>-->
        </a-layout-content>
      </a-layout>
    </a-layout>
<!--    <a-modal
      v-model="downloadShareFileDialogVisible"
      title="获得别人分享的文件"
      ok-text="确定"
      cancel-text="取消"
      :mask-closable="false"
      @ok="downloadShareFile"
      @cancel="downloadShare_cancel"
    >
      <a-spin tip="正在下载中..." :spinning="share_loading">
        <div class="share_text">
          <span>文件秘钥：</span>
          <a-input
            v-model="shareKey_"
            class="share_input"
            style="margin-top: 10px;"
            placeholder="其他用户给你的秘钥"
          >
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-input>
          <div class="share_private_pwd">
            <span>提取密码：</span>
            <a-input
              v-model="sharePwd"
              class="share_input_pwd"
              style="margin-top: 10px;"
              placeholder="没有则留空"
            />
          </div>
        </div>
      </a-spin>
    </a-modal>-->
<!--    <a-modal-->
<!--      v-model="verifyPwdDialogVisible"-->
<!--      title="验证密码"-->
<!--      ok-text="确定"-->
<!--      cancel-text="取消"-->
<!--      :mask-closable="false"-->
<!--      @ok="verifyPwd"-->
<!--    >-->
<!--      <a-spin tip="正在验证中..." :spinning="verifyPwd_loading">-->
<!--        <p>为了文件安全，隐私空间需要重新验证密码。</p>-->
<!--        <a-input-password-->
<!--          v-model="verifyPwd_input"-->
<!--          placeholder="输入你的密码"-->
<!--          style="margin-top: 10px;"-->
<!--        />-->
<!--      </a-spin>-->
<!--    </a-modal>-->
<!--    <a-modal-->
<!--      v-model="updatePwdDialogVisible"-->
<!--      title="修改密码"-->
<!--      ok-text="确定"-->
<!--      cancel-text="取消"-->
<!--      :mask-closable="false"-->
<!--      @ok="updatePwd"-->
<!--    >-->
<!--      <a-spin tip="正在验证中..." :spinning="update_Pwd_loading">-->
<!--        <p>请输入当前密码与新密码。</p>-->
<!--        <a-input-password-->
<!--          v-model="update_old_Pwd_input"-->
<!--          style="margin-bottom: 11px;"-->
<!--          placeholder="输入原密码"-->
<!--        />-->
<!--        <a-input-password-->
<!--          v-model="update_new_Pwd_input"-->
<!--          class="input"-->
<!--          placeholder="输入新密码"-->
<!--        />-->
<!--      </a-spin>-->
<!--    </a-modal>-->
  </a-layout>
</template>
<script>
import Files from '@/monitor/cloudDisk/Files'
export default {
  components: {
    Files
  },
  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {
  }
}
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
.content {
  height: 100vh;
}

.side_button_group {
  position: absolute;
  right: 0px;
  top: 35vh;
}
.side_button_item {
  width: 40px;
  height: 40px;
}
.logo {
  line-height: 31px;
  height: 40px;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  position: relative;
  left: -35px;
}
.anticon-ant-cloud {
  font-size: 2.1rem;
  position: relative;
  left: -5px;
  top: 6px;
}
.logo_main {
  position: relative;
  top: -3px;
  left: 3px;
}
.anticon-lock,
.anticon-unlock {
  /* color: #00abfa; */
  font-size: 1.4rem;
}
</style>
