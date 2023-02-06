import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import StylelintPlugin from 'vite-plugin-stylelint';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), eslintPlugin(), StylelintPlugin()],
  // server: {
  //   host: 'localhost',
  //   port: 80,
  //   open: true,
  // },
  server: {
    hmr: true,
    host: '0.0.0.0',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/index.scss";',
      },
    },
  },
});
