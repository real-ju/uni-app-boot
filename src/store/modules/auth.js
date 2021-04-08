export default {
  namespaced: true,
  state: {
    isLogin: false,
    user: null,
    token: null
  },
  getters: {
    isLogin: (state, getters, rootState, rootGetters) => {
      return state.isLogin;
    },
    user: (state, getters, rootState, rootGetters) => {
      return state.user || {};
    },
    token: (state, getters, rootState, rootGetters) => {
      return state.token || '';
    }
  },
  mutations: {
    login: (state, payload) => {
      state.user = payload.user;
      state.isLogin = true;
    },
    logout: (state, payload) => {
      state.user = null;
      state.isLogin = false;
    }
  },
  actions: {
    // name: ({ state }) => {
    // }
  }
};
