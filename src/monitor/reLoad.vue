<template>

</template>

<script>
    let getUserRole = this.formModel.user === 'admin' ? 'admin' : 'user'
    localStorage.setItem('userRole', getUserRole)
    this.$router.push({
        path: '/index'
    })
    export default {
        name: "re-load"
    }
</script>

<style scoped>

</style>
