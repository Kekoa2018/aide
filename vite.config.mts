import path from 'node:path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import vscode from '@tomjs/vite-plugin-vscode'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

import pkg from './package.json'

const dir =
  typeof __dirname === 'string'
    ? __dirname
    : dirname(fileURLToPath(import.meta.url))

const resolvePath = (...paths: string[]) => path.resolve(dir, ...paths)

// https://vitejs.dev/config/
export default defineConfig(() => {
  process.env.APP_BUILD_TIME = `${Date.now()}`
  process.env.APP_VERSION = pkg.version

  return {
    plugins: [
      tsconfigPaths(),
      // react(),
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']]
        }
      }),
      svgr(),
      vscode({
        extension: {
          entry: resolvePath('./src/extension/index.ts'),
          platform: 'node',
          target: 'node18',
          sourcemap: true,
          skipNodeModulesBundle: false
          // treeshake: {
          //   preset: 'smallest',
          //   moduleSideEffects: 'no-external'
          // }
        }
      })
    ],
    resolve: {
      dedupe: ['react', 'react-dom']
    }
  }
})
