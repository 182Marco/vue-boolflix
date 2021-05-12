<template>
  <nav>
    <ul>
      <li class="search-item">
        <div v-show="showSearch" class="input-wrap">
          <input type="text" />
          <!-- <select v-model="language" name="" id="">
            <option value="it-IT">it-IT</option>
            <option value="">original</option>
          </select> -->
        </div>
        <a href="#">
          <i
            @click="
              showSearch = !showSearch;
              $emit('changeBarCol');
            "
            class="fas fa-search"
          ></i>
        </a>
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
    name: 'HeaderComp',
    props: {},
    data() {
      return {
        showSearch: false,
        navCol: false,
      };
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
      &.search-item {
        position: relative;
        .input-wrap {
          position: absolute;
          right: calc(100% + 20px);
          top: 50%;
          transform: translateY(-50%);
          height: 2.2vh;
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
          // select
        }
      }
    }
  }
</style>
