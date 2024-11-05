import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import * as path from "path";
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      global: "globalThis",
      "process.env.SOME_KEY": JSON.stringify(env.SOME_KEY),
    },
    envPrefix: "DEMO_",
    plugins: [
      react(),
      basicSsl(),
      // nodePolyfills(),
    ],
    resolve: {
      alias: [
        {
          find: "@hashgraph/sdk",
          replacement: path.resolve(__dirname, "src/libs/hashgraph-sdk.js"),
        },
      ],
    },
    server: {
      https: true
    },
    test: {
      globals: true,
      environment: "jsdom",
    },
  };
});
