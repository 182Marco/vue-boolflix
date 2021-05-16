<template>
  <div id="app">
    <!-- login -->
    <InitialBg v-show="!accountDone">
      <LoginPage v-show="!loginDone" @completedLogin="loginDone = !loginDone" />
      <!-- scelta utente -->
      <Account
        v-show="loginDone && !accountDone"
        @accountChosen="accountDone = true"
      />
    </InitialBg>
    <!-- comincia app vera e propria -->
    <div class="appMenu-page" v-show="accountDone">
      <!-- <header msg="Welcome to Your Vue.js App" /> -->
      <HeaderComp @sendedData="getAllData">
        <NavbarLeft :links="linksNavLf" />
      </HeaderComp>
      <!-- film spinto molto su jumbo -->
      <PromoMovie />
      <List :title="`Movies matching your search`" v-show="movies.length > 0">
        <Card
          v-for="el in movies"
          :key="el.id"
          :obj="el"
          :flags="flags"
          @favuriteObj="pushFavuriteObj"
          @noFavuriteObj="removeFavuriteObj"
        />
      </List>
      <List :title="`Series matching your search`" v-show="series.length > 0">
        <Card
          v-for="el in series"
          :key="el.id"
          :obj="el"
          :flags="flags"
          @favuriteObj="pushFavuriteObjSeries"
          @noFavuriteObj="removeFavuriteObjSeries"
        />
      </List>
      <List :title="`Popular movie on Netflix:`">
        <Card
          v-for="el in popularMov"
          :key="el.id"
          :obj="el"
          :flags="flags"
          @favuriteObj="pushFavuriteObj"
          @noFavuriteObj="removeFavuriteObj"
        />
      </List>
      <List :title="`Popular series on Netflix`">
        <Card
          v-for="el in popularSeries"
          :key="el.id"
          :obj="el"
          :flags="flags"
          @favuriteObj="pushFavuriteObjSeries"
          @noFavuriteObj="removeFavuriteObj"
        />
      </List>
      <List
        :title="`Your favourites movie list`"
        v-show="favouriteMovies.length > 0"
      >
        <Card
          v-for="el in favouriteMovies"
          :key="el.id"
          :obj="el"
          :flags="flags"
          @noFavuriteObj="removeFavuriteObj"
        />
      </List>
      <List
        :title="`Your favourites series list`"
        v-show="favouriteSeries.length > 0"
      >
        <Card
          v-for="el in favouriteSeries"
          :key="el.id"
          :obj="el"
          :flags="flags"
          @noFavuriteObj="removeFavuriteObjSeries"
        />
      </List>
    </div>
  </div>
</template>

<script>
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
        loginDone: false,
        accountDone: false,
        basicUrl: 'https://api.themoviedb.org/3',
        apiMv: '/movie',
        apiTv: '/tv',
        apikey: '5f6d881d6af75a5cb6855a550e2cd3d2',
        mv: '',
        // arrays dei film e serie cercati
        series: [],
        movies: [],
        favouriteMovies: [],
        favouriteSeries: [],
        language: '',
        // array che si poplano al caricamento
        popularMov: [],
        popularSeries: [],
        flags: ['en', 'it'],
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
    methods: {
      getAllData(query, language) {
        if (query !== '') {
          this.results = [];
          // chimata per i film
          axios
            .get(
              `${this.basicUrl}/search${this.apiMv}?api_key=${
                this.apikey
              }&query=${query}
            ${language ? `&language=${language}` : ''}
          `
            )
            .then(res => {
              const movieWithFavuoriteProp = this.AddFavouriteProp(
                res.data.results
              );
              this.movies = movieWithFavuoriteProp;
            });
          // chimata per le serie
          axios
            .get(
              `${this.basicUrl}/search${this.apiTv}?api_key=${
                this.apikey
              }&query=${query}
              ${language ? `&language=${language}` : ''}
              `
            )
            .then(r => {
              const seriesWithFavuoriteProp = this.AddFavouriteProp(
                r.data.results
              );
              this.series = seriesWithFavuoriteProp;
            });
        }
      },
      // chiamata per popolare subito l'app con film trend
      // rimuovere dalle serie preferite
      getTrends(type) {
        axios
          .get(
            `${this.basicUrl}/${type}/popular?api_key=${this.apikey}&language=en-US&page=1`
          )
          .then(r => {
            const popularWithFavuoriteProp = this.AddFavouriteProp(
              r.data.results
            );
            // faccio un ceck per capire se sono film per scegliere array da popolare
            r.data.results[0].title
              ? (this.popularMov = popularWithFavuoriteProp)
              : (this.popularSeries = popularWithFavuoriteProp);
          });
      },
      // aumentare le props con una favurite true/false
      AddFavouriteProp(ar) {
        return ar.map(e => ({ ...e, favourite: false }));
      },
      // aggiungere ai film favoriti
      pushFavuriteObj(obj) {
        this.favouriteMovies.push(obj);
      },
      // aggiungere alle serie favorite
      pushFavuriteObjSeries(obj) {
        this.favouriteSeries.push(obj);
      },
      // rimuovere dai film favoriti
      removeFavuriteObj(obj) {
        this.favouriteMovies = [
          ...this.favouriteMovies.filter(e => e.id != obj.id),
        ];
      },
      // rimuovere dalle serie preferite
      removeFavuriteObjSeries(obj) {
        this.favouriteSeries = [
          ...this.favouriteSeries.filter(e => e.id != obj.id),
        ];
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
