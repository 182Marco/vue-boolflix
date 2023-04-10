import Vuex from 'vuex';

const accessData = () => {
  new Vuex.Store({
    state: {
      loginDone: false,
      accountDone: false,
    },
    mutations: {
      loginOk(state) {
        console.log('fuck');
        state.loginDone = true;
      },
      accountChosen(state) {
        state.accountDone = true;
      },
    },
  });
};

export default accessData;
