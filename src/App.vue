<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <input type="text" />
  </div>
</template>

<script>
  // import HelloWorld from './components/HelloWorld.vue';

  export default {
    name: 'App',
    components: {
      // HelloWorld,
    },
  };
</script>

<style lang="scss">
  /* fonts */
  @import '~@fontsource/montserrat/index.css';
  @import '~@fontsource/montserrat/700.css';
  /* parcials */
  @import '@/scss/var';
  @import '@/scss/reset';
  @import '@/scss/mixins';

  #app {
    margin: 0;
    padding: 0;
    height: 100vh;
    background-color: black;
    color: $light-txt;
  }
</style>
