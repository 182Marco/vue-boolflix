<template>
  <div class="cont">
    <h2>{{ title }}</h2>
    <div class="cards-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  // components

  export default {
    name: 'List',
    props: {
      title: String,
    },
    data() {
      return {};
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  /* parcials */
  @import '@/scss/var';
  @import '@/scss/reset';
  @import '@/scss/mixins';

  .cont {
    width: 92vw;
    margin: 8vh auto;
    border: 1px solid red;
    h2 {
      margin-bottom: 2vh;
      font-size: 1.8rem;
    }
  }
</style>
