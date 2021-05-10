<template>
  <header>
    <div class="cont">
      <div class="wrap-logoNav">
        <img src="@/assets/img/brand.svg" alt="logo" />
        <slot></slot>
      </div>
    </div>
  </header>
</template>

<script>
  // components

  export default {
    name: 'HeaderComp',
    props: {},
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  /* parcials */
  @import '@/scss/var';
  @import '@/scss/reset';
  @import '@/scss/mixins';

  header {
    height: 13vh;
    background: linear-gradient($header-col1, $header-col2);
    .cont {
      @include width-height(95vw, 100%);
      @include flex(row, space-between, center);
      margin: 0 auto;
      .wrap-logoNav {
        @include flex(row, flex-start, center);
        img {
          width: 13%;
          margin-right: 20px;
        }
      }
    }
  }
</style>
