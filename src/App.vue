<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <input v-model="query" type="text" />
    <select v-model="language" name="" id="">
      <option value="it-IT">it-IT</option>
      <option value="">original</option>
    </select>
    <button @click="getMovie">cerca</button>
    <div v-for="obj in result" :key="obj.id">
      <p>{{ obj.title }}</p>
      <p>{{ obj.original_title }}</p>
      <p>{{ obj.original_language }}</p>
      <p>{{ obj.vote_average }}</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  // import HelloWorld from './components/HelloWorld.vue';

  export default {
    name: 'App',
    components: {
      // HelloWorld,
    },
    data() {
      return {
        api: 'https://api.themoviedb.org/3/search/movie',
        apikey: '5f6d881d6af75a5cb6855a550e2cd3d2',
        query: '',
        result: '',
        language: '',
      };
    },
    methods: {
      getMovie() {
        axios
          .get(
            `${this.api}?api_key=${this.apikey}&query=${this.query} 
            ${this.language === `` ? `` : `&language=${this.language}`}
          `
          )
          .then(res => {
            this.result = res.data.results;
            console.log(res.data.results);
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
    height: 100vh;
    background-color: black;
    color: $light-txt;
  }
  button {
    @include btn();
  }
</style>
