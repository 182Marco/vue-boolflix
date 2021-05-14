<template>
  <div v-if="renderVideo" class="wrap">
    <i
      class="x close fas fa-times"
      v-show="showXclose"
      @click="renderVideo = !renderVideo"
    ></i>
    <iframe
      :src="`https://www.youtube.com/embed/${keyFromApi}${playWhenCreated}`"
      :title="obj.title ? obj.title : obj.name"
      frameborder="0"
      allowfullscreen
      allow="autoplay"
    >
      ref="video" ></iframe
    >
  </div>
</template>

<script>
  export default {
    name: 'VideoComp',
    props: {
      keyFromApi: String,
      obj: Object,
    },
    components: {},
    data() {
      return {
        renderVideo: true,
        playWhenCreated: '?autoplay=1',
        showXclose: false,
        // dal 2018 you tube non fa più bloccare i related
        // però si possono bloccare almeno quelli sotto
        //  il video quando si preme stop. Non lo uso perchè
        // sembra esssere alternativo all'autoplay
        noShowReletedWhenStop: '?rel=0',
      };
    },
    created() {
      /* La X per la chiusura video viene renderizzata prima che video sia caricato ->
          sovrapponendosi alla X per la chiusura della preview del film quindi timeOut per rendering*/
      setTimeout(() => (this.showXclose = true), 700);
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
  .wrap {
    position: relative;
    @include width-height(100vw, 100vh);
    position: absolute;
    left: -34px;
    top: -250px;
    z-index: 50;
    .x.close {
      font-size: $FontIco;
      position: absolute;
      left: 3%;
      top: 15%;
      color: $titleOfGrupsCol;
      font-size: $FontIco;
      cursor: pointer;
      &:hover {
        color: $white;
      }
    }
    iframe {
      @include width-height(100%, 100%);
    }
  }
</style>
