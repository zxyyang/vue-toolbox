<template>
  <div class="bg">
    <div class="one">
      <div class="text_1">
        <p style="text-align: center;font-size: 50px ; font-family: 'Noto Sans', sans-serif;color: white">如果我们有人忘记了约定,那就在月球相见!</p>
        <p style="text-align: center;font-size: 20px;color: blue ">Let's meet on the moon</p>
      </div>
    </div>
    <div class="tow">
      <div class="text_2">
        <p style="text-align: center;font-size: 50px ; ">第二页展示页面!</p>
        <p style="text-align: center;font-size: 20px;color: green ">The Second Page!</p>
      </div>
    </div>
    <div class="three">
      <div class="text_3">
        <p style="text-align: center;font-size: 50px ;color: white ">第三页展示页面!</p>
        <p style="text-align: center;font-size: 20px;color: blueviolet ">The Third Page!</p>
      </div>
    </div>
    <div class="four">
      <div class="text_3">
        <p style="text-align: center;font-size: 50px ; ">这里要放动画!</p>
      </div>
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
