import type { App } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

export const pinia = createPinia();
pinia.use(
  createPersistedState({
    storage: {
      getItem: (key: string) => {
        return uni.getStorageSync(key);
      },
      setItem: (key: string, value: string) => {
        uni.setStorageSync(key, value);
      }
    }
  })
);

export function setupStore(app: App) {
  app.use(pinia);
}
