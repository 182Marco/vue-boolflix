import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    test: 'Hello World',
    favouriteMovies: [],
    favouriteSeries: [],
  },
  getters: {},
  mutations: {
    // aggiungere ai film favoriti
    pushFavuriteObj(state, obj) {
      // per discernere ar film da ar serie sfrutto
      // il fatto che serie hanno la prop name al posto
      // della prop titolo
      obj.title
        ? state.favouriteMovies.push(obj)
        : state.favouriteSeries.push(obj);
    },
    // rimuovere dai film favoriti
    removeFavuriteObj(state, obj) {
      obj.title
        ? (state.favouriteMovies = [
            ...state.favouriteMovies.filter(e => e.id != obj.id),
          ])
        : (state.favouriteSeries = [
            ...state.favouriteSeries.filter(e => e.id != obj.id),
          ]);
    },
  },
  actions: {},
  modules: {},
});
