<template>
  <div >
    <el-row type="flex" class="row-bg" justify="space-between">

      <el-col :span="10"><div class="leftRow" >
        <el-image  :src="require('@/image/tothemoon.png')"   @click=toIndex() style="object-fit: scale-down; cursor: pointer;margin-top: 2%" ></el-image>
      </div></el-col>

      <el-col :span="10"><div class="centRow">
        <div style="flex: auto;text-align: center;"><el-link  :underline="true" @click="toNote"  style="color: #FFFFFF ;font-weight:500;font-size: medium; ">Note</el-link></div>
        <div style="flex: auto;text-align: center"><el-link  :underline="true" @click="toTask"  style="color: #FFFFFF ;font-weight:500;font-size: medium ;">Task</el-link></div>
        <div style="flex: auto;text-align: center"><el-link  :underline="true" @click="toFile"  style="color: #FFFFFF ;font-weight:500;font-size: medium;">File</el-link></div>
        <div style="flex: auto;text-align: center"><el-link  :underline="true" @click="toChart"  style="color: #FFFFFF ;font-weight:500;font-size: medium;">Chart</el-link></div>
        <div style="flex: auto;text-align: center"><el-link  :underline="true" @click="toResource"  style="color: #FFFFFF ;font-weight:500;font-size: medium;">Resource</el-link></div>
        <div style="flex: auto;text-align: center"><el-link  :underline="true" @click="toAbout"  style="color: #FFFFFF ;font-weight:500;font-size: medium;">About</el-link></div>
        <div style="flex: auto;text-align: center"> <el-button  round>主要按钮</el-button></div>

      </div></el-col>
      <el-col :span="4"><div class="rightRow">
        <div class="logOut" >
        <el-link  :underline="true" @click="logout"  style="color: #FFFFFF ;font-size: small">Log Out</el-link>
      </div>
        </div></el-col>




</el-row>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {

    return {

    };
  },
  methods: {
    toIndex(){

      this.$router.push("/index")
    },
    toNote(){
      this.$router.push("/note")
    },
    toTask(){
      this.$router.push("/task")
    },
    toFile(){
      this.$router.push("/file")
    },
    toChart(){
      this.$router.push("/chart")
    },
    toResource(){
      this.$router.push("/resource")
    },
    toAbout(){
      this.$router.push("/about")
    }
  }
}
</script>

<style scoped>

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
