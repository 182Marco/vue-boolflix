<template>
  <header ref="header">
    <div class="cont">
      <div class="wrap-logoNav">
        <img src="@/assets/img/brand.svg" alt="logo" />
        <slot></slot>
      </div>
      <slot name="search"></slot>
    </div>
  </header>
</template>

<script>
  // components
  export default {
    name: 'HeaderComp',
    props: {},
    created() {
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll(search = false, height = 400) {
        const header = this.$refs.header;
        if (window.scrollY > height || search === true) {
          header.classList.remove('transparent');
          header.classList.add('fillBlack');
        } else {
          header.classList.remove('fillBlack');
          header.classList.add('transparent');
        }
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  /* parcials */
  @import '@/scss/var';
  @import '@/scss/reset';
  @import '@/scss/mixins';

  .fillBlack {
    animation: fillBlack 1s forwards;
  }

  @keyframes fillBlack {
    0% {
      background-color: transparent;
    }
    100% {
      background-color: $header-col1;
    }
  }

  .transparent {
    background-color: $header-col1;
    animation: transparent 1s forwards;
  }

  @keyframes transparent {
    0% {
      background-color: header-col1;
    }
    100% {
      background-color: transparent;
    }
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    @include width-height(100vw, 12vh);
    background: transparent;
    .cont {
      @include width-height(92vw, 100%);
      @include flex(row, space-between, center);
      margin: 0 auto;
      .wrap-logoNav {
        @include flex(row, flex-start, center);
        img {
          width: 13%;
          margin-right: 15px;
        }
      }
    }
  }
</style>
