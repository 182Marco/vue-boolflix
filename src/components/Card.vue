<template>
  <!-- tag che si vedono solo con apertura della preview -->
  <div class="bg-in-preview" :class="{ active: open }">
    <i
      class=" close x fas fa-times"
      :class="{ active: open }"
      @click="open = false"
    ></i>
    <div class="wrap-texts-in-prev" :class="{ active: open }">
      <h1 class="name-in-preview">
        {{ obj.title ? obj.title : obj.name }}
      </h1>
      <div class="stars" :class="{ active: open }">
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
      </div>
      <p class="overview">
        {{ obj.overview }}
      </p>
      <p class="releaseDate">relese date: {{ obj.release_date }}</p>
      <div class="original-lang" :class="{ active: open }">
        <span>Original lenguage:</span>
        <img
          class="flag"
          v-if="flags.includes(obj.original_language)"
          :src="require(`@/assets/img/${obj.original_language}.png`)"
          :alt="`${obj.original_language} flag`"
        />
        <span v-else>{{ obj.original_language }}</span>
      </div>
    </div>
    <!-- fine tag che si vedono solo con apertura della preview -->
    <section class="card" :class="{ active: open }" @click="open = true">
      <div class="poster" :class="{ active: open }">
        <div class="img-wrap" :class="{ active: open }">
          <!-- Per la presentazione serviva un bg img 
        a un contenitore per ottenere l'effto box shadow 
        in direzione opposta (INSET) tipico della 
        prefazione di netflix -->
          <div
            v-if="obj.poster_path"
            class="img-big"
            :class="{ active: open }"
            :style="
              `background-image: url(https://image.tmdb.org/t/p/w342${obj.poster_path})`
            "
          ></div>
          <!-- placeoholder in prview quando img mancante -->
          <div
            v-else
            class="img-big place holder"
            :class="{ active: open }"
            :style="{
              backgroundImage:
                'url(' + require('@/assets/img/bigBrand.webp') + ')',
            }"
          ></div>
          <img
            v-if="obj.poster_path"
            :class="{ active: open }"
            :src="`https://image.tmdb.org/t/p/w342${obj.poster_path}`"
            :alt="`${obj.title ? obj.title : obj.name} sign poster`"
          />
          <!-- placeoholder quando img mancante -->
          <img
            v-else
            :class="{ active: open }"
            :src="require('@/assets/img/bigBrand.webp')"
            :alt="`${obj.title ? obj.title : obj.name} sign poster`"
          />
        </div>
        <p class="name" :class="{ active: open }">
          {{ obj.title ? obj.title : obj.name }}
        </p>
      </div>
    </section>
  </div>
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
  .close.x,
  p.name.active,
  .wrap-texts-in-prev {
    display: none;
  }

  .name {
    color: $white;
    font-weight: bold;
    font-size: 1.3rem;
  }

  // *****************************************
  // cambiamento completo di stile
  // quanodo a una card si aggiunge
  // la classe active
  // *****************************************

  .bg-in-preview.active {
    background-color: black;
    margin: 0;
    z-index: 20;
    position: absolute;
    @include width-height(100vw, 88vh);
    overflow: hidden;
    top: 0;
    right: 0;
    .card.active {
      margin: 0;
      z-index: 20;
      position: absolute;
      @include width-height(50vw, 100%);
      overflow: hidden;
      top: 0;
      right: 0;
      &:hover {
        transform: scale(1);
      }
      .poster {
        @include width-height(100%, 100%);
        background-image: linear-gradient(to right, $header-col1, $main-bg);
        position: absolute;
        left: 0;
        top: 0;
        .img-wrap.active {
          position: absolute;
          left: 0;
          top: 0;
          @include width-height(100%, 100%);
          .img-big.active {
            display: block;
            @include width-height(100%, 100%);
            box-shadow: 0 0 110px 110px black inset;
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
  }
  .close.active {
    display: block;
  }
  .close.x.active {
    cursor: pointer;
    z-index: 30;
    font-size: 3rem;
    position: absolute;
    left: 3%;
    top: 3%;
    color: $titleOfGrupsCol;
    &:hover {
      color: $white;
    }
  }
  // titolo nome
  .wrap-texts-in-prev.active {
    z-index: 30;
    width: 53vw;
    @include flex(column, space-between, center);
    display: block;
    position: absolute;
    top: 44%;
    left: 29%;
    transform: translate(-50%, -50%);
    color: $white;
    .name-in-preview {
      text-align: center;
      margin: 10px 0;
    }
    .stars {
      color: $star;
    }
    .releaseDate {
      margin: 0;
      margin-bottom: 15px;
    }
    .flag {
      width: 30px;
      margin-left: 10px;
    }
  }
</style>
