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
      state.favouriteMovies.push(obj);
    },
    // aggiungere alle serie favorite
    pushFavuriteObjSeries(state, obj) {
      state.favouriteSeries.push(obj);
    },
    // rimuovere dai film favoriti
    removeFavuriteObj(state, obj) {
      state.favouriteMovies = [
        ...state.favouriteMovies.filter(e => e.id != obj.id),
      ];
    },
    // rimuovere dalle serie preferite
    removeFavuriteObjSeries(state, obj) {
      state.favouriteSeries = [
        ...state.favouriteSeries.filter(e => e.id != obj.id),
      ];
    },
  },
  actions: {},
  modules: {},
});
