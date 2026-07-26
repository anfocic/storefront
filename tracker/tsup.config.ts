import { defineConfig } from 'tsup'

// Builds the self-initializing IIFE the storefront serves at /pt.js — output
// straight into ../public/pt.js so it ships as a same-origin static asset.
// es2019 keeps old browsers happy. `clean: false` so it never wipes public/.
// The committed public/pt.js is the source of truth for deploys; rerun
// `npm run build` here after editing src/ and re-commit it.
export default defineConfig({
  entry: { pt: 'src/auto.ts' },
  outDir: '../public',
  format: ['iife'],
  dts: false,
  clean: false,
  sourcemap: false,
  minify: true,
  treeshake: true,
  target: 'es2019',
  outExtension: () => ({ js: '.js' }),
})
