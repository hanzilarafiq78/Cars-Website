import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
