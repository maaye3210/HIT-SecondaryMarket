<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'App',
  created() {
    console.log('created时buttons的值', this.$store.state.user.buttons)
    console.log('created时name的值', this.$store.state.user.name)
    console.log(this.$store.state.user)
    // router.addRoutes(this.$store.state.user.resultAllRputes)
  }
}
</script>
