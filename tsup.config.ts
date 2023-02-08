import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  minify: true,
  clean: true,
  format: ['cjs'],
  target: 'node18'
})
