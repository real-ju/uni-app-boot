import type { UserConfig, ConfigEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { loadEnv } from "vite";
import { wrapEnv, pathResolve } from "./build/utils";

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);

  const viteEnv = wrapEnv(env);

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        // #/xxxx => /types/xxxx
        {
          find: /#\//,
          replacement: pathResolve("types") + "/",
        },
      ],
    },
    plugins: [uni()],
    server: {
      host: true,
      proxy: {
        "/api": {
          target: viteEnv.VITE_DEV_SERVER_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
};
