import { defineStore } from 'pinia';
import type { UserState } from '#/store';

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    isLogin: false,
    user: null,
    token: null
  }),
  getters: {
    getUser(state) {
      return state.user || {};
    },
    getToken(state) {
      return state.token || '';
    }
  },
  actions: {
    login(user: Recordable, token: string) {
      this.user = user;
      this.token = token;
      this.isLogin = true;
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isLogin = false;
    }
  },
  persist: { key: 'pinia-persistedstate-user' }
});
