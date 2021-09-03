<template>
  <div class="App" :style="App">
    <router-view />

  </div>

</template>

<script>

export default {
  data() {
    return {
      App: {

      }

    }
  },
  // 关闭浏览器清理token
  mounted() {
    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('token')
    })
  }

}
</script>

<style>
.App{
  /*background-color: #212121 !important;*/
}

</style>
