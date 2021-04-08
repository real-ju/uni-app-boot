import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import modules from './modules';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const state = {};

const PersistedState = createPersistedState({
  paths: ['auth'],
  storage: {
    getItem: key => {
      return uni.getStorageSync(key);
    },
    setItem: (key, value) => {
      uni.setStorageSync(key, value);
    },
    removeItem: key => {
      uni.removeStorageSync(key);
    }
  }
});

export default new Vuex.Store({
  state,
  getters,
  mutations,
  modules,
  plugins: [PersistedState]
});
