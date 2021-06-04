import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // accesso all'ap
    loginDone: false,
    accountDone: false,
    // colorare nav
    colNav: false,
    transparent: true,
    fillBlack: false,
    // array film e serie preferiti
    favouriteMovies: [],
    favouriteSeries: [],
  },
  getters: {},
  mutations: {
    loginOk(state) {
      state.loginDone = true;
    },
    accountChosen(state) {
      state.accountDone = true;
    },
    // aggiungere ai film favoriti:
    // per distinguere film da serie sfrutto
    // il fatto che le serie hanno la prop
    // name al posto della prop titolo
    pushFavuriteObj(state, obj) {
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
    // cambiare colore della barra
    toggleColNav(state) {
      state.colNav = !state.colNav;
    },
    goTransparent(state) {
      state.transparent = true;
      state.fillBlack = false;
    },
    black(state) {
      state.transparent = false;
      state.fillBlack = true;
    },
  },
  actions: {
    // cambiare colore della barra
    changeColNav(context) {
      context.commit('toggleColNav');
      context.state.colNav
        ? context.commit('black')
        : context.commit('goTransparent');
    },
  },
  modules: {},
});
