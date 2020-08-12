<template>
  <div id="app">
    {{this.$store.state.count}}
    {{this.$store.getters.newCount}}
    {{this.$store.state.a.b.count}}
    <button @click="add">add</button>
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {

  },
  mounted() {
    console.log('mounted', this.$store);
  },
  methods: {
    add(){
      // this.$store.commit('change');
      this.$store.dispatch('change');
    }
  }
}
</script>

<style>

</style>
