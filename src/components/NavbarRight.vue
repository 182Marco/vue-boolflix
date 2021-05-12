<template>
  <nav>
    <ul>
      <li class="search-item">
        <div v-show="showSearch" class="input-wrap">
          <input ref="input" type="text" />
          <select v-model="language" name="" id="">
            <option value="it-IT">it</option>
            <option value="">en</option>
          </select>
        </div>
        <i
          @click="
            putFocus();
            $emit('changeBarCol');
          "
          class="fas fa-search"
        ></i>
      </li>
      <li>
        <a href="#">
          <i class="fas fa-gift"></i>
        </a>
      </li>
      <li>
        <a href="#">
          <i class="fas fa-bell"></i>
        </a>
      </li>
      <li>
        <a href="#" class="withArrow">
          <img src="@/assets/img/marcoMilza.webp" alt="Autore dell' App" />
          <div class="arrow"></div>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  // components

  export default {
    name: 'NavbarRight',
    props: {},
    data() {
      return {
        showSearch: false,
        navCol: false,
        language: '',
      };
    },
    methods: {
      putFocus() {
        this.showSearch = !this.showSearch;
        this.$refs.input.focus();
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

  nav,
  ul {
    @include flex(row, flex-end, center);
    padding: 0;
    li {
      margin-left: 20px;
      a {
        color: $white;
        font-size: 1.3rem;
        @include flex(row, center, center);
        img {
          width: 26px;
          display: inline-block;
        }
        .arrow {
          @include equilateral-triangle(down, 5px, $white);
          margin-left: 4px;
        }
      }
      i,
      select {
        color: $white;
      }
      &.search-item {
        position: relative;
        .input-wrap {
          position: absolute;
          right: calc(100% + 20px);
          top: 50%;
          transform: translateY(-50%);
          height: 2.2vh;
          overflow: hidden;
          input {
            height: 100%;
            padding: 0 8px;
            font-size: 1rem;
            background-color: $searchBarCol;
            color: $white;
            border-radius: 5px;
            &:focus {
              border: none;
            }
          }
          &::before {
            position: absolute;
            top: 50%;
            transform: translateY(-25%);
            right: 2.5%;
            @include pseudo();
            @include equilateral-triangle(down, 3px, $brand);
          }
          select {
            border: none;
            position: absolute;
            top: 0;
            right: 0;
            -webkit-appearance: none;
            -moz-appearance: none;
            text-indent: 1px;
            text-overflow: '';
            background-color: transparent;
            @include width-height(18%, 100%);
            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
</style>
