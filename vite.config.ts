import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs', 'es'],
      name: 'react-cron-picker',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    dts({ exclude: ['src/stories/*'] }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/main.css',
          dest: '',
        },
      ],
    }),
  ],
});
