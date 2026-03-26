import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  plugins: [viteSingleFile()],
  build: {
    target: 'esnext',
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
    outDir: '..',
    emptyOutDir: false,
  },
});
