<template>
  <div class="App" :style="App">
    <router-view />

  </div>

</template>

<script>

export default {
  data() {
    return {
      deviceType: '',
      App: {

      }

    }
  }

}
</script>

<style>
.App{
  /*background-color: #212121 !important;*/
}

</style>
