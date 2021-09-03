<template>
  <div class="bg">
    <div class="one" style="background-color: #212121">

      <el-image size="20%" :src="require('../../image/moon.png')" />

    </div>
    <div class="tow" style="background-color: #ffffff">
      <div class="text_3">
        <p style="text-align: center;font-size: 50px ;color: #000000 ">第二页展示页面!</p>
        <p style="text-align: center;font-size: 20px;color: #013ffc ">The second Page!</p>
      </div>
    </div>
    <div class="three" style="background-color: #212121">
      <div class="text_3">
        <p style="text-align: center;font-size: 50px ;color: white ">第三页展示页面!</p>
        <p style="text-align: center;font-size: 20px;color: blueviolet ">The Third Page!</p>
      </div>
    </div>
    <div class="four" style="background-color: cornflowerblue">
      <el-image size="20%" :src="require('../../image/women.png')" />
    </div>

    <beian />
  </div>

</template>

<script>

import Beian from '@/monitor/beian/Beian'
export default {
  name: 'Portal',
  components: {
    Beian

  },
  methods: {

    data: function() {
      return {

      }
    },

    computed: {

    }
  }
}

</script>

<style scoped>
.one{

  height:  1000px;
  width: 100%;
  /*防止子组件margain-top影响父组件*/
  overflow: hidden;
  /*居中对齐=放父组件中*/
  -webkit-align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tow{
  background-color: #FFFFFF ;
  height:  1000px;
  /*防止子组件margain-top影响父组件*/
  overflow: hidden;
  /*居中对齐=放父组件中*/
  -webkit-align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.three{

  height:  1000px;
  /*防止子组件margain-top影响父组件*/
  overflow: hidden;
  /*居中对齐=放父组件中*/
  -webkit-align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.four{
  background-color: #FFFFFF;
  height:  1000px;
  /*防止子组件margain-top影响父组件*/
  overflow: hidden;
  /*居中对齐=放父组件中*/
  -webkit-align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text_1{
height: 20%;
}

</style>
