import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/js/",
  build: {
    outDir: './_site/js',

    rollupOptions:
    {
      output: {
        entryFileNames: '[name].js',
        format: 'es',
        assetFileNames: '[name][extname]',
      },
      preserveEntrySignatures: "exports-only",
      input: {
        default: fileURLToPath(new URL('./js/default.js', import.meta.url)),
        events: fileURLToPath(new URL('./js/events.jsx', import.meta.url)),
        videobooths: fileURLToPath(new URL('./js/videobooths.tsx', import.meta.url)),
        gameOfLifeJumbotron: fileURLToPath(new URL('./js/gameOfLifeJumbotron.ts', import.meta.url)),
        ["upcoming-events"]: fileURLToPath(new URL('./js/upcoming-events.jsx', import.meta.url)),
        ["register-wizard"]: fileURLToPath(new URL('./js/register-wizard.jsx', import.meta.url)),
      },
    }
  }
})
