import type { Plugin, PluginOption } from 'vite';

import uni from '@dcloudio/vite-plugin-uni';
import { configAutoImportPlugin } from './autoImport';

export function createVitePlugins(env: ViteEnv) {
  const vitePlugins: (Plugin | Plugin[] | PluginOption | PluginOption[])[] = [
    // have to
    uni()
  ];

  vitePlugins.push(configAutoImportPlugin());

  return vitePlugins;
}
