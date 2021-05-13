<template>
  <div id="app">
    <!-- <header msg="Welcome to Your Vue.js App" /> -->
    <HeaderComp @sendedData="getAllData">
      <NavbarLeft :links="linksNavLf" />
    </HeaderComp>
    <img
      class="promo-img"
      src="@/assets/img/interstellar3.webp"
      alt="interstellar promo"
    />
    <List :title="`Movies matching your search`">
      <Card
        v-for="el in movies"
        :key="el.id"
        :obj="el"
        :flags="flags"
        @favuriteObj="pushFavuriteObj"
        @noFavuriteObj="removeFavuriteObj"
      />
    </List>
    <List :title="`Series matching your search`">
      <Card
        v-for="el in series"
        :key="el.id"
        :obj="el"
        :flags="flags"
        @favuriteObj="pushFavuriteObjSeries"
        @noFavuriteObj="removeFavuriteObjSeries"
      />
    </List>
    <List :title="`Your favourites movie list`">
      <Card
        v-for="el in favouriteMovies"
        :key="el.id"
        :obj="el"
        :flags="flags"
        @noFavuriteObj="removeFavuriteObj"
      />
    </List>
    <List :title="`Your favourites series list`">
      <Card
        v-for="el in favouriteSeries"
        :key="el.id"
        :obj="el"
        :flags="flags"
        @noFavuriteObj="removeFavuriteObjSeries"
      />
    </List>
  </div>
</template>

<script>
  import axios from 'axios';
  import HeaderComp from './components/HeaderComp.vue';
  import NavbarLeft from './components/NavbarLeft.vue';
  import List from './components/List.vue';
  import Card from './components/Card.vue';

  export default {
    name: 'App',
    components: {
      HeaderComp,
      NavbarLeft,
      List,
      Card,
    },
    created() {
      window.addEventListener('scroll', this.handleScroll);
    },
    data() {
      return {
        apiMv: 'https://api.themoviedb.org/3/search/movie',
        apiTv: 'https://api.themoviedb.org/3/search/tv',
        apikey: '5f6d881d6af75a5cb6855a550e2cd3d2',
        // query: '',
        mv: '',
        series: [],
        movies: [],
        favouriteMovies: [],
        favouriteSeries: [],
        language: '',
        flags: ['en', 'it'],
        imgSize: 'w1280',
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
              `${this.apiMv}?api_key=${this.apikey}&query=${query}
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
              `${this.apiTv}?api_key=${this.apikey}&query=${query}
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
    padding-bottom: 200px;
  }

  .promo-img {
    width: 100%;
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
