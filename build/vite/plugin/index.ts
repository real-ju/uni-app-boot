import type { Plugin, PluginOption } from 'vite';

import { configAutoImportPlugin } from './autoImport';

export function createVitePlugins(env: ViteEnv) {
  const vitePlugins: (Plugin | Plugin[] | PluginOption | PluginOption[])[] = [];

  vitePlugins.push(configAutoImportPlugin());

  return vitePlugins;
}
