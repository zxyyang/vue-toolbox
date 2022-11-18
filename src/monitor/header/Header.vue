<template>
  <div class="head">
    <!--手机端-->
    <div v-if="isMobile">
      <el-row type="flex" class="row-bgMobile" justify="space-between">

        <el-col :span="10"><div class="leftRow">
          <el-image :src="require('@/image/moreOne.png')" style="object-fit: scale-down; cursor: pointer;margin-top: 2% ;filter: invert(100%);" @click="toIndex()" />
        </div></el-col>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" style="color: #FFFFFF ">
            Application-Bar<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><el-link  icon="el-icon-reading" @click="toNote">Note</el-link></el-dropdown-item>
            <el-dropdown-item ><el-link  icon="el-icon-film" @click="toVideo">Vido</el-link></el-dropdown-item>
            <el-dropdown-item ><el-link  icon="el-icon-folder-opened" @click="toCloudDisk">Cloud-Disk</el-link></el-dropdown-item>
            <el-dropdown-item ><el-link  icon="el-icon-chat-dot-square" @click="toWx">Wechat</el-link></el-dropdown-item>
            <el-dropdown-item ><el-link  icon="el-icon-star-off" @click="toAbout">About</el-link></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-col :span="4"><div>
          <div class="logOut">
            <span style="margin-right: 10px ; color: #35ef00 ;font-weight: 500;font-size: 18px"> {{ userName }}</span>
            <el-link v-if="showLogIn" :underline="true" style="color: #FFFFFF ;font-size: small" @click="logIn">Log In</el-link>
            <el-link v-if="showLogOut" :underline="true" style="color: #FFFFFF ;font-size: small" @click="logOut">Log Out</el-link>
          </div>
        </div>
        </el-col>
      </el-row>
    </div>
    <!--    电脑端-->
    <div v-else>
      <el-row type="flex" class="row-bg" justify="space-between">

        <el-col :span="10"><div class="leftRow">
          <el-image :src="require('@/image/moreOne.png')" style="object-fit: scale-down; cursor: pointer;margin-top: 2% ;filter: invert(100%);" @click="toIndex()" />
        </div></el-col>

        <el-col :span="10"><div class="centRow">
          <div style="flex: auto;text-align: center; "><el-link :underline="true" style="color: #FFFFFF ;font-weight:500;font-size: medium; " @click="toNote">Note</el-link></div>
          <div style="flex: auto;text-align: center"><el-link :underline="true" style="color: #FFFFFF ;font-weight:500;font-size: medium ;" @click="toVideo">Video</el-link></div>
          <div style="flex: auto;text-align: center"><el-link :underline="true" style="color: #FFFFFF ;font-weight:500;font-size: medium;" @click="toCloudDisk">CloudDisk</el-link></div>
          <div style="flex: auto;text-align: center"><el-link :underline="true" style="color: #FFFFFF ;font-weight:500;font-size: medium;" @click="toWx">WeChat</el-link></div>
          <div style="flex: auto;text-align: center"><el-link :underline="true" style="color: #FFFFFF ;font-weight:500;font-size: medium;" @click="todoList">TODO</el-link></div>
          <div style="flex: auto;text-align: center"><el-button round :underline="true" style="color: #000000 ;font-weight:500;font-size: medium;" @click="toAbout">About</el-button></div>
          <!--        <div style="flex: auto;text-align: center"> <el-button round>主要按钮</el-button></div>-->

        </div></el-col>

        <el-col :span="4"><div class="rightRow">
          <div class="logOut">

            <span style="margin-right: 10px ; color: #35ef00 ;font-weight: 500;font-size: 18px"> {{ userName }}</span>
            <el-link v-if="showLogIn" :underline="true" style="color: #FFFFFF ;font-size: small" @click="logIn">Log In</el-link>
            <el-link v-if="showLogOut" :underline="true" style="color: #FFFFFF ;font-size: small" @click="logOut">Log Out</el-link>
          </div>
          <div>
            <a-locale-provider>
              <App />
            </a-locale-provider>
          </div>
        </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      userName: localStorage.getItem('userName'),
      showLogIn: true,
      showLogOut: false,
      isMobile: false

    }
  },
  created() {
    if (window.localStorage.getItem('token')) {
      this.showLogOut = true
      this.showLogIn = false
    } else {
      this.showLogOut = false
      this.showLogIn = true
    }
    if (this._isMobile()) {
      // 手机端
      this.isMobile = true
      // 设置rem
      window.onload = function() {
        getRem(750, 100)
      }
      window.onresize = function() {
        getRem(750, 100)
      }
      // eslint-disable-next-line no-inner-declarations
      function getRem(pwidth, prem) {
        var html = document.getElementsByTagName('html')[0]
        var oWidth = document.body.clientWidth || document.documentElement.clientWidth
        html.style.fontSize = oWidth / pwidth * prem + 'px'
      }
    } else {
      // pc端
      this.isMobile = false
    }
  },

  methods: {
    // 判断手机端还是PC端
    _isMobile() {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    },
    logIn() {
      this.showLogOut = true
      this.showLogIn = false
      this.$router.push('/login')
    },
    logOut() {
      this.showLogIn = true
      this.showLogOut = false
      // 清理token
      window.localStorage.clear()
      this.$router.push('/index')
      this.userName = ''
    },
    toIndex() {
      this.$router.push('/index')
    },
    toNote() {
      this.$router.push('/note')
    },
    toVideo() {
      this.$router.push('/video')
    },
    toCloudDisk() {
      this.$router.push('/cloudDisk')
    },
    toWx() {
      this.$router.push('/wx')
    },
    todoList() {
      this.$router.push('/todo')
    },
    toAbout() {
      this.$message.info('联系方式：740444603@qq.com')
      // this.$router.push('/about')
    }
  }
}
</script>

<style scoped>
.head{

  background-color: #212121;

}
.rightRow{
  display: flex;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  /*background: #e5e9f2;*/
  border-radius: 4px;
  min-height: 50px;

}
.centRow{

  display: flex;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  /*background: #e5e9f2;*/
  border-radius: 4px;
  min-height: 50px;
}
.leftRow{
height: 10px;
  display: flex;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;

}
.row-bgMobile{
  height: 50px;
  object-fit: scale-down;
  /*display: flex;*/
  padding: 20px 0;
  /*-webkit-align-items: center;*/
  /*background-color: #f9fafc;*/
}
.row-bg {
  height: 100px;
  object-fit: scale-down;
  /*display: flex;*/
  padding: 30px 0;
  /*-webkit-align-items: center;*/
  /*background-color: #f9fafc;*/
}
.logOut{
  -webkit-align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
