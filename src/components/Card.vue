<template>
  <ul class="card" :class="{ active: open }" @click="open = true">
    <li class="close x" :class="{ active: open }" @click="open = false">
      <i class="fas fa-times"></i>
    </li>
    <li class="original-name" :class="{ active: open }">
      {{ obj.original_title ? obj.original_title : obj.original_name }}
    </li>
    <li class="original-lang" :class="{ active: open }">
      <span>Original lenguage:</span>
      <img
        v-if="flags.includes(obj.original_language)"
        :src="require(`@/assets/img/${obj.original_language}.png`)"
        :alt="`${obj.original_language} flag`"
      />
      <span v-else>{{ obj.original_language }}</span>
    </li>
    <li class="poster" :class="{ active: open }">
      <div class="img-wrap" :class="{ active: open }">
        <!-- Per la presentazione serviva un bg dinamico 
        a un contenitore per ottenere l'effto box shadow 
        in direzione opposta tipico della 
        prefazione di netflix -->
        <div
          class="img-big"
          :class="{ active: open }"
          :style="
            `background-image: url(https://image.tmdb.org/t/p/w342${obj.poster_path})`
          "
        ></div>
        <img
          :class="{ active: open }"
          :src="`https://image.tmdb.org/t/p/w342${obj.poster_path}`"
          :alt="`${obj.title ? obj.title : obj.name} sign poster`"
        />
      </div>
      <p class="name" :class="{ active: open }">
        {{ obj.title ? obj.title : obj.name }}
      </p>
    </li>
    <li class="stars" :class="{ active: open }">
      <i
        v-for="(n, i) in Math.ceil(obj.vote_average / 2)"
        :key="i"
        class="fas fa-star"
      ></i>
      <i
        v-for="(n, i) in 5 - Math.ceil(obj.vote_average / 2)"
        :key="`_${i}`"
        class="far fa-star"
      ></i>
    </li>
  </ul>
</template>

<script>
  // components

  export default {
    name: 'Card',
    props: {
      obj: Object,
      flags: Array,
    },
    data() {
      return {
        open: false,
      };
    },
    methods: {},
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  /* parcials */
  @import '@/scss/var';
  @import '@/scss/reset';
  @import '@/scss/mixins';

  .card {
    cursor: pointer;
    min-width: 250px;
    height: 400px;
    padding: 0;
    margin: 0;
    margin-right: 30px;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.03);
    }
    .img-wrap {
      height: 350px;
      overflow: hidden;
      width: 100%;
      margin-bottom: 15px;
      img {
        @include width-height(100%, 100%);
        object-fit: contain;
      }
    }
    p {
      margin-top: 10px;
      margin-bottom: 0;
    }
  }

  // display solo titolo e foto finche la card non viene cliccata
  .original-name,
  .original-lang,
  .stars.img-big,
  .stars,
  .close.x {
    display: none;
  }

  .name {
    color: $white;
    font-weight: bold;
    font-size: 1.3rem;
  }
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************
  // *****************************************

  // stile quando la card viene aperta al click

  .card.active {
    margin: 0;
    z-index: 20;
    position: absolute;
    @include width-height(100vw, 71.5vh);
    overflow: hidden;
    top: 0;
    right: 0;
    &:hover {
      transform: scale(1);
    }
    li {
      @include width-height(100%, 100%);
      background-color: black;
      position: absolute;
      left: 0;
      top: 0;
      .img-wrap.active {
        position: absolute;
        right: 0;
        top: 0;
        @include width-height(50%, 100%);
        .img-big.active {
          display: block;
          @include width-height(100%, 100%);
          box-shadow: 0 0 100px 100px black inset;
          background-size: cover;
          background-position: center -10%;
          background-repeat: no-repeat;
        }
        img.active {
          display: none;
          position: absolute;
          right: 0;
          top: 0;
          @include width-height(100%, 100%);
          object-fit: cover;
          object-position: 0% 50%;
        }
      }
    }
    p.active {
      margin-top: 10px;
      margin-bottom: 0;
    }
  }

  .close.active {
    display: block;
  }
  .close.x.active {
    z-index: 30;
    font-size: 5rem;
    @include width-height(100px, 100px);
    position: absolute;
    left: 10%;
    top: 5%;
    i {
      color: $white;
    }
  }
</style>
