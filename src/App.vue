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
    <List :title="`Movie List`">
      <Card v-for="el in movies" :key="el.id" :obj="el" :flags="flags" />
    </List>
    <List :title="`Series List`">
      <Card v-for="el in series" :key="el.id" :obj="el" :flags="flags" />
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
          console.log(this.results);
          // chimata per i film
          axios
            .get(
              `${this.apiMv}?api_key=${this.apikey}&query=${query}
            ${language ? `&language=${language}` : ''}
          `
            )
            .then(res => {
              this.movies = res.data.results;
              console.log(this.movies);
            });
          // chimata per le serie
          axios
            .get(
              `${this.apiTv}?api_key=${this.apikey}&query=${query}
            ${language ? `&language=${language}` : ''}
            `
            )
            .then(r => {
              this.series = r.data.results;
              console.table(this.series);
            });
        }
      },
      prova(query, language) {
        console.warn(query);
        console.warn(language);
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
  button {
    @include btn();
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
