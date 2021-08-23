<template>
  <div >
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="7"><div class="leftRow"></div></el-col>
      <el-col :span="12"><div class="centRow">

        <el-row type="flex" class="index" justify="space-between">
          <el-col :span="7"> <div class="toNote">
        <el-link  :underline="true" @click="toNote"  style="color: #000000 ;font-weight: 900;font-size: 15px">Note</el-link>
        </div></el-col>
            <el-col :span="7"><div class="toTask">
        <el-link  :underline="true" @click="toTask"  style="color: #000000 ;font-weight: 900;font-size: 15px">Task</el-link>
        </div></el-col>
              <el-col :span="7"> <div class="toFile">
        <el-link  :underline="true" @click="toFile"  style="color: #000000 ;font-weight: 900;font-size: 15px">File</el-link>
        </div>/el-col>
                <el-col :span="7"> <div class="toChart">
        <el-link  :underline="true" @click="toChart"  style="color: #000000 ;font-weight: 900;font-size: 15px">Chart</el-link>
        </div></el-col>

      </div></el-col>
      <el-col :span="2"><div class="rightRow">
        <div class="logOut" >
        <el-link  :underline="true" @click="logout"  style="color: #000000 ;font-weight: 900;font-size: 15px">Log Out</el-link>
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

      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
  background: #e5e9f2;
  border-radius: 4px;
  min-height: 50px;

}
.centRow{
  display: flex;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  background: #e5e9f2;
  border-radius: 4px;
  min-height: 50px;
}
.leftRow{
  display: flex;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  background: #e5e9f2;
  border-radius: 4px;
  min-height: 50px;
}

.row-bg {
  display: flex;
  margin-top: 20px;
  padding: 10px 0;
  -webkit-align-items: center;
  /*background-color: #f9fafc;*/
}
.logOut{
  -webkit-align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
