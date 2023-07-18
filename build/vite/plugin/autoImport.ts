import type { Plugin } from 'vite';

import AutoImport from 'unplugin-auto-import/vite';

export function configAutoImportPlugin() {
  const autoImportPlugin: Plugin = AutoImport({
    imports: ['vue', 'vue-router', 'pinia'],
    dts: './types/auto-imports.d.ts',
    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json'
    }
  });

  return autoImportPlugin;
}
