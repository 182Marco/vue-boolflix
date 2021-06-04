<template>
  <div id="app">
    <!-- login -->
    <InitialBg v-show="!accountDone">
      <LoginPage v-show="!loginDone" />
      <!-- scelta utente -->
      <Account v-show="loginDone && !accountDone" />
    </InitialBg>
    <!-- comincia app vera e propria -->
    <div class="appMenu-page" v-show="accountDone">
      <!-- <header msg="Welcome to Your Vue.js App" /> -->
      <HeaderComp>
        <NavbarLeft :links="linksNavLf" />
      </HeaderComp>
      <!-- film spinto molto su jumbo -->
      <PromoMovie />
      <List :title="`Movies matching your search`" v-show="movies.length > 0">
        <Card v-for="el in movies" :key="el.id" :obj="el" />
      </List>
      <List :title="`Series matching your search`" v-show="series.length > 0">
        <Card v-for="el in series" :key="el.id" :obj="el" />
      </List>
      <List :title="`Popular movie on Netflix:`">
        <Card v-for="el in popularMov" :key="el.id" :obj="el" />
      </List>
      <List :title="`Popular series on Netflix`">
        <Card v-for="el in popularSeries" :key="el.id" :obj="el" />
      </List>
      <List
        :title="`Your favourites movie list`"
        v-show="favouriteMovies.length > 0"
      >
        <Card v-for="el in favouriteMovies" :key="`favM_${el.id}`" :obj="el" />
      </List>
      <List
        :title="`Your favourites series list`"
        v-show="favouriteSeries.length > 0"
      >
        <Card v-for="el in favouriteSeries" :key="`favS_${el.id}`" :obj="el" />
      </List>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import axios from 'axios';
  import HeaderComp from './components/HeaderComp.vue';
  import NavbarLeft from './components/NavbarLeft.vue';
  import List from './components/List.vue';
  import Card from './components/Card.vue';
  import LoginPage from './components/LoginPage.vue';
  import PromoMovie from './components/PromoMovie.vue';
  import InitialBg from './components/InitialBg.vue';
  import Account from './components/Account.vue';

  export default {
    name: 'App',
    components: {
      InitialBg,
      LoginPage,
      Account,
      HeaderComp,
      NavbarLeft,
      List,
      Card,
      PromoMovie,
    },
    created() {
      window.addEventListener('scroll', this.handleScroll);
      this.getTrends('movie');
      this.getTrends('tv');
    },
    data() {
      return {
        // array che si poplano al caricamento
        popularMov: [],
        popularSeries: [],
        imgSize: 'w780',
        linksNavLf: [
          'Home',
          'Serie TV',
          'Film',
          'Nuovi e popolari',
          'La mia lista',
        ],
      };
    },
    computed: {
      ...mapState([
        'loginDone',
        'accountDone',
        'favouriteMovies',
        'favouriteSeries',
        'movies',
        'series',
        'query',
        'language',
        'basicUrl',
        'apikey',
      ]),
    },
    methods: {
      // chiamata per popolare subito l'app con film trend
      // rimuovere dalle serie preferite
      getTrends(type) {
        axios
          .get(
            `${this.basicUrl}/${type}/popular?api_key=${this.apikey}&language=en-US&page=1`
          )
          .then(r => {
            // aumentare le props con una favurite true/false
            r.data.result = [
              ...r.data.results.map(e => ({ ...e, favourite: false })),
            ];
            // faccio un ceck per capire se sono film per scegliere array da popolare
            r.data.results[0].title
              ? (this.popularMov = r.data.result)
              : (this.popularSeries = r.data.result);
          });
      },
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
    background-color: $main-bg;
    background-color: $main-bg;
    color: $titleOfGrupsCol;
  }

  .appMenu-page {
    padding-bottom: 200px;
  }

  img {
    width: 50px;
  }
  .original-lang {
    margin-right: 20px;
  }

  section {
    padding: 0 5vw;
  }
</style>
