<template>
  <div id="app">
    <!-- <header msg="Welcome to Your Vue.js App" /> -->
    <HeaderComp>
      <NavbarLeft :links="linksNavLf" />
    </HeaderComp>
    <section>
      <input v-model="query" type="text" />
      <select v-model="language" name="" id="">
        <option value="it-IT">it-IT</option>
        <option value="">original</option>
      </select>
      <button @click="getAllData">cerca</button>
    </section>
    <section v-for="obj in results" :key="obj.id">
      <p>{{ obj.title ? obj.title : obj.name }}</p>
      <p>{{ obj.original_title ? obj.original_title : obj.original_name }}</p>
      <span class="original-lang">Original lenguage:</span>
      <img
        v-if="flags.includes(obj.original_language)"
        :src="require(`@/assets/img/${obj.original_language}.png`)"
        :alt="`${obj.original_language} flag`"
      />
      <span v-else>{{ obj.original_language }}</span>
      <p>{{ obj.vote_average }}</p>
      <img
        :src="`https://image.tmdb.org/t/p/${imgSize}${obj.poster_path}`"
        :alt="`${obj.title ? obj.title : obj.name} sign poster`"
      />
      <div>
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
    </section>
  </div>
</template>

<script>
  import axios from 'axios';
  import HeaderComp from './components/HeaderComp.vue';
  import NavbarLeft from './components/NavbarLeft.vue';

  export default {
    name: 'App',
    components: {
      HeaderComp,
      NavbarLeft,
    },
    data() {
      return {
        apiMv: 'https://api.themoviedb.org/3/search/movie',
        apiTv: 'https://api.themoviedb.org/3/search/tv',
        apikey: '5f6d881d6af75a5cb6855a550e2cd3d2',
        query: '',
        mv: '',
        results: [],
        language: '',
        flags: ['en', 'it'],
        imgSize: 'w342',
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
      getAllData() {
        this.results = [];
        console.log(this.results);
        // chimata per i film
        axios
          .get(
            `${this.apiMv}?api_key=${this.apikey}&query=${this.query}
            ${this.language ? `&language=${this.language}` : ''}
          `
          )
          .then(res => {
            this.results = res.data.results;
            console.log(this.results);
          });
        // chimata per le serie
        axios
          .get(
            `${this.apiTv}?api_key=${this.apikey}&query=${this.query}
            ${this.language ? `&language=${this.language}` : ''}
            `
          )
          .then(r => {
            console.log(typeof r.data.results);
            console.log(r.data.results);
            r.data.results.forEach(e => this.results.push(e));
            console.table(this.results);
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
    color: $titleOfGrupsCol;
    min-height: 100vh;
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
    padding: 5vw;
  }
</style>
