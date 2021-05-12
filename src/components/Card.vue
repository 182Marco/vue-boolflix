<template>
  <div class="cards-wrap">
    <div v-show="films.length" v-for="obj in films" :key="obj.id" class="card">
      <ul>
        <li>{{ obj.title ? obj.title : obj.name }}</li>
        <li>
          {{ obj.original_title ? obj.original_title : obj.original_name }}
        </li>
        <span class="original-lang">Original lenguage:</span>
        <img
          v-if="flags.includes(obj.original_language)"
          :src="require(`@/assets/img/${obj.original_language}.png`)"
          :alt="`${obj.original_language} flag`"
        />
        <span v-else>{{ obj.original_language }}</span>
        <li>{{ obj.vote_average }}</li>
        <li>
          <img
            :src="`https://image.tmdb.org/t/p/w342${obj.poster_path}`"
            :alt="`${obj.title ? obj.title : obj.name} sign poster`"
          />
        </li>

        <li>
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
    </div>
    <p v-show="!films.length">
      There's no item matching your search
    </p>
  </div>
</template>

<script>
  // components

  export default {
    name: 'Card',
    props: {
      films: Array,
      flags: Array,
    },
    data() {
      return {};
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

  .cards-wrap {
    @include flex(row, flex-start, center);
    flex-wrap: wrap;
    .card {
      flex-basis: calc(100% / 6 - 15px);
      margin-bottom: 20px;
      background-color: lightblue;
      height: 30vh;
      margin-right: 15px;
    }
    ul {
      @include width-height(90%, 90%);

      li {
        cursor: pointer;
      }
    }
  }

  p {
    margin: 0;
  }
</style>
