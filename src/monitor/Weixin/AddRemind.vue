<template>
  <div class="app">
    <div class="return">
      <el-button size="mini" type="primary" plain  round icon="el-icon-arrow-left" @click="toWxList()">返回</el-button>
    </div>
    <div class="reMind">
      <div class="other">
        <div class="block">
          <span>提醒时间：</span>
          <el-date-picker
            v-model="time"
            type="datetime"
            placeholder="选择提醒时间"
            default-time="18:00:00"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </div>
        <div class="selectUser">
          <span>提醒人：</span>
          <el-select v-model="user" placeholder="请选择提醒人">
            <el-option
              v-for="item in options"
              :key="item.user"
              :label="item.label"
              :value="item.user"
            />
          </el-select>
        </div>
      </div>
      <br>
      <div class="contents">
        <el-input
          v-model="contents"
          type="textarea"
          :rows="15"
          placeholder="请输入内容"
        />
      </div>
      <br>
      <div class="do">
        <el-button
          @click="addRemind()"
        >提交</el-button>
      </div>
    </div>
  </div>

</template>

<script>
import { addRemind } from '@/api/remind'

export default {
  data() {
    return {
      contents: '',
      time: '',
      options: [{
        user: 0,
        label: '所有人'
      }, {
        user: 2,
        label: '周艺'
      }, {
        user: 1,
        label: '杨梓轩'
      }],
      user: 0
    }
  },
  methods: {
    addRemind() {
      const param = {
        content: this.contents,
        time: this.time,
        type: this.user
      }
      addRemind(param).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.contents = ''
          this.time = ''
          this.user = ''
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    toWxList() {
      this.$router.push('/wx')
    }
  }
}
</script>

<style scoped>
  .block{
    margin: 1%;
  display: inline-block;
  }
  .selectUser{
    margin: 1%;
   display: inline-block;
  }

 .reMind {
   text-align: center;
   margin-top: 5%;
   /*display: flex;*/
   flex-direction: column;
   align-items: center;
 }
 .contents{
   margin-left: 15%;
   margin-right: 15%;
 }
  .return{
    margin: 1%;
  }

</style>
