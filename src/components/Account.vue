<template>
  <div class="cont">
    <div class="avatar-wrap">
      <div v-for="(card, i) in avCards" :key="i" class="avatar-card">
        <img
          @click="$emit('accountChosen')"
          :src="require(`@/assets/img/${card.linkImg}.webp`)"
          :alt="card.nameImg"
        />
        <h2 @click="$emit('accountChosen')">{{ card.NameUser }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
  // components

  export default {
    name: 'Account',
    props: {},
    data() {
      return {
        avCards: [
          {
            linkImg: 'blueAvatar',
            nameImg: 'img avatar blue',
            NameUser: 'Marco',
          },
        ],
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
  .cont {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    @include flex(row, center, center);
    color: $white;
    .avatar-wrap {
      @include flex(row, center, center);
      @include width-height(100%, 41%);
      overflow-x: auto;
      .avatar-card {
        // border: 1px solid white;
        @include width-height(20%, 100%);
        @include flex(column, space-between, center);
        img {
          cursor: pointer;
          width: 100%;
        }
        h2 {
          cursor: pointer;
          margin: 0;
          font-size: 2rem;
        }
      }
    }
  }
</style>
