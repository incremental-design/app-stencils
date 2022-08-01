import { defineConfig } from 'vite'

import { resolve } from 'path'
import dts from 'vite-plugin-dts'

const dtsConfig = {
  outputDir: 'dist/types',
  staticImport: true,
  insertTypesEntry: true,
  rollupTypes: true,
  copyDtsFiles: false
}

export default defineConfig({
  plugins: [dts(dtsConfig)],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'DeviceInputEventHandlers',
        fileName: 'DeviceInputEventHandlers',
      },
      
  }
})
  