import { defineConfig } from 'tsup';
import packageJson from './package.json';

export default defineConfig({
  entry: ['lib/index.ts'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: true,
  external: Object.keys(packageJson.peerDependencies),
  format: ['esm'],
  tsconfig: 'tsconfig.app.json',
  injectStyle: true,
  platform: 'browser',
  banner: {
    js: `"use client";`,
  },
});
