<template>
  <header
    :class="{ transparent: transparent, fillBlack: fillBlack }"
    ref="header"
  >
    <div class="cont">
      <div class="wrap-logoNav">
        <img src="@/assets/img/brand.svg" alt="logo" />
        <slot></slot>
      </div>
      <NavbarRight @changeBarCol="toggleColNav" />
    </div>
  </header>
</template>

<script>
  // components
  import NavbarRight from './NavbarRight.vue';

  export default {
    name: 'HeaderComp',
    props: {},
    components: {
      NavbarRight,
    },
    data() {
      return {
        colNav: false,
        transparent: false,
        fillBlack: false,
      };
    },
    created() {
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      toggleColNav() {
        this.colNav = !this.colNav;
        this.handleScroll(this.colNav);
      },
      handleScroll(colNav = false, height = 450) {
        if (window.scrollY > height || colNav) {
          this.transparent = false;
          this.fillBlack = true;
        } else {
          this.transparent = true;
          this.fillBlack = false;
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
    animation: fillBlack 0.6s forwards;
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
    animation: transparent 0.7s forwards;
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
