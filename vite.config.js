import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or vue, etc. depending on your setup

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Cars-Website/',
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.hdr', '**/*.mp4', '**/*.jpeg'],
  server: {
    watch: {
      // Ignore large video files to prevent EBUSY on Windows
      ignored: ['**/public/videos/**'],
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
  },
});
