<template>
  <div>
    <Card />
    <Sale />
    <Observe />
  </div>
</template>

<script>
import Sale from './Sale'
import Card from './Card'
import Observe from './Observe'
export default {
  name: '',
  components: {
    Card,
    Sale,
    Observe
  },
  mounted() {
    this.$store.dispatch('getData')
    console.log(this.$router)
  }
}
</script>

<style scoped>
</style>
