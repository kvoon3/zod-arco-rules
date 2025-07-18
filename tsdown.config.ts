import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/valibot/index.ts',
  ],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['vue'],
})
