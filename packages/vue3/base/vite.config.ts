import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve, join } from 'path';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsConfigFilePath: join(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
      outputDir: '../../../dist/packages/vue3/base',
      entryRoot: './src'
    }),
    viteTsConfigPaths({ root: '../../../' }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Vue3ComponentBase',
      fileName: 'index',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  test: {
    globals: true,
    cache: {
      dir: '../../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
