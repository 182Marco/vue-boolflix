<template>
  <div class="cards-wrap">
    <ul v-show="films.length" v-for="obj in films" :key="obj.id" class="card">
      <li class="original-name">
        {{ obj.original_title ? obj.original_title : obj.original_name }}
      </li>
      <li class="original-lang">
        <span>Original lenguage:</span>
        <img
          v-if="flags.includes(obj.original_language)"
          :src="require(`@/assets/img/${obj.original_language}.png`)"
          :alt="`${obj.original_language} flag`"
        />
        <span v-else>{{ obj.original_language }}</span>
      </li>
      <li class="poster">
        <div class="img-wrap">
          <img
            :src="`https://image.tmdb.org/t/p/w342${obj.poster_path}`"
            :alt="`${obj.title ? obj.title : obj.name} sign poster`"
          />
        </div>
        <p class="name">{{ obj.title ? obj.title : obj.name }}</p>
      </li>
      <li class="stars">
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
    overflow-x: auto;
    display: flex;
    .card {
      cursor: pointer;
      min-width: 220px;
      width: 20vw;
      display: inline-block;
      margin-bottom: 10px;
      margin-right: 15px;
      position: relative;
      transition: transform 0.3s;
      &:hover {
        transform: scale(1.03);
      }
    }
    ul {
      height: 100%;
      margin: 0;
      padding: 0;
    }
  }

  p {
    margin: 0;
  }

  // display solo titolo e foto finche la card non viene cliccata
  .original-name,
  .original-lang,
  .stars {
    display: none;
  }

  .img-wrap {
    width: 100%;
    height: 290px;
    overflow: hidden;
    margin-bottom: 15px;
  }

  .img-wrap > img {
    width: 100%;
  }

  .name {
    color: $white;
    font-weight: bold;
    font-size: 1.3rem;
  }
</style>
