<template>
  <div class="head">
    <el-row type="flex" class="row-bg" justify="space-between">

      <el-col :span="10"><div class="leftRow">
        <el-image :src="require('@/image/tothemoon.png')" style="object-fit: scale-down; cursor: pointer;margin-top: 2%" @click="toIndex()" />
      </div></el-col>

      <el-col :span="10"><div class="centRow">
        <div style="flex: auto;text-align: center;"><el-link :underline="true" style="color: #FFFFFF ;font-weight:500;font-size: medium; " @click="toNote">Note</el-link></div>
        <div style="flex: auto;text-align: center"><el-link :underline="true" style="color: #FFFFFF ;font-weight:500;font-size: medium ;" @click="toTask">Task</el-link></div>
        <div style="flex: auto;text-align: center"><el-link :underline="true" style="color: #FFFFFF ;font-weight:500;font-size: medium;" @click="toCloudDisk">CloudDisk</el-link></div>
        <div style="flex: auto;text-align: center"><el-link :underline="true" style="color: #FFFFFF ;font-weight:500;font-size: medium;" @click="toChart">Chart</el-link></div>
        <div style="flex: auto;text-align: center"><el-link :underline="true" style="color: #FFFFFF ;font-weight:500;font-size: medium;" @click="toResource">Resource</el-link></div>
        <div style="flex: auto;text-align: center"><el-link :underline="true" style="color: #FFFFFF ;font-weight:500;font-size: medium;" @click="toAbout">About</el-link></div>
        <div style="flex: auto;text-align: center"> <el-button round>主要按钮</el-button></div>

      </div></el-col>
      <el-col :span="4"><div class="rightRow">
        <div class="logOut">
          <el-link :underline="true" style="color: #FFFFFF ;font-size: small" @click="logout">Log Out</el-link>
        </div>
        <div>
          <a-locale-provider :locale="zh_CN">
            <App />
          </a-locale-provider>
        </div>
      </div></el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {

    }
  },
  methods: {
    toIndex() {
      this.$router.push('/index')
    },
    toNote() {
      this.$router.push('/note')
    },
    toTask() {
      this.$router.push('/task')
    },
    toCloudDisk() {
      this.$router.push('/cloudDisk')
    },
    toChart() {
      this.$router.push('/chart')
    },
    toResource() {
      this.$router.push('/resource')
    },
    toAbout() {
      this.$router.push('/about')
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
