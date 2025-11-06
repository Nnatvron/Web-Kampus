import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    server: {
  proxy: {
    '/api': {
      target: 'https://web-kampus-9i8ega164-natars-projects.vercel.app',
      changeOrigin: true,
      secure: false,
    },
  },
},
  });
};
